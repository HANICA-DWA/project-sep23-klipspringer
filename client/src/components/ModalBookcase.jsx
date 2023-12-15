import { Add, Check, Close } from "@mui/icons-material";
import { Modal, Typography, Stack, Box, Button } from "@mui/material";
import { useState } from "react";
import Bookcover from "./Bookcover";
import { useAlert } from "../hooks/useAlert";
import { useSelector } from "react-redux";

export default function ModalBookcase({ open, handleClose, handleAdd, booksOnShelf, topThreeLength, setTopThreeLength}) {
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
            {profile.bookcase.length > 0 ? profile.bookcase.map((book) => (
              <Stack
                key={book._id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                onClick={() => {
                  if (!booksOnShelf.find((shelfBook) => shelfBook._id === book._id)) handlePick(book);
                }}
                sx={{ margin: "5px 12px 5px 12px", opacity: booksOnShelf.find((shelfBook) => shelfBook._id === book._id) ? 0.3 : 1 }}
              >
                <Stack direction="row">
                  <div style={{ margin: "5px", height: "104px", width: "68px" }}>
                    <Bookcover isbn={book._id} cover_image={book.cover_image} />
                  </div>
                  <Stack justifyContent="center">
                    <Typography fontWeight="700">{book.title}</Typography>
                    <Typography>{book.authors.join(", ")}</Typography>
                  </Stack>
                </Stack>
                {!booksOnShelf.find((shelfBook) => shelfBook._id === book._id) ? (
                  books.find((item) => item._id == book._id) ? (
                    <Check sx={{ color: "white", borderRadius: "20px", bgcolor: "black", transform: "scale(0.7)", padding: "5px" }} />
                  ) : (
                    <Add sx={{ border: "1px solid black", borderRadius: "20px", transform: "scale(0.7)", padding: "5px" }} />
                  )
                ) : null}
              </Stack>
            )):(
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
