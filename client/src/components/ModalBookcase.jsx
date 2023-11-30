import { Close } from "@mui/icons-material";
import { Modal, Typography, Stack, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../Contexts";

export default function ModalBookcase({ open, handleClose, handleAdd }) {
  const [bookcase, setBookcase] = useState([]);
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
          {bookcase.map((book) => (
            <Stack direction="row" onClick={() => handleAdd(book)}>
              <img src={book.cover_image} height="104px" width="68px" style={{ margin: "5px" }}></img>
              <Stack justifyContent="center">
                <Typography>{book.title}</Typography>
                <Typography>{book.authors.join(", ")}</Typography>
              </Stack>
            </Stack>
          ))}
        </Box>
      </Modal>
    </>
  );
}
