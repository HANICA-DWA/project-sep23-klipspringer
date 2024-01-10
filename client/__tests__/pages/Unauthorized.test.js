import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import store from "../../src/redux/store/store.js";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import Unauthorized from "../../src/pages/Unauthorized.jsx";

afterEach(cleanup);

it("Should render Unauthorized without problems", () => {
	render(<Provider store={store}><MemoryRouter><Unauthorized /></MemoryRouter></Provider>);
});