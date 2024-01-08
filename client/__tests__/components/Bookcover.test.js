import { cleanup, render } from "@testing-library/react";
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
