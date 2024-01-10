import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import store from "../../src/redux/store/store.js";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import TermsOfServicePage from "../../src/pages/TermsOfServicePage.jsx";

afterEach(cleanup);

it("Should render TermsOfServicePage without problems", () => {
	render(<Provider store={store}><MemoryRouter><TermsOfServicePage /></MemoryRouter></Provider>);
});