import { render, screen } from "@testing-library/react";

import Home from "../pages/home";
import { BackButton } from "../components";

test("Home render in the dom", async () => {
  render(<Home />);
  const devEl = await screen.findByTestId("testhome");
  expect(devEl).toBeInTheDocument();
});

test("Back Button", async () => {
  const { getByTestId } = render(<BackButton previousData={[1]} />);
  const btn = getByTestId("testbackbtn");
  expect(btn).toBeInTheDocument();
});

test("TreeNode has Lead", () => {});
