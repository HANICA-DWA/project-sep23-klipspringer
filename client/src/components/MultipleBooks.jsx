import { Add, Check } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function MultipleBooks({ booksOnShelf, books, setBooks, book, setErrMessage, showAlert, topThreeLength, setTopThreeLength }) {
    function handlePick(book) {
        if (booksOnShelf) {
            if (!booksOnShelf.find((item) => item._id === book._id)) {
                if (books.find((item) => item._id === book._id)) {
                    handleBookDeselection(book);
                } else {
                    handleBookSelect(book);
                }
            } else {
                setErrMessage("Book already on shelf");
                showAlert();
            }
        } else if (books.find((item) => item._id === book._id)) {
            handleBookDeselection(book);
        } else {
            handleBookSelect(book);
        }
    }

    function handleBookSelect(book) {
        if (topThreeLength && topThreeLength === 3) {
            setErrMessage("You can only have 3 books on this shelf");
            showAlert();
        } else {
            if (topThreeLength != undefined) {
                setTopThreeLength(topThreeLength + 1);
            }
            setBooks((prevBooks) => [...prevBooks, book]);
        }
    }

    function handleBookDeselection(book) {
        if (topThreeLength != undefined) {
            setTopThreeLength(topThreeLength - 1);
        }
        setBooks((prevBooks) => prevBooks.filter((item) => item._id !== book._id));
    }

    return (
        <Box onClick={() => {booksOnShelf ? (!booksOnShelf.find((shelfBook) => shelfBook._id === book._id)) ? handlePick(book) : null : handlePick(book)}}>
            {booksOnShelf ?
                (!booksOnShelf.find((shelfBook) => shelfBook._id === book._id)) ?
                    (books.find((item) => item._id == book._id)) ?
                        <Check sx={{ color: "white", borderRadius: "20px", bgcolor: "black", transform: "scale(0.7)", padding: "5px" }} />
                        :
                        <Add sx={{ border: "1px solid black", borderRadius: "20px", transform: "scale(0.7)", padding: "5px" }} />
                    : null
                : (books.find((item) => item._id == book._id)) ?
                    <Check sx={{ color: "white", borderRadius: "20px", bgcolor: "black", transform: "scale(0.7)", padding: "5px" }} />
                    :
                    <Add sx={{ border: "1px solid black", borderRadius: "20px", transform: "scale(0.7)", padding: "5px" }} />}
        </Box>
    )
}