import { cleanup, render, screen } from "@testing-library/react";
import MultipleBooks from "../../src/components/MultipleBooks";
import { act } from "react-test-renderer";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

// const handlePick = jest.fn();

// beforeEach(() => {
//     jest.spyOn('handlePick').mockImplementation(() => jest.fn());
// })

afterEach(cleanup);

it("Should render the MultipleBooks component", () => {
    render(<MultipleBooks 
        booksOnShelf={[]}
        books={[]}
        book={{   
            _id: "1234562323",
            title: "test123",
            authors: ["test"],
            cover_image: "test"}}
    />);
});

it("Should be able to select and deselect books", async () => {
    const user = userEvent.setup();
    let books = [];
    const setBooks = jest.fn();

    const {getByTestId} = render(<MultipleBooks 
        books={books}
        setBooks={setBooks}
        book={{   
            _id: "1234562323",
            title: "test123",
            authors: ["test"],
            cover_image: "test"}}
    />);

    expect(getByTestId("AddIcon")).toBeInTheDocument();

    await act(async () => {
        await user.click(getByTestId("AddIcon").parentElement);
    });

    expect(setBooks).toHaveBeenCalled();

});

it("Should not be able to select more than 3 books on top three", async () => {
    const user = userEvent.setup();
    let books = [];
    const setBooks = jest.fn();
    const setErrMessage = jest.fn();

    const {getByTestId} = render(<MultipleBooks 
        books={books}
        setBooks={setBooks}
        book={{   
            _id: "1234562323",
            title: "test123",
            authors: ["test"],
            cover_image: "test"}}
        showAlert={() => {}}
        setErrMessage={setErrMessage}
        topThreeLength={3}
        setTopThreeLength={() => {}}
    />);

    expect(getByTestId("AddIcon")).toBeInTheDocument();

    await act(async () => {
        await user.click(getByTestId("AddIcon").parentElement);
    });

    expect(setBooks).not.toHaveBeenCalled();
    expect(setErrMessage).toHaveBeenCalledWith("You can only have 3 books on this shelf")
});