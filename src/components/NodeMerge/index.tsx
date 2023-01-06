import React, { FC } from "react";

import { LeafName } from "../../components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useNode } from "../../hooks/useNode";
import { compareWithTeamName, filterNodes } from "../../utils";

interface LeafProps {
  object: any;
  handleNode?: (obj: any) => void;
}

const NodeMerge: FC<LeafProps> = ({ object, handleNode = () => {} }) => {
  const window = useWindowDimensions();
  const { nodes } = useNode();
  const filter = filterNodes(nodes?.directTeamMembers);
  const members = object.directTeamMembers?.filter(
    (item: any) => !item.teamLead
  );
  members.sort(compareWithTeamName);
  return (
    <div
      data-testid="test-Node-merge"
      id="leaf-merge"
      className="leaf-merge"
      style={{
        width: "100%",
        height: window.height - 400,
        marginTop: filter ? "10px" : "0px",
      }}
    >
      {members.map(
        (
          item: {
            displayName: String;
            teamLead: boolean;
            dimensions: any;
            teamName: any;
          },
          index: any
        ) => {
          const currentTeamName = members[index].teamName?.trim();
          const prevTeamName = members[index - 1]?.teamName?.trim();
          const teamNameVisible =
            index === 0 || (index > 0 && currentTeamName !== prevTeamName);
          const hideLine =
            index === 0 || (index > 0 && currentTeamName === prevTeamName && currentTeamName && prevTeamName);
          return (
            <LeafName
              hideLine={hideLine}
              teamNameVisible={teamNameVisible}
              data={item}
              key={index}
              flag={true}
            />
          );
        }
      )}
    </div>
  );
};

export default NodeMerge;
