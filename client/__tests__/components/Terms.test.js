import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Terms from "../../src/components/Terms.jsx";
import store from "../../src/redux/store/store.js";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

afterEach(cleanup);

it("Should render Terms without problems", () => {
	render(<Provider store={store}><MemoryRouter><Terms /></MemoryRouter></Provider>);
});