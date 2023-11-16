import { Container, Typography, ImageList, ImageListItem } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Suggestions from "../components/Suggestions";
import {useNavigate, useParams} from "react-router-dom";
import {useContext} from "react";
import {LoggedInContext} from "../Contexts.jsx";

export default function SearchPage() {
    const navigate = useNavigate();

    const shelf = useParams().shelf;
    const username = useContext(LoggedInContext).username

    const handleAdd = (book) => {
        fetch(import.meta.env.VITE_BACKEND_HOST + '/user/' + username + "/book", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({book: book, shelf: shelf})
        }).then(res=> {
                navigate(-1);
                console.log("succes", res);
            }
        ).catch(res=>{
            console.log("failure", res);
            console.log("failure2", JSON.stringify(import.meta.env.VITE_BACKEND_HOST + '/' + username + "/book", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({book: book, shelf: shelf})
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
      <SearchBar onAdd={handleAdd} />
      <Suggestions />
    </Container>
  );
}
