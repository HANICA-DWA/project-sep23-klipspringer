import { Box, Button, Container, FormControl, Stack, TextField, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Bookshelf from "../components/Bookshelf";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowBackIos, Title, Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import ModalBookcase from "../components/ModalBookcase";
import { getWebSocket } from "../data/websockets";
import { useDispatch, useSelector } from "react-redux";
import { addShelf, editBooksShelf } from "../redux/reducers/profileReducer";
const MemoizedBookshelf = React.memo(Bookshelf);

export default function ShelfCreatePage({ edit = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shelf } = useParams();
  const usernameParams = useParams().userName;
  const profile = useSelector((state) => state.profile);

  const localStorageBook = localStorage.getItem("book") != undefined ? [JSON.parse(localStorage.getItem("book"))] : [];
  const [books, setBooks] = useState(localStorageBook);
  const [title, setTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showAlert, alertComponent] = useAlert(errMessage, 3000, "warning");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = (toAdd) => {
    const book = toAdd;
    if (books.find((item) => item._id === book._id)) {
      setErrMessage("This book is already on the shelf");
      showAlert();
    } else {
      handleClose();
      if (!Array.isArray(book)) {
        setBooks((prevBooks) => [...prevBooks, book]);
      } else {
        book.forEach((item) => {
          if (Array.isArray(item)) {
            item.forEach((book) => setBooks((prevBooks) => [...prevBooks, book]));
          } else {
            setBooks((prevBooks) => [...prevBooks, item]);
          }
        });
      }
      setErrMessage("");
    }
  };

  const handleEdit = () => {
    if (profile.loggedIn && profile._id === usernameParams) {
      if ((shelf === "top_three" && books.length <= 3) || (shelf !== "top_three" && books.length >= 3)) {
        const cb = (error) => {
          setErrMessage(error);
          if (shelf === "top_three") {  
            getWebSocket().send(JSON.stringify({ type: "edited_top_three", link: `/${profile._id}` }));
            navigate(`/${profile._id}`);
          } else {
            getWebSocket().send(JSON.stringify({ type: "edited_shelf", link: `/${profile._id}/${shelf}` }));
            navigate(`/${profile._id}/${shelf}`);
          }
        };
        dispatch(editBooksShelf({ shelf, body: { name: title, books: books, type: "editshelf" }, cb }));
      } else {
        shelf === "top_three" ? setErrMessage("A top three has a max. of 3 books") : setErrMessage("You need to add min 3 books");
        showAlert();
      }
    } else {
      setErrMessage("Not allowed to add a shelf");
      showAlert();
    }
  };

  const handleBookDelete = useCallback(
    (bookID) => {
      setBooks(books.filter((e) => e._id !== bookID));
    },
    [books]
  );

  const handleCreate = () => {
    if (profile.loggedIn && profile._id === usernameParams) {
      if (books.length >= 3) {
        const cb = (message) => {
          setErrMessage(message.error);
          if (!message.error) {
            getWebSocket().send(JSON.stringify({ type: "new_shelf", link: `/${profile._id}/${message._id}` }));
            navigate(`/${profile._id}`);
          }
        };
        dispatch(addShelf({ name: title, books, cb }));
      } else {
        setErrMessage("You need to add min 3 books");
        showAlert();
      }
    } else {
      setErrMessage("Not allowed to add a shelf");
      showAlert();
    }
  };

  useEffect(() => {
    if (edit) {
      let editshelf;
      if (shelf !== "top_three") {
        editshelf = profile.shelf.find((e) => e._id === shelf);
      } else {
        editshelf = profile.top_three;
      }
      setBooks(editshelf.books);
      if (editshelf.name)
        setTitle(editshelf.name);
    }
  }, [usernameParams, profile.shelf, profile.top_three, shelf]);

  return (
    <>
      {alertComponent}
      <Container
        maxWidth="sm"
        sx={{
          paddingTop: "20px",
        }}
      >
        <Stack direction="column" alignItems="center" justifyContent="space-between" minHeight="90vh">
          <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
              <Typography variant="h5" sx={{ my: 1 }}>
                {shelf === "top_three" ? "Top three has max. 3 books" : "A shelf contains at least 3 books!"}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" width="100%">
              <ArrowBackIos onClick={() => navigate(-1)} />
              <SearchBar onClick={handleAdd} booksOnShelf={books} />
            </Stack>
            {!edit ? (
              <>
                <Stack direction="row" sx={{ margin: "5px" }} onClick={handleOpen}>
                  <Add />
                  <Typography>Choose from bookcase</Typography>
                </Stack>
                <ModalBookcase open={open} handleClose={handleClose} handleAdd={handleAdd} booksOnShelf={books} />
              </>
            ) : null}
          </Stack>

          <Stack gap={2} direction="column" alignItems="center" width="100%">
            {edit ? (
              <MemoizedBookshelf onBookDelete={handleBookDelete} id={shelf} user={profile._id} books={books} edit={edit} hideAdding unclickable />
            ) : (
              <MemoizedBookshelf books={books} hideAdding unclickable placeholder />
            )}
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Title sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  edit ? handleEdit() : handleCreate();
                }}
              >
                <FormControl sx={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <TextField id="input-with-sx" label="Title" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <Button sx={{ ml: 1, height: "80%" }} variant="contained" type="submit" data-testid="save-shelf">
                    {edit ? "Save shelf" : "Create shelf"}
                  </Button>
                </FormControl>
              </form>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
