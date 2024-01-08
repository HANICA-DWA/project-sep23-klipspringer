import { cleanup, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalBookcase from "../../src/components/ModalBookcase";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store.js";
import { logUserIn } from "../../src/redux/reducers/profileReducer.js";

const logIn = (bookcase) => {
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
        bookcase: bookcase ? [{ _id: 1234567890, title: "test", authors: ["test"] }] : [],
        followers: [],
        following: [],
      },
      "fulfilled"
    )
  );
};

const onClose = jest.fn();
const handleAdd = jest.fn();

afterEach(cleanup);

it("Modalbookcase should render without problems", () => {
  render(
    <Provider store={store}>
      <ModalBookcase open />
    </Provider>
  );
});

it("Modalbookcase should close", async () => {
  const user = userEvent.setup();
  const { getByTestId } = render(
    <Provider store={store}>
      <ModalBookcase open handleClose={onClose} />
    </Provider>
  );

  const closeIcon = getByTestId("CloseIcon");
  await user.click(closeIcon);

  await expect(onClose).toHaveBeenCalled();
});

it("Modalbookcase book on shelf should be transparant", () => {
  const booksOnShelf = [{ _id: 1234567890, title: "test", authors: ["test"] }];
  logIn(true);

  const { getByTestId } = render(
    <Provider store={store}>
      <ModalBookcase open booksOnShelf={booksOnShelf} />
    </Provider>
  );

  const book = getByTestId("modal-bookcase-item");
  const computedStyle = window.getComputedStyle(book);

  expect(computedStyle.opacity).toBe("0.3");
});

it("Modalbookcase book not on shelf should be opaque", () => {
  const booksOnShelf = [{ _id: 9876543210, title: "test", authors: ["test"] }];
  logIn(true);

  const { getByTestId } = render(
    <Provider store={store}>
      <ModalBookcase open booksOnShelf={booksOnShelf} />
    </Provider>
  );

  const book = getByTestId("modal-bookcase-item");
  const computedStyle = window.getComputedStyle(book);

  expect(computedStyle.opacity).toBe("1");
});

it("Modalbookcase should display message to pick a book", async () => {
  const user = userEvent.setup();
  const booksOnShelf = [{ _id: 9876543210, title: "test", authors: ["test"] }];
  logIn(true);

  const { getByRole, getByText } = render(
    <Provider store={store}>
      <ModalBookcase open booksOnShelf={booksOnShelf} />
    </Provider>
  );

  await act(async () => {
    const button = getByRole("button", { name: "Add to shelf" });
    await user.click(button);
  });

  const text = getByText(/you need to pick min 1 book/i);

  expect(text.textContent).toBe("You need to pick min 1 book");
  expect(text.nodeName).toBe("P");
});

it("Modalbookcase should add selection", async () => {
  const user = userEvent.setup();
  const booksOnShelf = [{ _id: 9876543210, title: "test", authors: ["test"] }];
  logIn(true);

  const { getByRole, getAllByTestId } = render(
    <Provider store={store}>
      <ModalBookcase open booksOnShelf={booksOnShelf} handleAdd={handleAdd} />
    </Provider>
  );

  await act(async () => {
    const addButtons = getAllByTestId("AddIcon");
    await user.click(addButtons[0]);
  });

  await act(async () => {
    const button = getByRole("button", { name: "Add to shelf" });
    await user.click(button);
  });

  expect(handleAdd).toHaveBeenCalled();
});

it("Modalbookcase without any books should display message", () => {
    const booksOnShelf = [{ _id: 9876543210, title: "test", authors: ["test"] }];
    logIn(false);

    const { getByRole } = render(
        <Provider store={store}>
          <ModalBookcase open booksOnShelf={booksOnShelf} handleAdd={handleAdd} />
        </Provider>
      );

    const h5 = getByRole("heading", {level: 5});
    expect(h5.textContent).toBe("No books in the bookcase");
})