import { cleanup, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import Bookshelf from "../../src/components/Bookshelf";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe('Bookshelf Component', () => {
    const mockBooks = [
        { _id: '1', title: 'Book 1', authors: ['Author 1'], cover_image: 'image1.jpg' },
        { _id: '2', title: 'Book 2', authors: ['Author 2'], cover_image: 'image2.jpg' },
        { _id: '3', title: 'Book 3', authors: ['Author 3'], cover_image: 'image3.jpg' },
    ];

    // const mockProfile = {
    //     loggedIn: true,
    //     _id: "testUser"
    // };

    it('renders bookshelf with books',  () => {
         const {getByText} = render(
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

    it('renders placeholder on empty shelf',  () => {
        const {getByText} = render(
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
});