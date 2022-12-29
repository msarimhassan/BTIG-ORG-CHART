import React, { FC } from 'react';

import { LeafName } from '../../components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useNode } from '../../hooks/useNode';
import { filterNodes } from '../../utils';

interface LeafProps {
  object: any;
  handleNode?: (obj: any) => void;
}

const NodeMerge: FC<LeafProps> = ({ object, handleNode = () => {} }) => {
  const window = useWindowDimensions();
  const { nodes } = useNode();
  const filter = filterNodes(nodes?.directTeamMembers);
  return (
    <div
      data-testid='test-Node-merge'
      id='leaf-merge'
      className='leaf-merge'
      style={{
        width: '100%',
        height: window.height - 400,
        marginTop: filter ? '10px' : '0px',
      }}
    >
      {object.directTeamMembers?.map(
        (item: { displayName: String; teamLead: boolean; horizontal: boolean }, index: any) => {
          return (
            <React.Fragment key={index}>
              {item.teamLead === true && item.horizontal === true ? null : (
                <LeafName data={item} key={index} flag={false} />
              )}
            </React.Fragment>
          );
        }
      )}
    </div>
  );
};

export default NodeMerge;
