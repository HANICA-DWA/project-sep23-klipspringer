import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import Bookshelf from "../../src/components/Bookshelf";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store";
import { MemoryRouter } from "react-router-dom";
import {logUserIn} from "../../src/redux/reducers/profileReducer.js";
import * as router from 'react-router';

const navigate = jest.fn()

beforeEach(() => {
	jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

afterEach(cleanup);

describe('Bookshelf Component', () => {
    const mockBooks = [
        { _id: '1', title: 'Book 1', authors: ['Author 1'], cover_image: 'image1.jpg' },
        { _id: '2', title: 'Book 2', authors: ['Author 2'], cover_image: 'image2.jpg' },
        { _id: '3', title: 'Book 3', authors: ['Author 3'], cover_image: 'image3.jpg' },
    ];

    const mockDeleteHandler = jest.fn()

    it('renders bookshelf with books', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter >
                    <Bookshelf
                        id="bookshelf1"
                        title="Test Bookshelf"
                        books={mockBooks}
                        user="testUser"
                    />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Test Bookshelf')).toBeInTheDocument();

        expect(getByText('Book 1')).toBeInTheDocument();
        expect(getByText('Book 2')).toBeInTheDocument();
        expect(getByText('Book 3')).toBeInTheDocument();

    });

    it('renders placeholder text on empty shelf', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter >
                    <Bookshelf
                        id="emptyshelf"
                        title="Empty Shelf"
                        user="testUser"
                        books={[]}
                        hideAdding
                    />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('No books on this shelf')).toBeInTheDocument();

    });

    it('opens delete dialog when clicking on delete button', async () => {
        store.dispatch(logUserIn.fulfilled({
            _id: "testUser",
            loggedIn: true
        }, "fulfilled"));

        const user = userEvent.setup();

        render(
            <Provider store={store}>
                <MemoryRouter >
                    <Bookshelf 
                        id="deleteshelf"
                        name="Delete shelf"
                        user="testUser"
                        books={mockBooks}
                    />
                </MemoryRouter>
            </Provider>
        );

        const deleteButton = screen.getByTestId("DeleteIcon");
        await user.click(deleteButton);

        expect(screen.getByText('Are you sure that you want to delete this shelf?')).toBeInTheDocument();
    });

    it('calls onDelete prop when confirming deletion', async () => {
        store.dispatch(logUserIn.fulfilled({
            _id: "testUser",
            loggedIn: true
        }, "fulfilled"));

        const user = userEvent.setup();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Bookshelf 
                        id="deleteshelf"
                        name="Delete shelf"
                        user="testUser"
                        books={mockBooks}
                        onDelete={mockDeleteHandler}
                    />
                </MemoryRouter>
            </Provider>
        );
        
        const deleteButton = screen.getByTestId("DeleteIcon");
        await user.click(deleteButton);

        const yesButton = screen.getByText("Yes");
        await user.click(yesButton);

        expect(mockDeleteHandler).toHaveBeenCalledWith("deleteshelf")
    });

    it('redirect to the right page when clicking on edit', async () => {
        store.dispatch(logUserIn.fulfilled({
            _id: "testUser",
            loggedIn: true
        }, "fulfilled"));

        const user = userEvent.setup();

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/testUser/editshelf"]}>
                    <Bookshelf 
                        id="editshelf"
                        name="Edit shelf"
                        user="testUser"
                        books={mockBooks}
                    />
                </MemoryRouter>
            </Provider>
        );

        const editButton = screen.getByTestId("EditIcon");
        await user.click(editButton);

        const expectedResult = `/testUser/editshelf/edit`
        expect(navigate).toHaveBeenCalledWith(expectedResult);
    });

    it("doesn't show edit and delete button when not logged in", () => {
        store.dispatch(logUserIn.fulfilled({
            _id: "testUser",
            loggedIn: true
        }, "fulfilled"));

        const {queryByTestId} = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/testUser/editshelf"]}>
                    <Bookshelf 
                        id="notloggedinshelf"
                        name="Not loggedIn shelf"
                        user="differentUser"
                        books={mockBooks}
                    />
                </MemoryRouter>
            </Provider>
        );

        expect(queryByTestId("DeleteIcon")).toBeNull();
        expect(queryByTestId("EditIcon")).toBeNull();
    });

    it('Should redirect to detailpage when clicking on book', async () => {
        const user = userEvent.setup();

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/testUser/bookdetailshelf"]}>
                    <Bookshelf 
                        id="bookdetailshelf"
                        name="Edit shelf"
                        user="testUser"
                        books={mockBooks}
                    />
                </MemoryRouter>
            </Provider>
        );

        const book = screen.getByAltText("1");
        await user.click(book);

        const expectedResult = '/book/1';
        expect(navigate).toHaveBeenCalledWith(expectedResult);
    })

    it('should redirect to /add when clicking on plus sign', async () => {
        store.dispatch(logUserIn.fulfilled({
            _id: "testUser",
            loggedIn: true
        }, "fulfilled"));

        const user = userEvent.setup();

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/testUser/addshelf"]}>
                    <Bookshelf 
                        id="addshelf"
                        name="Add shelf"
                        user="testUser"
                        books={mockBooks}
                    />
                </MemoryRouter>
            </Provider>
        );

        const add = screen.getByAltText(/voeg een boek toe/i);
        await user.click(add);

        const expectedResult = '/testUser/addshelf/add';
        expect(navigate).toHaveBeenCalledWith(expectedResult);
    })
});