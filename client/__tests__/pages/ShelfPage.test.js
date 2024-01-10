import { cleanup, render } from "@testing-library/react";
import ShelfPage from "../../src/pages/ShelfPage";
import { MemoryRouter } from "react-router";
import {useParams} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store";
import '@testing-library/jest-dom'

jest.mock('react', ()=>({
	...jest.requireActual('react'),
	useEffect: jest.fn()
}));
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: jest.fn(),
}));

beforeEach(() => {
	useParams.mockReturnValue({ userName: "testUser", shelf: "12345" });

});

afterEach(cleanup);

it("Should render the ShelfPage component", () => {
	render(<Provider store={store}><MemoryRouter><ShelfPage /></MemoryRouter></Provider>);
});