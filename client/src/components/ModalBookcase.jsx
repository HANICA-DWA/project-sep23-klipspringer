import { Add, Check, Close } from "@mui/icons-material";
import { Modal, Typography, Stack, Box, Icon, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../Contexts";
import Bookcover from "./Bookcover";

export default function ModalBookcase({ open, handleClose, handleAdd }) {
  const [bookcase, setBookcase] = useState([]);
  const [books, setBooks] = useState([])
  const { loggedIn, username } = useContext(LoggedInContext);

  const styleModal = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    bgcolor: "white",
    overflow: "scroll",
  };

  useEffect(() => {
    fetch(
      import.meta.env.VITE_BACKEND_HOST +
      `/user/${username}?` +
      new URLSearchParams({
        fields: ["bookcase"],
      }),
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setBookcase(res.bookcase);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handlePick(book) {
    if (books.find((item) => item._id == book._id)) {
      setBooks(books.filter((item) => item._id != book._id));
    } else {
      setBooks((prevBooks) => [...prevBooks, book]);
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <Stack direction="row" justifyContent="center" alignItems="center" sx={{ padding: "15px", bgcolor: "#F3F3F3" }}>
            <Typography fontWeight="600" color="#8D8D8D" align="center">
              Choose from bookcase
            </Typography>
            <Close onClick={handleClose} sx={{ position: "absolute", right: "10px", transform: "scale(0.8)" }} />
          </Stack>
          <Box sx={{ height: "85%", overflow: "scroll" }}>
            {bookcase.map((book) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                onClick={() => {
                  handlePick(book);
                }}
                sx={{ margin: "5px 12px 5px 12px" }}
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
                {books.find((item) => item._id == book._id) ?
                  <Check sx={{ color: "white", borderRadius: "20px", bgcolor: "black", transform: "scale(0.7)", padding: "5px" }} /> :
                  <Add sx={{ border: "1px solid black", borderRadius: "20px", transform: "scale(0.7)", padding: "5px" }} />
                }
              </Stack>
            ))}
          </Box>
          <Stack justifyContent="center" sx={{ bgcolor: "white", width: "100vw" }}>
            <Button variant="contained" sx={{ margin: "5px" }} onClick={() => {handleAdd(books); setBooks([])}}>Add to shelf</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
