import { Container, Stack, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Suggestions from "../components/Suggestions";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { LoggedInContext } from "../Contexts.jsx";
import { ArrowBackIos } from "@mui/icons-material";

export default function SearchPage() {
  const navigate = useNavigate();

  const shelf = useParams().shelf;
  const { loggedIn, username } = useContext(LoggedInContext);

  const [errMessage, setErrMessage] = useState("");

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
          navigate(-1);
        } else {
          res.json().then((message) => setErrMessage(message.error));
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
      <Stack direction="row" alignItems="center" style={{ marginBottom: "25px" }}>
        <ArrowBackIos onClick={() => navigate(-1)} />
        <SearchBar onAdd={handleAdd} />
      </Stack>
      <Typography align="center" variant="body1" style={{ color: "red" }}>
        {errMessage}
      </Typography>
      <Suggestions />
    </Container>
  );
}
