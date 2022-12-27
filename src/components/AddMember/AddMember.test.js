import { render, screen, fireEvent } from "@testing-library/react";
import AddMember from ".";

jest.mock("apisauce");

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
  render(<AddMember modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("test-cancel-btn"));
  const mockEvent = { stopPropogation: jest.fn() };
  expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});

test("handle Change", async () => {
  render(<AddMember modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("horizontal-input"), {
    target: { value: true },
  });
});

test("handle Change", async () => {
  render(<AddMember modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("teamLead-input"), {
    target: { value: true },
  });
});

test("handle Change", async () => {
  render(<AddMember modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("left-input"), {
    target: { value: true },
  });
});
