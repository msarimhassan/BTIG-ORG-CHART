import React, { FC } from 'react';

import { LeafName } from '../../components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { compareWithTeamName, handleTeamDuplication } from '../../utils';
import './Leaf.css';

interface LeafProps {
  object: any;
  totalNodes?: number;
  handleNode?: (obj: any) => void;
}

const Leaf: FC<LeafProps> = ({ object, handleNode = () => {} }) => {
  const window = useWindowDimensions();

  const hidden =
    !object.directTeamMembers ||
    (object.directTeamMembers && !object.directTeamMembers.length) ||
    !object.directTeamMembers.find((item: any) => item.visible === true);
  return (
    <div
      data-testid='testleaf'
      id='leaf'
      className='leaf'
      style={{
        width: '100%',
        height: window.height - 400,
        display: hidden ? 'none' : undefined,
      }}
    >
      {!!object.directTeamMembers &&
        object.directTeamMembers.sort(compareWithTeamName).map((item: any, index: number) => {
          const { teamNameVisible, hideLine } = handleTeamDuplication(object, index);
          return (
            <React.Fragment key={index + item.teamName}>
              <LeafName
                hideLine={hideLine}
                teamNameVisible={teamNameVisible}
                key={index}
                data={item}
                flag={true}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Leaf;
