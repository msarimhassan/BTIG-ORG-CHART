import React, { FC } from 'react';

import { LeafName } from '../../components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Leaf.css';

interface LeafProps {
  object: any;
  totalNodes?: number;
  handleNode?: (obj: any) => void;
}

const Leaf: FC<LeafProps> = ({ object, handleNode = () => {} }) => {
  const window = useWindowDimensions();

  const hidden =
    !object.directTeamMembers || (object.directTeamMembers && !object.directTeamMembers.length);
  return (
    <div
      data-testid='testleaf'
      id='leaf'
      className='leaf'
      style={{ width: '100%', height: window.height - 400, display: hidden ? 'none' : undefined }}
    >
      {!!object.directTeamMembers &&
        object.directTeamMembers.map((item: any, index: number) => {
          return (
            <React.Fragment key={index + item.teamName}>
              <LeafName key={index} data={item} flag={true} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Leaf;
