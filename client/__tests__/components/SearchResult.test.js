import { cleanup, render, waitFor } from "@testing-library/react";
import SearchResult from "../../src/components/SearchResult";
import userEvent from "@testing-library/user-event";


afterEach(cleanup);

it("Should render the SearchResult component", () => {
    render(<SearchResult 
        book={{
            title: "test",
            authors: ["test"],
            isbn: ["1234567890"]
        }}
        fullSearch
    />);
});

it("Should link to the book page", () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    const { getByTestId } = render(<SearchResult 
        book={{
            title: "test",
            authors: ["test"],
            isbn: ["1234567890"]
        }}
        fullSearch
        onClick={onClickMock}
    />);

    const resultButton = getByTestId("search-result-button")

    console.log(resultButton.outerHTML);

    user.click(resultButton);

    waitFor(() => expect(onClickMock).toHaveBeenCalled());
});