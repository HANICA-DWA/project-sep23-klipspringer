import {cleanup, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutButton from "../../src/components/LogoutButton.jsx";

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

it("LogoutButton should render without problems", () => {
	render(<Provider store={store}><MemoryRouter><LogoutButton /></MemoryRouter></Provider>);
});

it("LogoutButton should redirect to /login", async () => {
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
				<LogoutButton />
			</MemoryRouter>
		</Provider>
	);

	const input = getByRole("button");

	const expectedResult = "/1234567890";

	await user.click(input);

	await expect(navigate).toHaveBeenCalledWith(expectedResult);
});