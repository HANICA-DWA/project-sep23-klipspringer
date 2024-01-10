import {act, cleanup, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Suggestions from "../../src/components/Suggestions.jsx";
import { MemoryRouter } from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../src/redux/store/store.js";
import suggestionsFetch from "../../__mocks__/suggestionsFetch.json";

import * as router from 'react-router';

const navigate = jest.fn()

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(suggestionsFetch),
	})
);

beforeEach(() => {
	jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
});

afterEach(cleanup);

it("Suggestions should render without problems", () => {
	render(<Provider store={store}><MemoryRouter><Suggestions /></MemoryRouter></Provider>);
});

it("Suggestions should interact with suggestion without problems", async () => {
	const user = userEvent.setup();
	const { queryByTestId } = render(
		<Provider store={store}>
			<MemoryRouter initialEntries={["/"]}>
				<Suggestions/>
			</MemoryRouter>
		</Provider>
	);

	const expectedResult = /\/book\/[0-9]*/;

	act(async ()=>{
		const input = queryByTestId(/suggestion-[0-9]*/);

		console.log(input);

		await user.click(input);

		await waitFor(async () => await expect(navigate).toHaveBeenCalledWith(expect.stringMatching(expectedResult)));

	})
});

