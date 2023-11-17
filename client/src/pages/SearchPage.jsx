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
  const username = useContext(LoggedInContext).username;

  const [errMessage, setErrMessage] = useState("");

  const handleAdd = (book) => {
    fetch(import.meta.env.VITE_BACKEND_HOST + '/user/' + username + "/book", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ book: book, shelf: shelf })
    }).then((res) => {
      if(res.status == 200){
       navigate(-1);
      } else {
        res.json().then(message => setErrMessage(message.error))
      }
      console.log("succes", res);
    }
    ).catch((err) => {
      console.log("failure", err);
      console.log("failure2", JSON.stringify(import.meta.env.VITE_BACKEND_HOST + '/' + username + "/book", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ book: book, shelf: shelf })
      }));
    })
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: "50px",
      }}
    >
      <Stack direction="row" alignItems="center" style={{ marginBottom: "25px" }}>
        <ArrowBackIos onClick={() => navigate(-1)} />
        <SearchBar onAdd={handleAdd} />
      </Stack>
      <Typography align="center" variant="body1" style={{color: "red"}}>{errMessage}</Typography>
      <Suggestions />
    </Container>
  );
}
