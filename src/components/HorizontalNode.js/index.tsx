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

  const dimension = object?.dimensions.left
    ? `${window.width / 2 - 56}px`
    : `${window.width - 80}px`;
  return (
    <div
      data-testid='testhorizontalnode'
      className='HorizontalNode'
      onClick={() => handleNode(object)}
      style={{ width: dimension }}
    >
      <span className='highlighted-text'>
        {object.teamName} <span style={{ color: '#006791' }}>{object.displayName}</span>
      </span>
      {object.directTeamMembers.length > 0
        ? object.directTeamMembers.map(
            (item: { displayName: string; teamName: string; teamLead: boolean }) => {
              return (
                <>
                  <span data-testid='testTeamName' className='member-name'>
                    {item?.teamName}
                  </span>
                  <span data-testid='testTeamLead'>{item.teamLead ? item?.displayName : null}</span>
                </>
              );
            }
          )
        : null}
    </div>
  );
};

export default HorizontalNode;
