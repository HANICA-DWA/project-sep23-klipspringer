import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HamburgerMenu } from "../../src/components/HamburgerMenu";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../src/redux/store/store.js";
import { logUserIn } from "../../src/redux/reducers/profileReducer.js";
import * as router from "react-router";

const navigate = jest.fn();
const logIn = () => {
  store.dispatch(
    logUserIn.fulfilled(
      {
        _id: "1234567890",
        name: "test",
        profile_picture: "test",
        top_three: {
          name: "test",
          books: [],
        },
        shelf: [],
        bookcase: [],
        followers: [],
        following: [],
      },
      "fulfilled"
    )
  );
};

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

afterEach(cleanup);

it("Hamburgermenu should render without problems", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <HamburgerMenu />
      </MemoryRouter>
    </Provider>
  );
});

it("Hamburgermenu should open", async () => {
  const user = userEvent.setup();
  const { getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <HamburgerMenu />
      </MemoryRouter>
    </Provider>
  );

  const menuIcon = getByTestId("hamburger-menu-icon");

  await user.click(menuIcon);

  expect(menuIcon.getAttribute("aria-expanded")).toBe("true");
});

it("Hamburgermenu not logged in click on home should navigate to /", async () => {
  const user = userEvent.setup();
  const { getAllByRole, getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <HamburgerMenu />
      </MemoryRouter>
    </Provider>
  );

  const menuIcon = getByTestId("hamburger-menu-icon");
  await user.click(menuIcon);
  const items = getAllByRole("menuitem");
  await user.click(items.find((item) => item.textContent === "Home"));

  const expectedResult = "/";

  await expect(navigate).toHaveBeenCalledWith(expectedResult);
});

it("Hamburgermenu click on search should navigate to /find", async () => {
  const user = userEvent.setup();
  const { getAllByRole, getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <HamburgerMenu />
      </MemoryRouter>
    </Provider>
  );

  const menuIcon = getByTestId("hamburger-menu-icon");
  await user.click(menuIcon);
  const items = getAllByRole("menuitem");
  await user.click(items.find((item) => item.textContent === "Search"));

  const expectedResult = "/find";

  await expect(navigate).toHaveBeenCalledWith(expectedResult);
});

it("Hamburgermenu logged in click on profile should navigate to /{profileName}", async () => {
  const user = userEvent.setup();
  logIn();

  const { getAllByRole, getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <HamburgerMenu />
      </MemoryRouter>
    </Provider>
  );

  const menuIcon = getByTestId("hamburger-menu-icon");
  await user.click(menuIcon);
  const items = getAllByRole("menuitem");
  await user.click(items.find((item) => item.textContent === "Profile"));

  const expectedResult = "/1234567890";

  await expect(navigate).toHaveBeenCalledWith(expectedResult);
});

it("Hamburgermenu logged in click on edit profile should navigate to /{profileName}/edit", async () => {
  const user = userEvent.setup();
  logIn();

  const { getAllByRole, getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <HamburgerMenu />
      </MemoryRouter>
    </Provider>
  );

  const menuIcon = getByTestId("hamburger-menu-icon");
  await user.click(menuIcon);
  const items = getAllByRole("menuitem");
  await user.click(items.find((item) => item.textContent === "Edit profile"));

  const expectedResult = "/1234567890/edit";

  await expect(navigate).toHaveBeenCalledWith(expectedResult);
});

it("Hamburgermenu logged in click on bookcase should navigate to /{profileName}/bookcase", async () => {
  const user = userEvent.setup();
  logIn();

  const { getAllByRole, getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <HamburgerMenu />
      </MemoryRouter>
    </Provider>
  );

  const menuIcon = getByTestId("hamburger-menu-icon");
  await user.click(menuIcon);
  const items = getAllByRole("menuitem");
  await user.click(items.find((item) => item.textContent === "Bookcase"));

  const expectedResult = "/1234567890/bookcase";

  await expect(navigate).toHaveBeenCalledWith(expectedResult);
});