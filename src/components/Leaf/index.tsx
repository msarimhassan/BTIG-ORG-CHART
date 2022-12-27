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
  return (
    <div
      data-testid='testleaf'
      id='leaf'
      className='leaf'
      style={{ width: '100%', height: window.height - 400 }}
    >
      {!!object.directTeamMembers &&
        object.directTeamMembers.map((item: any, index: number) => {
          if (!item.teamLead) return null;
          return (
            <React.Fragment key={index}>
              <LeafName key={index} data={item} flag={true} />
            </React.Fragment>
          );
        })}
      {!!object.directTeamMembers &&
        object.directTeamMembers.map((item: any, index: number) => {
          return item.teamLead ? null : (
            <React.Fragment key={index}>
              <LeafName data={item} flag={false} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Leaf;
