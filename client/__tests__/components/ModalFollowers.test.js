import {cleanup, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalFollowers from "../../src/components/ModalFollowers.jsx";

import store from "../../src/redux/store/store.js";
import { MemoryRouter } from "react-router-dom";
import {Provider} from "react-redux";

import * as router from 'react-router';
import {logUserIn} from "../../src/redux/reducers/profileReducer.js";

const navigate = jest.fn()

const onClose = jest.fn();

const setValueTabs = jest.fn();

beforeEach(() => {
	jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

afterEach(cleanup);

it("ModalFollowers should render without problems", () => {
	const valueTabs = "followers";
	render(<Provider store={store}><MemoryRouter><ModalFollowers open={true} handleClose={onClose} setValueTabs={setValueTabs} valueTabs={valueTabs} /></MemoryRouter></Provider>);
});

it("ModalFollowers should close", async () => {
	const user = userEvent.setup();
	const valueTabs = "followers";

	const { getByTestId } = render(
		<Provider store={store}>
			<MemoryRouter>
				<ModalFollowers open={true} handleClose={onClose} setValueTabs={setValueTabs} valueTabs={valueTabs} />
			</MemoryRouter>
		</Provider>
	);

	const closeIcon = getByTestId("CloseIcon");
	await user.click(closeIcon);

	await expect(onClose).toHaveBeenCalled();
});

it('ModalFollowers should change to following', async () => {
	const user = userEvent.setup();

	const valueTabs = "followers";

	const { getByRole , getByTestId} = render(<Provider store={store}><MemoryRouter><ModalFollowers open={true} handleClose={onClose} setValueTabs={setValueTabs} valueTabs={valueTabs}/></MemoryRouter></Provider>);

	const followingtab = getByRole('tab', {name: /following/i});

	await user.click(followingtab);

	const followingtabpanel = getByTestId('following_tabpanel');
	const followerstabpanel = getByTestId('followers_tabpanel');

	await expect(followingtabpanel).toBeVisible;
	await expect(followerstabpanel).not.toBeVisible;
});

it('ModalFollowers should change to followers', async () => {
	const user = userEvent.setup();

	const valueTabs = "following";

	const { getByRole , getByTestId} = render(<Provider store={store}><MemoryRouter><ModalFollowers open={true} handleClose={onClose} setValueTabs={setValueTabs} valueTabs={valueTabs}/></MemoryRouter></Provider>);

	const followerstab = getByRole('tab', {name: /followers/i});

	await user.click(followerstab);

	const followingtabpanel = getByTestId('following_tabpanel');
	const followerstabpanel = getByTestId('followers_tabpanel');

	await expect(followingtabpanel).not.toBeVisible;
	await expect(followerstabpanel).toBeVisible;
});