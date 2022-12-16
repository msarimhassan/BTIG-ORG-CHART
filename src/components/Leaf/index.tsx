import React, { FC } from 'react';

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
            <React.Fragment key={index}>
              <LeafName key={index} data={item} flag={true} />
              <br />
            </React.Fragment>
          );
        })}
      {!!object.directTeamMembers &&
        object.directTeamMembers.map((item: any, index: number) => {
          return item.teamLead ? null : (
            <React.Fragment key={index}>
              <LeafName data={item} flag={false} />
              <br />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Leaf;
