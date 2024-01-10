import { cleanup, render, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Search from "../../src/pages/Search";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store.js";
import suggestionsFetch from "../../__mocks__/suggestionsFetch.json";

afterEach(cleanup);

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => suggestionsFetch,
  })
);

it("Search should render without problems", async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>
    );
  });
});

it("Search should render genres when clicked on books chip", async () => {
  const user = userEvent.setup();
  let getByTestId, getByRole;

  await act(async () => {
    const result = render(
      <Provider store={store}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>
    );

    getByTestId = result.getByTestId;
    getByRole = result.getByRole;
  });

  const chipSection = getByTestId("chip-section");
  const chipBooks = within(chipSection).getByRole("button", { name: /books/i });

  await user.click(chipBooks);

  const genreTitle = getByRole("heading", { level: 6, name: /genres/i });

  expect(genreTitle).toBeInTheDocument();
});
