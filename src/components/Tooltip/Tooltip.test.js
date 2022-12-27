import { render, screen, fireEvent } from "@testing-library/react";
import Tooltip from ".";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

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
test("edit Click modal in the UI", async () => {
  render(<Tooltip active={true} data={obj} />);
  fireEvent.click(screen.getByTestId("testEdit"));
  const mockEvent = { stopPropogation: jest.fn() };
  expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});

test("Add Click modal", async () => {
  render(<Tooltip active={true} data={obj} />);
  fireEvent.click(screen.getByTestId("testAdd"));
  const mockEvent = { stopPropogation: jest.fn() };
  expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});
