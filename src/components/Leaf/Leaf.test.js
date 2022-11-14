import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Leaf, LeafName } from "..";

const obj = {
  DisplayName: "Sarim",
  UserPrincipalName: "SAzriel@btig.com",
  Team: "Hexaa",
  TeamLead: true,
  DirectTeamMembers: [],
  Dimensions: {
    Left: true,
    Horizontal: false,
  },
  ReportsIntoUpn: null,
  FlatTeam: [],
};

test("node render in the dom", async () => {
  render(<Leaf object={obj} />);
});

test("node render in the dom", async () => {
  render(<Leaf object={obj} />);
  const devEl = await screen.findByTestId("testleaf");
  expect(devEl).toBeInTheDocument();
});

test("Renders Name of the flat team when mouse hovers", async () => {
  render(<LeafName name="testing" />);
  fireEvent.mouseOver(screen.getByTestId("testClick"));
  await waitFor(() => screen.getByTestId("testleaftooltip"));

  expect(screen.getByTestId("testleaftooltipchild")).toBeInTheDocument();
});

test("Show the name of the employee in the leaf", async () => {
  render(<LeafName name="Testing" />);
  const element = await screen.findByTestId("testClick");
  expect(element).toHaveTextContent("Testing");
});

test("Null renders when there is no team lead", async () => {
  render(<Leaf object={{ ...obj, TeamLead: false }} />);

  const element = await screen.findByTestId("testleaf");

  expect(element).toHaveTextContent("");
});
