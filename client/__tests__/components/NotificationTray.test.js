import { cleanup, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import NotificationTray from "../../src/components/NotificationTray";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store.js";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router";
import { addNotification } from "../../src/redux/reducers/notificationsReducer.js";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

afterEach(cleanup);

it("NotificationTray should render without problems", () => {
  render(
    <Provider store={store}>
      <NotificationTray />
    </Provider>
  );
});

it("NotificationTray should open", async () => {
  const user = userEvent.setup();

  const { getByRole, getByTestId } = render(
    <Provider store={store}>
      <NotificationTray />
    </Provider>
  );

  const notificationIcon = getByTestId("NotificationsOutlinedIcon");
  await user.click(notificationIcon);

  const tray = getByRole("menu");

  expect(tray).toBeInTheDocument();
});

it("NotificationTray should display message when no notifications", async () => {
  const user = userEvent.setup();

  const { getByTestId } = render(
    <Provider store={store}>
      <NotificationTray />
    </Provider>
  );

  const notificationIcon = getByTestId("NotificationsOutlinedIcon");
  await user.click(notificationIcon);

  const text = getByTestId("no-notifications-message");

  expect(text.textContent).toBe("You are up to date!");
  expect(text.nodeName).toBe("SPAN");
});

it("NotificationTray should display notifications and click on notification should redirect", async () => {
  const user = userEvent.setup();
  const redirectLink = "/test";
  store.dispatch(addNotification({ person: { _id: "123" }, message: "test", link: redirectLink }));

  const { getByRole, getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
        <NotificationTray />
      </MemoryRouter>
    </Provider>
  );

  const notificationIcon = getByTestId("NotificationsOutlinedIcon");
  await user.click(notificationIcon);

  const notification = getByRole("menuitem");
  await user.click(notification);

  expect(notification.textContent).toBe("test");
  expect(navigate).toHaveBeenCalledWith(redirectLink);
});

it("NotificationTray clear button should remove all notifications", async () => {
  const user = userEvent.setup();
  store.dispatch(addNotification({ person: { _id: "123" }, message: "test", link: "/test" }));

  const { getByRole, getByTestId, findByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
        <NotificationTray />
      </MemoryRouter>
    </Provider>
  );

  const notificationIcon = getByTestId("NotificationsOutlinedIcon");
  await user.click(notificationIcon);

  await act(async () => {
    const clearButton = getByRole("button");
    await user.click(clearButton);
    await user.click(notificationIcon);
  });

  const text = await findByTestId("no-notifications-message");

  expect(text.textContent).toBe("You are up to date!");
  expect(text.nodeName).toBe("SPAN");
});
