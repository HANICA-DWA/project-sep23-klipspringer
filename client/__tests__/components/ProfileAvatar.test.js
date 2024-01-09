import { cleanup, fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileAvatar from "../../src/components/ProfileAvatar";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router";

const imageHref = "http://google.com/test-image";
const altText = "testImage";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

afterEach(cleanup);

it("ProfileAvatar renders without problems", () => {
  render(<ProfileAvatar />);
});

it("ProfileAvatar renders image with custom size and no cache", () => {
  const { getByRole } = render(<ProfileAvatar alt={altText} image={imageHref} size={100} noCache={false} />);
  const image = getByRole("img");
  const computedStyle = window.getComputedStyle(image);

  expect(image.src).toBe(imageHref);
  expect(image.alt).toBe("testImage");
  expect(computedStyle.width).toBe("100%");
  expect(computedStyle.height).toBe("100%");
});

it("ProfileAvatar should call onLoad function", () => {
  const onLoad = jest.fn();

  const { getByRole } = render(<ProfileAvatar alt={altText} image={imageHref} onLoad={onLoad} />);
  fireEvent.load(getByRole("img"));

  expect(onLoad).toHaveBeenCalled();
});

it("ProfileAvatar should call onError function", () => {
  const onError = jest.fn();

  const { getByRole } = render(<ProfileAvatar alt={altText} image={imageHref} onError={onError} />);
  fireEvent.error(getByRole("img"));

  expect(onError).toHaveBeenCalled();
});

it("ProfileAvatar should have a border", () => {
  const { getByTestId } = render(<ProfileAvatar alt={altText} image={imageHref} border />);
  const avatarBox = getByTestId("avatar-div");
  const computedStyle = window.getComputedStyle(avatarBox);

  expect(computedStyle.border).toBe("1px solid grey");
  expect(computedStyle.borderRadius).toBe("50px");
  expect(computedStyle.padding).toBe("3px");
});

it("ProfileAvatar should have a clickable link", async () => {
  const user = userEvent.setup();

  const { getByTestId } = render(
    <MemoryRouter>
      <ProfileAvatar clickable handle="test" alt={altText} image={imageHref} />
    </MemoryRouter>
  );

  const avatarLink = getByTestId("avatar-link");
  await user.click(avatarLink);

  expect(navigate).toHaveBeenCalledWith("/test", expect.anything());
});

it("ProfileAvatar should not use cached version", () => {
  const { getByRole } = render(<ProfileAvatar alt={altText} image={imageHref} />);
  const image = getByRole("img");
  const url = new URL(image.src);

  expect(url.searchParams.has("cacheBuster")).toBe(true);
});
