import { Container, Stack, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Suggestions from "../components/Suggestions";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { LoggedInContext } from "../Contexts.jsx";
import { ArrowBackIos, Add } from "@mui/icons-material";
import ModalBookcase from "../components/ModalBookcase.jsx";
import { useAlert } from "../hooks/useAlert.jsx";

export default function SearchPage() {
  const navigate = useNavigate();

  const shelf = useParams().shelf;
  const { loggedIn, username } = useContext(LoggedInContext);

  const [errMessage, setErrMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [showAlert, alertComponent] = useAlert(errMessage ? errMessage : "Succesfully added", 3000, errMessage ? "warning" : "success");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = (book) => {
    fetch(import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "/shelves/" + shelf, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book: book }),
    })
      .then((res) => {
        if (res.ok) {
          showAlert();
          navigate(-1);
        } else {
          res.json().then((message) => setErrMessage(message.error));
          showAlert();
        }
        console.log("succes", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: "20px",
      }}
    >
      {alertComponent}
      <Stack direction="column" alignItems="center">
        <Stack direction="row" alignItems="center" style={{ marginBottom: "5px" }}>
          <ArrowBackIos onClick={() => navigate(-1)} />
          <SearchBar onClick={handleAdd} />
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ margin: "5px", marginBottom: "20px" }} onClick={handleOpen}>
          <Add />
          <Typography>Choose from bookcase</Typography>
        </Stack>
        <ModalBookcase open={open} handleClose={handleClose} handleAdd={handleAdd} />
        <Suggestions />
      </Stack>
    </Container>
  );
}
