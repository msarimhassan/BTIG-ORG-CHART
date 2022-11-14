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
            {/* <div
                style={{ fontWeight: 'bolder', cursor: 'pointer' }}
                onClick={() => handleNode(object)}
            >
                {object.teamName}
            </div> */}

            {!!object.directTeamMembers &&
                object.directTeamMembers.map(
                    (
                        item: { displayName: string; userPrincipalName: string; teamName: string },
                        index: number
                    ) => {
                        if (!item.teamName) return null;
                        return (
                            <>
                                <LeafName key={index} data={item} />
                                <br />
                            </>
                        );
                    }
                )}
        </div>
    );
};

export default Leaf;
