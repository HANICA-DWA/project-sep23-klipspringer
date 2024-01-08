import { cleanup, fireEvent, render } from "@testing-library/react";
import Bookcover from "../../src/components/Bookcover";

afterEach(cleanup);

it("Bookcover should render without problems", () => {
  render(<Bookcover />);
});

it("Bookcover should render isbn image", () => {
  const { getByRole } = render(<Bookcover isbn="1234567890" />);
  const img = getByRole("img");

  expect(img.src).toBe("http://covers.openlibrary.org/b/isbn/1234567890-M.jpg?default=false");
});

it("Bookcover should render coverId image", () => {
  const { getByRole } = render(<Bookcover coverId="1234567890" />);
  const img = getByRole("img");

  expect(img.src).toBe("https://covers.openlibrary.org/b/id/1234567890-L.jpg?default=false");
});

it("Bookcover should render without image", () => {
  const { getByRole, getByText } = render(<Bookcover />);
  fireEvent.error(getByRole("img"));
  const text = getByText(/no image found/i);

  expect(text.textContent).toBe("No image found");
  expect(text.nodeName).toBe("SPAN");
});

it("Bookcover should render without image and with border and large size", () => {
  const { getByRole, getByTestId, getByText } = render(<Bookcover border large />);
  fireEvent.error(getByRole("img"));
  const flexbox = getByTestId("flexbox-no-image");
  const computedStyle = window.getComputedStyle(flexbox);

  expect(computedStyle.border).toBe("1px solid black");

  const text = getByText(/no image found/i);

  expect(text.nodeName).toBe("P");
});
