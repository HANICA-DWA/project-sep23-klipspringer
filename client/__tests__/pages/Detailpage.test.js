import { cleanup, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Detailpage from "../../src/pages/Detailpage";
import store from "../../src/redux/store/store.js";
import { logUserIn } from "../../src/redux/reducers/profileReducer.js";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as router from "react-router";
import bookFetch from "../../__mocks__/bookFetch.json";

afterEach(cleanup);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(bookFetch),
  })
);

const navigate = jest.fn();
const isbn = Number(Object.keys(bookFetch)[0].split(":")[1]);

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

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
});

it("Detailpage should render without problems", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Detailpage />
        </Provider>
      </MemoryRouter>
    );
  });
});

it("redirects to correct author page", async () => {
  const user = userEvent.setup();
  const author = bookFetch[`ISBN:${isbn}`].authors[0].url.split("/")[4];
  let getAllByTestId;

  await act(async () => {
    const result = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${isbn}`]}>
          <Routes>
            <Route path="/:isbn" element={<Detailpage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    getAllByTestId = result.getAllByTestId;
  });

  const links = getAllByTestId("author-page-link");
  await user.click(links[0]);

  expect(navigate).toHaveBeenCalledWith(`/author/${author}`, expect.anything());
});

it("Show bookmark when logged in", async () => {
  let getByTestId;

  await act(async () => {
    const result = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${isbn}`]}>
          <Routes>
            <Route path="/:isbn" element={<Detailpage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    getByTestId = result.getByTestId;
  });

  const icon = getByTestId("BookmarkIcon");

  expect(icon).toBeInTheDocument();
});

it("Show read more button when description is long and read less when clicked", async () => {
  const user = userEvent.setup();
  let getByRole;

  await act(async () => {
    const result = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${isbn}`]}>
          <Routes>
            <Route path="/:isbn" element={<Detailpage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    getByRole = result.getByRole;
  });

  const button = getByRole("button", { name: "Read more" });

  expect(button.textContent).toBe("Read more");

  await user.click(button);

  expect(button.textContent).toBe("Read less");
});