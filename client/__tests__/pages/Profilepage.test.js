import { cleanup, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profilepage from "../../src/pages/Profilepage";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as router from "react-router";
import userEvent from "@testing-library/user-event";
import store from "../../src/redux/store/store.js";
import profileFetch from "../../__mocks__/profilefetch.json";
import { logOut, logUserIn } from "../../src/redux/reducers/profileReducer.js";

const logIn = (different) => {
  let username = different ? profileFetch.followers[0]._id : profileFetch._id;

  store.dispatch(
    logUserIn.fulfilled(
      {
        _id: username,
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

const logout = () => {
  store.dispatch(logOut.fulfilled({}, "fulfilled"));
};

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

afterEach(() => {
  cleanup();
  logout();
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => profileFetch,
  })
);

it("Profilepage should render without problems", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Profilepage />
        </Provider>
      </MemoryRouter>
    );
  });
});

it("Profilepage should display correct number of followers and following", async () => {
  let getByTestId;
  await act(async () => {
    const result = render(
      <MemoryRouter>
        <Provider store={store}>
          <Profilepage />
        </Provider>
      </MemoryRouter>
    );

    getByTestId = result.getByTestId;
  });

  const followersSection = getByTestId("followers-section");
  const followingSection = getByTestId("following-section");

  expect(followersSection.childNodes[1].textContent).toBe("1");
  expect(followingSection.childNodes[1].textContent).toBe("0");
});

it("Profilepage click on followers should open modal", async () => {
  const user = userEvent.setup();

  let getByTestId, getByRole;
  await act(async () => {
    const result = render(
      <MemoryRouter>
        <Provider store={store}>
          <Profilepage />
        </Provider>
      </MemoryRouter>
    );

    getByTestId = result.getByTestId;
    getByRole = result.getByRole;
  });

  const followersSection = getByTestId("followers-section");
  await user.click(followersSection);

  expect(getByRole("presentation")).toBeInTheDocument();
});

it("Profilepage follow button should redirect when not logged in", async () => {
  const user = userEvent.setup();

  let getByRole;
  await act(async () => {
    const result = render(
      <MemoryRouter>
        <Provider store={store}>
          <Profilepage />
        </Provider>
      </MemoryRouter>
    );

    getByRole = result.getByRole;
  });

  const followButton = getByRole("button", { name: "Follow" });
  await user.click(followButton);

  expect(navigate).toHaveBeenCalledWith("/login");
});

it("Profilepage follow button should not be visible when logged in as profile", async () => {
  logIn();
  let queryByRole;

  await act(async () => {
    const result = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${profileFetch._id}`]}>
          <Routes>
            <Route path="/:userName" element={<Profilepage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    queryByRole = result.queryByRole;
  });

  const button = queryByRole("button", { name: "Follow" });
  expect(button).toBeNull();
});

it("Profilepage follow button should say unfollow when user logged in already following", async () => {
  logIn(true, true);
  let getByRole;

  await act(async () => {
    const result = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${profileFetch._id}`]}>
          <Routes>
            <Route path="/:userName" element={<Profilepage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    getByRole = result.getByRole;
  });

  const followButton = getByRole("button", { name: "Unfollow" });

  expect(followButton).toBeInTheDocument();
});

it("Profilepage shelf button should redirect to shelf", async () => {
  const user = userEvent.setup();

  let getByTestId;

  await act(async () => {
    const result = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${profileFetch._id}`]}>
          <Routes>
            <Route path="/:userName" element={<Profilepage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    getByTestId = result.getByTestId;
  });

  const shelfButton = getByTestId("shelf-link");
  await user.click(shelfButton);

  expect(navigate).toHaveBeenCalledWith(`/${profileFetch._id}/${profileFetch.shelf[0]._id}`, expect.anything());
});
