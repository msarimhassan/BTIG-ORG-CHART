import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Node from ".";

const obj = {
  displayName: "Sarim",
  userPrincipalName: "SAzriel@btig.com",
  teamName: "AppDev",
  teamLead: false,
  directTeamMembers: [],
  dimensions: {
    left: true,
    horizontal: false,
  },
};
test("node render in the dom", async () => {
  render(<Node object={obj} />);

  const devEl = await screen.findByTestId("testteamNode");

  expect(devEl).toBeInTheDocument();
});

test("Employee name  renders the text inside the node", async () => {
  render(<Node object={obj} />);
  const element = await screen.findByTestId("testTeamName");
  expect(element).toHaveTextContent("SarimAppDev");
});

test("handle Click", async () => {
  render(<Node object={obj} />);
  fireEvent.click(screen.getByTestId("testteamNode"));
});
