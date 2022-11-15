import { FC } from 'react';

import { LeafName } from '../../components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Leaf.css';

interface LeafProps {
    object: any;
    totalNodes?: number;
    handleNode?: (obj: any) => void;
}

const Leaf: FC<LeafProps> = ({ object, totalNodes = 1, handleNode = () => {} }) => {
    const window = useWindowDimensions();
    const dimension = `${(window.width - 40) / totalNodes}px`;

    return (
        <div
            data-testid='testleaf'
            id='leaf'
            className='leaf'
            style={{ width: dimension, height: window.height - 400 }}
        >
            {!!object.directTeamMembers &&
                object.directTeamMembers.map((item: any, index: number) => {
                    if (!item.teamLead) return null;
                    return (
                        <>
                            <LeafName key={index} data={item} flag={true} />
                            <br />
                        </>
                    );
                })}
            {!!object.directTeamMembers &&
                object.directTeamMembers.map((item: any, index: number) => {
                    return item.teamLead ? null : (
                        <>
                            <LeafName key={index} data={item} flag={false} />
                            <br />
                        </>
                    );
                })}
        </div>
    );
};

export default Leaf;
