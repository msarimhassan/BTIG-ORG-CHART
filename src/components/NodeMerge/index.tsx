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
        (
          item: { displayName: String; teamLead: boolean; dimensions: any; teamName: any },
          index: any
        ) => {
          if (!item.teamLead) {
            if (item.teamName) {
              return <LeafName data={item} key={index} flag={true} />;
            } else {
              return <LeafName data={item} key={index} flag={false} />;
            }
          }
          return null;
        }
      )}
    </div>
  );
};

export default NodeMerge;
