import {cleanup, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalShare from "../../src/components/ModalShare.jsx";

import store from "../../src/redux/store/store.js";
import { MemoryRouter } from "react-router-dom";
import {Provider} from "react-redux";

import * as router from 'react-router';
import {logUserIn} from "../../src/redux/reducers/profileReducer.js";
import ModalFollowers from "../../src/components/ModalFollowers.jsx";

const navigate = jest.fn()

const onClose = jest.fn();

const alert = jest.fn();
const htmlToImageConvert = jest.fn();

beforeEach(() => {
	jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

afterEach(cleanup);

it("ModalShare should render without problems", () => {
	render(<Provider store={store}><MemoryRouter><ModalShare alert={alert} open={true} handleClose={onClose} /></MemoryRouter></Provider>);
});

it("ModalFollowers should close", async () => {
	const user = userEvent.setup();

	const { getByTestId } = render(<Provider store={store}><MemoryRouter><ModalShare alert={alert} open={true} handleClose={onClose} /></MemoryRouter></Provider>);


	const closeIcon = getByTestId("CloseIcon");
	await user.click(closeIcon);

	await expect(onClose).toHaveBeenCalled();
});

it("ModalFollowers should change html to image", async () => {
	const user = userEvent.setup();

	const { getByTestId , queryByTestId } = render(<Provider store={store}><MemoryRouter><ModalShare alert={alert} open={true} handleClose={onClose} /></MemoryRouter></Provider>);


	const downloadIcon = getByTestId("DownloadButton");
	await user.click(downloadIcon);

	const html = getByTestId('socialCard');
	const img = queryByTestId('socialCardPNG');

	await expect(html).not.toBeVisible;
	await expect(img).toBeInTheDocument;
	await expect(img).toBeVisible;
});
