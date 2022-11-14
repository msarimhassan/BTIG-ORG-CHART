import { FC } from 'react';
import './HorizontalNode.css';

interface Props {
    object: any;
    handleNode?: (obj: any) => void;
    totalNodes?: number;
}

const HorizontalNode: FC<Props> = ({ object, handleNode = () => {}, totalNodes = 1 }) => {
    return (
        <div className='HorizontalNode' onClick={() => handleNode(object)}>
            <span className='highlighted-text'>{object.teamName}</span>
            {object.directTeamMembers.length > 0
                ? object.directTeamMembers.map((item: { displayName: String }) => {
                      return <span className='member-name'>{item.displayName}</span>;
                  })
                : null}
        </div>
    );
};

export default HorizontalNode;
