import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Privacy from "../../src/components/Privacy.jsx";
import store from "../../src/redux/store/store.js";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

afterEach(cleanup);

it("Should render Privacy without problems", () => {
  render(<Provider store={store}><MemoryRouter><Privacy /></MemoryRouter></Provider>);
});