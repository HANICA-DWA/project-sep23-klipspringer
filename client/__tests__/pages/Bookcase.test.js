import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import Bookcase from "../../src/pages/Bookcase";
import * as router from 'react-router';
import { Provider } from "react-redux";
import store from "../../src/redux/store/store";
import { MemoryRouter } from "react-router-dom";
import {logUserIn} from "../../src/redux/reducers/profileReducer.js";

const navigate = jest.fn();

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    store.dispatch(logUserIn.fulfilled({
        _id: "testUser",
        bookcase: [
            { _id: '1', title: 'Book 1', authors: ['Author 1'], cover_image: 'image1.jpg' },
            { _id: '2', title: 'Book 2', authors: ['Author 2'], cover_image: 'image2.jpg' },
            { _id: '3', title: 'Book 3', authors: ['Author 3'], cover_image: 'image3.jpg' },
        ],
    }, "fulfilled"));
});

afterEach(cleanup);

it('should render bookcase with books', () => {
    const {getByAltText} = render(
        <Provider store={store}>
            <MemoryRouter>
                <Bookcase />
            </MemoryRouter>
        </Provider>
    )

    expect(getByAltText("1")).toBeInTheDocument();
    expect(getByAltText("2")).toBeInTheDocument();
    expect(getByAltText("3")).toBeInTheDocument();
});

it('should redirect to detailpage when clicking on book', async () => {
    const user = userEvent.setup();

    const {getByAltText} = render(
        <Provider store={store}>
            <MemoryRouter>
                <Bookcase />
            </MemoryRouter>
        </Provider>
    )

    const book = getByAltText("1");
    await user.click(book);

    const expectedResult = "/book/1";
    expect(navigate).toHaveBeenCalledWith(expectedResult, expect.anything());
});