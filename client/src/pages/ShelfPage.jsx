import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Bookshelf from "../components/Bookshelf";
import { useContext, useState } from "react";
import { ArrowBackIos, Title } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { LoggedInContext } from "../Contexts";

export default function ShelfPage() {
  const navigate = useNavigate();
  const usernameParams = useParams().userName;
  const { loggedIn, username } = useContext(LoggedInContext);

  const localStorageBook = localStorage.getItem("book") != undefined ? [JSON.parse(localStorage.getItem("book"))] : []
  console.log(localStorageBook)
  const [books, setBooks] = useState(localStorageBook);
  const [title, setTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleAdd = (toAdd) => {
    const book = toAdd.book
    if (books.find((item) => item._id === book._id)) {
      setErrMessage("This book is already on the shelf");
    } else {
      setBooks([...books, book]);
      setErrMessage("");
    }
  };

  const handleCreate = () => {
    if (loggedIn && username === usernameParams) {
      if (books.length >= 3) {
        setErrMessage("");
        fetch(import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "/shelf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: title, books: books }),
        }).then((res) => {
          if (res.ok) {
            navigate(-1);
          } else {
            res.json().then((message) => setErrMessage(message.error));
          }
        });
      } else {
        setErrMessage("You need to add min 3 books");
      }
    } else {
      setErrMessage("Not allowed to add a shelf");
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          paddingTop: "20px",
        }}
      >
        <Stack direction="column" alignItems="center" justifyContent="space-between" height="90vh">
          <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
              <Typography variant="h5" sx={{ my: 1 }}>
                A shelf contains at least 3 books!
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" width="100%">
              <ArrowBackIos onClick={() => navigate(-1)} />
              <SearchBar onClick={handleAdd} />
            </Stack>
          </Stack>

          <Stack gap={2} direction="column" alignItems="center" width="100%">
            <Bookshelf books={books} hideAdding />
            <Typography variant="body1" style={{ color: "red" }}>
              {errMessage}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Title sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="Title" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Button sx={{ ml: 1 }} variant="contained" onClick={handleCreate}>
                Create Shelf
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
