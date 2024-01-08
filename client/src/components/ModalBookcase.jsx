import { Add, Check, Close } from "@mui/icons-material";
import { Modal, Typography, Stack, Box, Button } from "@mui/material";
import { useState } from "react";
import Bookcover from "./Bookcover";
import { useAlert } from "../hooks/useAlert";
import MultipleBooks from "./MultipleBooks";
import { useSelector } from "react-redux";

export default function ModalBookcase({ open, handleClose, handleAdd, booksOnShelf, topThreeLength, setTopThreeLength }) {
  const [bookcase, setBookcase] = useState([]);
  const [books, setBooks] = useState([])
  const [errMessage, setErrMessage] = useState("");
  const [showAlert, alertComponent] = useAlert(errMessage, 1500, "warning");
  const profile = useSelector(state => state.profile)

  const styleModal = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    bgcolor: "white",
  };

  function addBooks(book) {
    if (books.length == 0) {
      setErrMessage("You need to pick min 1 book");
      showAlert();
    } else {
      handleAdd(book);
      setBooks([]);
    }
  }

  return (
    <>
      {alertComponent}
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <Stack direction="row" justifyContent="center" alignItems="center" sx={{ padding: "15px", bgcolor: "#F3F3F3" }}>
            <Typography fontWeight="600" color="#8D8D8D" align="center">
              Choose from bookcase
            </Typography>
            <Close onClick={handleClose} sx={{ position: "absolute", right: "10px", transform: "scale(0.8)" }} />
          </Stack>
          <Box sx={{ height: "85%", overflowY: "scroll" }}>
            {profile.bookcase && profile.bookcase.length > 0 ? profile.bookcase.map((book) => (
              <Stack
                key={book._id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ margin: "5px 12px 5px 12px", opacity: booksOnShelf.find((shelfBook) => shelfBook._id === book._id) ? 0.3 : 1 }}
                data-testid="modal-bookcase-item"
              >
                <Stack direction="row">
                  <div style={{ margin: "5px", height: "104px", width: "68px" }}>
                    <Bookcover isbn={book._id} cover_image={book.cover_image} />
                  </div>
                  <Stack justifyContent="center" maxWidth="70%">
                    <Typography fontWeight="700">{book.title}</Typography>
                    <Typography>{book.authors.join(", ")}</Typography>
                  </Stack>
                </Stack>
                <MultipleBooks
                  booksOnShelf={booksOnShelf} books={books} setBooks={setBooks} book={book}
                  setErrMessage={setErrMessage} showAlert={showAlert}
                  topThreeLength={topThreeLength} setTopThreeLength={setTopThreeLength}
                />
              </Stack>
            )) : (
              <Typography variant="h5" order="2" align="center" margin="5px">
                No books in the bookcase
              </Typography>
            )}
          </Box>
          <Stack justifyContent="center" sx={{ bgcolor: "white", width: "100vw" }}>
            <Button variant="contained" sx={{ margin: "5px" }} onClick={() => addBooks(books)}>
              Add to shelf
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
