import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../Contexts";
import { useContext, useState } from "react";
import { Modal, Typography, Stack, Box } from "@mui/material";
import { Add, ArrowForward, Close } from "@mui/icons-material";
import { useAlert } from "../hooks/useAlert";

export default function ModalShelf({ shelfInfo, open, handleClose, book }) {
  const { loggedIn, username } = useContext(LoggedInContext);
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [showAlert, alertComponent] = useAlert(errMessage || "Book succesfully added", 3000, errMessage ? "warning" : "success");

  const styleModal = {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100vw",
    bgcolor: "white",
    borderRadius: "10px 10px 0px 0px",
  };

  function newShelf() {
    localStorage.setItem("book", JSON.stringify(book));
    loggedIn ? navigate(`/${username}/shelf`) : navigate("/login");
  }

  function addToShelf(shelfName, book) {
    fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${username}/shelves/${shelfName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book: book }),
    })
      .then((res) => {
        if (res.ok) {
          setErrMessage(null);
          showAlert();
          handleClose();
        } else {
          res.json().then((message) => setErrMessage(message.error));
          showAlert();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {alertComponent}
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "15px"}}
          >
            <Typography fontWeight="600" align="center">
              What shelf?
            </Typography>
            <Close onClick={handleClose} sx={{ position: "absolute", right: "10px", transform: "scale(0.8)" }} />
          </Stack>
          {shelfInfo.top_three != undefined ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ padding: "10px", margin: "10px", border: "1px solid black", borderRadius: "5px"}}
              onClick={() => addToShelf("top_three", book)}
            >
              <Stack direction="row">
                <Typography fontWeight="600" sx={{ paddingRight: "5px" }}>
                  {shelfInfo.top_three.name}
                </Typography>
                <Typography color="#8D8D8D">{shelfInfo.top_three.books.length}</Typography>
              </Stack>
              <ArrowForward sx={{ transform: "scale(0.8)", color: "#8D8D8D" }} />
            </Stack>
          ) : null}
          {shelfInfo.shelf != undefined &&
            shelfInfo.shelf.map((shelf, index) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ padding: "10px", margin: "10px", border: "1px solid black", borderRadius: "5px" }}
                onClick={() => addToShelf(shelf._id, book)}
                key={`${shelf.name}${index}`}
              >
                <Stack direction="row">
                  <Typography fontWeight="600" sx={{ paddingRight: "5px" }}>
                    {shelf.name ? shelf.name : "Nameless shelf"}
                  </Typography>
                  <Typography color="#8D8D8D">{shelf.books.length}</Typography>
                </Stack>
                <ArrowForward sx={{ transform: "scale(0.8)", color: "#8D8D8D" }} />
              </Stack>
            ))}
          <Stack direction="row" justifyContent="center" sx={{ margin: "20px"}} onClick={newShelf}>
            <Add sx={{ transform: "scale(0.6)"}} />
            <Typography >Create a new shelf</Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
