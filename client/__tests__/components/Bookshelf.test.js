import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import Bookshelf from "../../src/components/Bookshelf";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store";
import { BrowserRouter as Router } from "react-router-dom";
import {logUserIn} from "../../src/redux/reducers/profileReducer.js";

afterEach(cleanup);

describe('Bookshelf Component', () => {
    const mockBooks = [
        { _id: '1', title: 'Book 1', authors: ['Author 1'], cover_image: 'image1.jpg' },
        { _id: '2', title: 'Book 2', authors: ['Author 2'], cover_image: 'image2.jpg' },
        { _id: '3', title: 'Book 3', authors: ['Author 3'], cover_image: 'image3.jpg' },
    ];

    const mockDeleteHandler = jest.fn();

    it('renders bookshelf with books', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Router>
                    <Bookshelf
                        id="bookshelf1"
                        title="Test Bookshelf"
                        books={mockBooks}
                        user="testUser"
                    />
                </Router>
            </Provider>
        );

        expect(getByText('Test Bookshelf')).toBeInTheDocument();

        expect(getByText('Book 1')).toBeInTheDocument();
        expect(getByText('Book 2')).toBeInTheDocument();
        expect(getByText('Book 3')).toBeInTheDocument();

    });

    it('renders placeholder on empty shelf', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Router>
                    <Bookshelf
                        id="emptyshelf"
                        title="Empty Shelf"
                        user="testUser"
                        books={[]}
                        hideAdding
                    />
                </Router>
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
                <Router>
                    <Bookshelf 
                        id="deleteshelf"
                        name="Delete shelf"
                        user="testUser"
                        books={mockBooks}
                        onBookDelete={mockDeleteHandler}
                    />
                </Router>
            </Provider>
        );

        const deleteButton = screen.getByTestId("DeleteIcon")
        await user.click(deleteButton);

        expect(screen.getByText('Are you sure that you want to delete this shelf?')).toBeInTheDocument();
    })
});