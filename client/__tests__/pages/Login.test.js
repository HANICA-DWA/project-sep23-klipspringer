import { cleanup, render } from "@testing-library/react";
import Login from "../../src/pages/Login";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import userEvent from "@testing-library/user-event";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});
afterEach(cleanup);

const loginComponent = (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_APP_ID}>
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  </GoogleOAuthProvider>
);

it("Login should render without problems", () => {
  render(loginComponent);
});

it("Login should redirect to /register when clicked register", async () => {
  const user = userEvent.setup();

  const { getByRole } = render(loginComponent);

  const registerButton = getByRole("link");
  await user.click(registerButton);

  expect(navigate).toHaveBeenCalledWith("/register", expect.anything());
});
