import { cleanup, render } from "@testing-library/react";
import { HamburgerMenu } from "../../src/components/HamburgerMenu";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../src/redux/store/store.js";

const navigate = jest.fn();

afterEach(cleanup);

it("Hamburgermenu should render without problems", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <HamburgerMenu initialEntries={["/"]} />
      </MemoryRouter>
    </Provider>
  );
});

it("Hamburgermenu not logged in click on home should navigate to /login", () => {
  const { getAllByRole } = render(
    <Provider store={store}>
      <MemoryRouter>
        <HamburgerMenu initialEntries={["/"]} />
      </MemoryRouter>
    </Provider>
  );

  const items = getAllByRole("listitem");
});
