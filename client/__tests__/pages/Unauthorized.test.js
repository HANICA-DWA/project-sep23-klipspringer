import { cleanup, render } from "@testing-library/react";
import Unauthorized from "../../src/pages/Unauthorized";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router";
import userEvent from "@testing-library/user-event";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

afterEach(cleanup);

it("Unauthorized should render withour problems", () => {
  render(
    <MemoryRouter>
      <Unauthorized />
    </MemoryRouter>
  );
});

it("Unauthorized click on button should redirect to login", async () => {
  const user = userEvent.setup();

  const { getByRole } = render(
    <MemoryRouter>
      <Unauthorized />
    </MemoryRouter>
  );

  const button = getByRole("link");
  await user.click(button);

  expect(navigate).toHaveBeenCalledWith("/login", expect.anything());
});
