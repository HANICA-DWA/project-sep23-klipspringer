import { Stack } from "@mui/material";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bookshelf from "../components/Bookshelf";
import CreateShelfButton from "../components/CreateShelfButton";
import { LoggedInContext } from "../Contexts";
import { useAlert } from "../hooks/useAlert";

export default function ShelfPage({ setLoggedIn }) {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState([]);
  const [shelfInfo, setShelfInfo] = useState({});
  const { loggedIn, username } = useContext(LoggedInContext);
  const { userName, shelf } = useParams();
  const [errMessage, setErrMessage] = useState("");
  const [setDeleteShelfAlertOn, deleteShelfAlert] = useAlert(errMessage ? errMessage : "Shelf deleted!", 3000, errMessage ? "error" : "success");
  const [showAlert, alertComponent] = useAlert(errMessage, 3000, "warning");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = (toAdd) => {
    const book = toAdd;
    book.forEach((book) => {
      if (books.find((item) => item._id === book._id)) {
        setErrMessage("This book is already on the shelf");
        showAlert();
      } else {
        handleClose();
        setBooks((prevBooks) => [...prevBooks, book]);
        setErrMessage("");
      }
    })
  };

  const handleEdit = () => {
    if (loggedIn && username === usernameParams) {
      if ((shelf === "top_three" && books.length <= 3) || (shelf !== "top_three" && books.length >= 3)) {
        setErrMessage("");
        fetch(import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "/shelves/" + shelf, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: title, books: books, type: "editshelf" }),
        }).then((res) => {
          if (res.ok) {
            navigate(`/${username}`);
          } else {
            res.json().then((message) => setErrMessage(message.error));
          }
        });
      } else {
        shelf === "top_three" ? setErrMessage("A top three has a max. of 3 books") : setErrMessage("You need to add min 3 books");
        showAlert();
      }
    } else {
      setErrMessage("Not allowed to add a shelf");
      showAlert();
    }
  };

  const handleBookDelete = (bookID) => {
    setBooks(books.filter((e) => e._id !== bookID));
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
            navigate(`/${username}`);
          } else {
            res.json().then((message) => setErrMessage(message.error));
          }
        });
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
    fetch(
      import.meta.env.VITE_BACKEND_HOST +
        "/user/" +
        userName +
        "?" +
        new URLSearchParams({
          fields: ["_id", "profile_picture", "shelf"],
        }),
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setProfileInfo(res);
        setShelfInfo(res.shelf.find((shelfFromUser) => shelfFromUser._id === shelf));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function deleteShelf(shelfID) {
    try {
      await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${username}/shelves/${shelfID}`, {
        method: "DELETE",
      });
      setShelfInfo({});
      setErrMessage("");
      navigate(`/${userName}`);
    } catch (err) {
      setErrMessage(err.message);
    }
    setDeleteShelfAlertOn();
  }

  return (
    <>
      {alertComponent}
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
                {shelf === "top_three" ? "Top three has max. 3 books" : "A shelf contains at least 3 books!"}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" width="100%">
              <ArrowBackIos onClick={() => navigate(-1)} />
              <SearchBar onClick={handleAdd} />
            </Stack>
            {!edit ?
              <Stack direction="row" sx={{ margin: "5px" }} onClick={handleOpen}>
                <Add />
                <Typography>Choose from bookcase</Typography>
              </Stack> : null
            }
            <ModalBookcase open={open} handleClose={handleClose} handleAdd={handleAdd} booksOnShelf={books}/>
          </Stack>

          <Stack gap={2} direction="column" alignItems="center" width="100%">
            {edit ? (
              <Bookshelf onBookDelete={handleBookDelete} id={shelf} user={username} books={books} edit={edit} hideAdding unclickable />
            ) : (
              <Bookshelf books={books} hideAdding unclickable />
            )}
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Title sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="Title" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Button sx={{ ml: 1 }} variant="contained" onClick={edit ? handleEdit : handleCreate}>
                {edit ? "Save Shelf" : "Create Shelf"}
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
