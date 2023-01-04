import { fireEvent, render, screen } from "@testing-library/react";
import EditModal from "./index";

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
    horizontal: true,
  },
};

test("Edit Team Modal render in the dom", async () => {
  render(<EditModal data={obj} modalIsOpen={true} />);
  const devEl = await screen.findByTestId("edit-modal");
  expect(devEl).toBeInTheDocument();
});

test("Edit Team Modal cancel button", async () => {
  render(<EditModal data={obj} modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("edit-cancel-btn"));
});

test("Team Lead Input", async () => {
  render(<EditModal data={obj} modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("teamLead-input"), {
    target: { value: true },
  });
});

test("Edit Team Modal click button", async () => {
  render(<EditModal data={obj} modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("update-btn"));
});

test("handle Change", async () => {
  render(<EditModal data={obj} modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("teamLead-input"), {
    target: { value: true },
  });
});

test("handle Change", async () => {
  render(<EditModal data={obj} modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("horizontal-input"), {
    target: { value: true },
  });
});

// test("handle visible Change", async () => {
//   render(<EditModal data={obj} modalIsOpen={true} />);
//   fireEvent.click(screen.getByTestId("visible-input"), {
//     target: { value: true },
//   });
// });

test("Edit Team Modal delete button", async () => {
  render(<EditModal data={obj} modalIsOpen={true} />);
  fireEvent.click(screen.getByTestId("delete-member"));
});
