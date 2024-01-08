import {cleanup, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateShelfButton from "../../src/components/CreateShelfButton.jsx";
import store from "../../src/redux/store/store.js";
import { MemoryRouter } from "react-router-dom";
import {Provider} from "react-redux";

import * as router from 'react-router';
import {logUserIn} from "../../src/redux/reducers/profileReducer.js";

const navigate = jest.fn()

beforeEach(() => {
	jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

afterEach(cleanup);

it("CreateShelfButton should render without problems", () => {
	render(<Provider store={store}><MemoryRouter><CreateShelfButton /></MemoryRouter></Provider>);
});

it("CreateShelfButton not loggedin should redirect to /login", async () => {
	const user = userEvent.setup();
	const { getByRole } = render(
		<Provider store={store}>
			<MemoryRouter initialEntries={["/"]}>
				<CreateShelfButton />
			</MemoryRouter>
		</Provider>
	);

	const input = getByRole("button");

	const expectedResult = "/login";

	await user.click(input);

	await expect(navigate).toHaveBeenCalledWith(expectedResult);
});

it("CreateShelfButton loggedin should redirect to /shelf", async () => {
	store.dispatch(logUserIn.fulfilled({
		_id: "1234567890",
		name: "test",
		profile_picture: "test",
		top_three: {
			name: "test",
			books: [],
		},
		shelf: [],
		bookcase: [],
		followers: [],
		following: [],
	}, "fulfilled"));

	const user = userEvent.setup();
	const { getByRole } = render(
		<Provider store={store}>
			<MemoryRouter initialEntries={["/"]}>
				<CreateShelfButton />
			</MemoryRouter>
		</Provider>
	);

	const input = getByRole("button");

	const expectedResult = "/1234567890/shelf";

	await user.click(input);

	await expect(navigate).toHaveBeenCalledWith(expectedResult);
});