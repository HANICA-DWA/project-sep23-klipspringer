import { cleanup, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ProfileLink from "../../src/components/ProfileLink";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store.js";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

it("ProfileLink renders without problems", () => {
  render(<ProfileLink />);
});

it("ProfileLink opens modalshare on click", async () => {
  const mockAlert = jest.fn();
  const user = userEvent.setup();
  const { getByRole, getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ProfileLink profileInfo={{ _id: "test", name: "test", top_three: { name: "top three", books: [] } }} alert={mockAlert} />
      </MemoryRouter>
    </Provider>
  );

  const button = getByRole("button");
  await user.click(button);

  const closeIcon = getByTestId("CloseIcon");

  expect(closeIcon).toBeInTheDocument();
});
