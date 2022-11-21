import React, { useState } from 'react';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Node.css';

import { Tooltip } from '../../components';
import useAuth from '../../hooks/useAuth';

interface Props {
    object: any;
    totalNodes?: number;
    setUpn?: (obj: any) => void;
    handleNode?: (obj: any) => void;
}

const Node: React.FC<Props> = ({
    object,
    totalNodes = 1,
    handleNode = () => {},
    setUpn = () => {},
}: Props) => {
    const [active, isActive] = useState(false);
    const window = useWindowDimensions();
    const dimension = `${(window.width - 40) / totalNodes}px`;
    const hideTip = () => {
        isActive(false);
    };
    const { activeUser } = useAuth();

    const handlingNode = (obj: any) => {
        setUpn(obj.userPrincipalName);
        handleNode(obj);
    };

    return (
        <div
            style={{ width: dimension, height: dimension }}
            className='node'
            data-testid='testteamNode'
            onClick={(e) => {
                e.stopPropagation();
                handlingNode(object);
            }}
            onMouseEnter={() => isActive(!active)}
            onMouseLeave={hideTip}
        >
            {activeUser.role == 'TaskUser' ? null : (
                <Tooltip data={object} active={active} hideTooltip={hideTip} flag={false} />
            )}

            <div
                data-testid='testTeamName'
                className={`text ${activeUser.role == 'TaskUser' ? 'text-top' : ''}`}
            >
                {object.displayName}
                <br />
                <span className='text-teamname'>
                    <u>{object.teamName}</u>
                </span>
            </div>
        </div>
    );
};

export default Node;
