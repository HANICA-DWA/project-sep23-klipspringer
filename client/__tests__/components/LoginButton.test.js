import {cleanup, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginButton from "../../src/components/LoginButton.jsx";

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

it("LoginButton should render without problems", () => {
	render(<Provider store={store}><MemoryRouter><LoginButton /></MemoryRouter></Provider>);
});

it("LoginButton should redirect to /login", async () => {
	const user = userEvent.setup();
	const { getByRole } = render(
		<Provider store={store}>
			<MemoryRouter initialEntries={["/"]}>
				<LoginButton />
			</MemoryRouter>
		</Provider>
	);

	const input = getByRole("link");

	const expectedResult = "/login";

	await user.click(input);

	await expect(navigate).toHaveBeenCalledWith(expectedResult,expect.anything());
});