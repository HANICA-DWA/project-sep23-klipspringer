import { cleanup, render } from "@testing-library/react";
import Header from "../../src/components/Header";

import store from "../../src/redux/store/store"
import { Provider } from "react-redux";

afterEach(cleanup);

it("Header should render without problems", () => {
  render(<Provider store={store}>
        <Header />
    </Provider>);
});