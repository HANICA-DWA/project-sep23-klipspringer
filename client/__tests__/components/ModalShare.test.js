import {cleanup, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalShare from "../../src/components/ModalShare.jsx";

import store from "../../src/redux/store/store.js";
import { MemoryRouter } from "react-router-dom";
import {Provider} from "react-redux";
import "@testing-library/jest-dom";

import * as router from 'react-router';

const navigate = jest.fn()

const onClose = jest.fn();

const alert = jest.fn();

beforeEach(() => {
	jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

afterEach(cleanup);

it("ModalShare should render without problems", () => {
	render(<Provider store={store}><MemoryRouter><ModalShare alert={alert} open={true} handleClose={onClose} /></MemoryRouter></Provider>);
});

it("ModalShare should close", async () => {
	const user = userEvent.setup();

	const { getByTestId } = render(<Provider store={store}><MemoryRouter><ModalShare alert={alert} open={true} handleClose={onClose} /></MemoryRouter></Provider>);


	const closeIcon = getByTestId("CloseIcon");
	await user.click(closeIcon);

	await expect(onClose).toHaveBeenCalled();
});

it("ModalShare link click should call alert", async () => {
	const user = userEvent.setup();

	const { getByTestId } = render(<Provider store={store}><MemoryRouter><ModalShare alert={alert} open={true} handleClose={onClose} /></MemoryRouter></Provider>);
	const link = getByTestId("ContentPasteIcon");

	await user.click(link);

	expect(alert).toHaveBeenCalled();
})
