import { cleanup, render } from "@testing-library/react";
import NotFound from "../../src/pages/NotFound";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});
afterEach(cleanup);

it("NotFound should render without problems", () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
});

it("NotFound go home button should redirect", async () => {
  const user = userEvent.setup();
  const { getByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  const homeButton = getByRole("link");
  await user.click(homeButton);

  expect(navigate).toHaveBeenCalledWith("/", expect.anything());
});
