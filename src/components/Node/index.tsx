import React, { useState } from 'react';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Node.css';

import { Tooltip } from '../../components';

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
            <Tooltip data={object} active={active} hideTooltip={hideTip} flag={false} />

            <div data-testid='testTeamName' className='text'>
                {object.displayName}
                <br />
                <span className='text-teamname'>{object.teamName}</span>
            </div>
        </div>
    );
};

export default Node;
