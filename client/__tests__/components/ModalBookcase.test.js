import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalBookcase from "../../src/components/ModalBookcase";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store.js";

const onClose = jest.fn();

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

// it("Modalbookcase book on shelf should be transparant", async () => {
//   const user = userEvent.setup();
//   const {  } = render(
//     <Provider store={store}>
//       <ModalBookcase open  />
//     </Provider>
//   );
// });
