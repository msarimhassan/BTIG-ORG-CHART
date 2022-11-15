import { FC } from 'react';
import './HorizontalNode.css';
import useWindowDimensions from '../../hooks/useWindowDimensions';

interface Props {
    object: any;
    setUpn?: (obj: any) => void;
    handleNode?: (obj: any) => void;
    totalNodes?: number;
}

const HorizontalNode: FC<Props> = ({ object, handleNode = () => {}, totalNodes = 1 }) => {
    const window = useWindowDimensions();
    console.log(object.dimensions.left);
    const dimension = object.dimensions.left ? `${window.width / 2}px` : `${window.width - 80}px`;
    return (
        <div
            className='HorizontalNode'
            onClick={() => handleNode(object)}
            style={{ width: dimension }}
        >
            <span className='highlighted-text'>
                {object.teamName} <span style={{ color: '#006791' }}>{object.displayName}</span>
            </span>
            {object.directTeamMembers.length > 0
                ? object.directTeamMembers.map(
                      (item: { displayName: String; teamName: String; teamLead: boolean }) => {
                          return (
                              <>
                                  <span className='member-name'>{item.teamName}</span>
                                  <span>{item.teamLead ? item.displayName : null}</span>
                              </>
                          );
                      }
                  )
                : null}
        </div>
    );
};

export default HorizontalNode;
