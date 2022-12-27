import { render, screen, fireEvent } from "@testing-library/react";

import Popup from ".";

const data = { teamName: "Org Chart" };

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test("Modal Buttons", () => {
  render(<Popup modalIsOpen={true} data={data} />);
  fireEvent.click(screen.getByTestId("test-cancel-btn"));
  const mockEvent = { stopPropogation: jest.fn() };
  expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});

test("Modal Buttons", () => {
  render(<Popup modalIsOpen={true} data={data} />);
  fireEvent.click(screen.getByTestId("update-btn"));
});

test("handle Change", async () => {
  render(<Popup modalIsOpen={true} data={data} />);
  fireEvent.change(screen.getByTestId("team-input"), {
    target: { value: true },
  });
});
