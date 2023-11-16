import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Bookshelf from "../components/Bookshelf";
import { useState } from "react";
import { ArrowBackIos, Title } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";


export default function ShelfPage() {

    const navigate = useNavigate();
    const userName = useParams().userName;

    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const handleAdd = (book) => {
      setBooks([...books, book]);
    }

    const handleCreate = () => {
      if (books.length >= 3) {
        fetch(import.meta.env.VITE_BACKEND_HOST + '/user/' + userName + '/shelf', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name: title, books: books})
        }).then(res => {
          navigate(-1);
        })
      } else {
        setErrMessage("You need to add min 3 books");
      }
    }

    return (
      <>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          height="90vh"
        >
          <Stack direction="column" alignItems="center" sx={{width: "100%"}}>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{width: "100%"}}>
                <ArrowBackIos sx={{ left: "0", width: "32px", position:"absolute"}} onClick={() => navigate(-1)}/>
                <Typography variant="h5" sx={{ my: 1 }}>
                A shelf contains at least 3 books!
                </Typography>

            </Stack>
            <SearchBar onAdd={handleAdd}/>
          </Stack>

          <Stack gap={2} direction="column" alignItems="center">
            <Bookshelf books={books} hideAdding />
            <Typography variant="body1" style={{color: "red"}}>{errMessage}</Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Title sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Title"
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button sx={{ ml: 1 }} variant="contained" onClick={handleCreate}>Create Shelf</Button>
            </Box>
          </Stack>
        </Stack>
      </>
    );
}