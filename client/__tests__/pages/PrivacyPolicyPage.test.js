import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import store from "../../src/redux/store/store.js";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import PrivacyPolicyPage from "../../src/pages/PrivacyPolicyPage.jsx";

afterEach(cleanup);

it("Should render PrivacyPolicyPage without problems", () => {
	render(<Provider store={store}><MemoryRouter><PrivacyPolicyPage /></MemoryRouter></Provider>);
});