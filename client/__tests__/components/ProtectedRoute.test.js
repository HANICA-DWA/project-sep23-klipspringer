import {cleanup, render} from "@testing-library/react";
import {MemoryRouter, useParams} from "react-router-dom";
import store from "../../src/redux/store/store.js";
import "@testing-library/jest-dom";
import ProtectedRoute from "../../src/components/ProtectedRoute.jsx";
import {Provider} from "react-redux";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: jest.fn(),
}));

afterEach(cleanup);

beforeEach(() => {
	useParams.mockClear();
});

it("Should render Privacy without problems", () => {
	useParams.mockReturnValue({ userName: "testUser" });

	render(<Provider store={store}><MemoryRouter><ProtectedRoute /></MemoryRouter></Provider>);
});