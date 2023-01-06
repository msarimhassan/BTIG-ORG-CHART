import React, { FC } from 'react';

import { LeafName } from "../../components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { compareWithTeamName } from "../../utils";
import "./Leaf.css";

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
      style={{
        width: '100%',
        height: window.height - 400,
        display: hidden ? 'none' : undefined,
      }}
    >
      {!!object.directTeamMembers &&
        object.directTeamMembers
          .sort(compareWithTeamName)
          .map((item: any, index: number) => {
            const currentTeamName = object.directTeamMembers[index].teamName;
            const prevTeamName =  object.directTeamMembers[index - 1]?.teamName;
            const teamNameVisible =
              index === 0 || (index > 0 && currentTeamName !== prevTeamName);
            const hideLine =
              index === 0 ||
              (index > 0 &&
                currentTeamName &&
                currentTeamName.trim() &&
                prevTeamName &&
                prevTeamName.trim() &&
                currentTeamName === prevTeamName);
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
