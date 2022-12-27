import NodeMerge from ".";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const obj = {
  displayName: "Sarim",
  userPrincipalName: "SAzriel@btig.com",
  teamName: "Hexaa",
  teamLead: true,
  directTeamMembers: [
    {
      displayName: "Sarim",
      userPrincipalName: "SAzriel@btig.com",
      teamName: "Hexaa",
      teamLead: true,
      directTeamMembers: [],
      dimensions: {
        Left: true,
        horizontal: false,
      },
    },
  ],
  dimensions: {
    Left: true,
    horizontal: true,
  },
};

test("node merge  render in the dom", async () => {
  render(<NodeMerge object={obj} />);
});
