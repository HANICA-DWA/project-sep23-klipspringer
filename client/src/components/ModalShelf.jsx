import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Typography, Stack, Box } from "@mui/material";
import { Add, ArrowForward, Close } from "@mui/icons-material";
import { useAlert } from "../hooks/useAlert";
import { useDispatch, useSelector } from "react-redux";
import { addBookToShelf } from "../redux/reducers/profileReducer";

export default function ModalShelf({ shelfInfo, open, handleClose, book }) {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
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
    profile.loggedIn ? navigate(`/${profile._id}/shelf`) : navigate("/login");
  }

  function addToShelf(shelfName, book) {
    const cb = (error) => {
      setErrMessage(error);
      showAlert();
      if (!error) handleClose();
    };
    dispatch(addBookToShelf({ shelf: shelfName, book, cb }));
  }

  return (
    <>
      {alertComponent}
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <Stack direction="row" justifyContent="center" alignItems="center" sx={{ padding: "15px", borderBottom: "2px solid #EFEFEF" }}>
            <Typography fontWeight="600" align="center">
              What shelf?
            </Typography>
            <Close onClick={handleClose} sx={{ position: "absolute", right: "10px", transform: "scale(0.8)" }} />
          </Stack>
          <Box sx={{ height: "50vh", overflowY: "scroll" }}>
            {shelfInfo.top_three != undefined ? (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ padding: "10px", margin: "10px", border: "1px solid black", borderRadius: "5px" }}
                onClick={() => addToShelf("top_three", book)}
              >
                <Stack direction="row">
                  <Typography fontWeight="600" sx={{ paddingRight: "5px" }}>
                    {shelfInfo.top_three.name || "Top 3"}
                  </Typography>
                  <Typography color="#AFAFAF">{shelfInfo.top_three.books.length}</Typography>
                </Stack>
                <ArrowForward sx={{ transform: "scale(0.8)", color: "#AFAFAF" }} />
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
                    <Typography color="#AFAFAF">{shelf.books.length}</Typography>
                  </Stack>
                  <ArrowForward sx={{ transform: "scale(0.8)", color: "#AFAFAF" }} />
                </Stack>
              ))}
          </Box>
          <Stack direction="row" justifyContent="center" sx={{ margin: "20px" }} onClick={newShelf}>
            <Add sx={{ transform: "scale(0.6)" }} />
            <Typography>Create a new shelf</Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
