import {Link, useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header";
import { Add, ArrowBackIosNew, ArrowOutward } from "@mui/icons-material";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { LoggedInContext } from "../Contexts";
import { useContext, useEffect, useState } from "react";
import ModalShelf from "../components/ModalShelf";
import Bookcover from "../components/Bookcover";
import { useAlert } from "../hooks/useAlert";

export default function Detailpage({ setLoggedIn }) {
  const { loggedIn, username } = useContext(LoggedInContext);
  const navigate = useNavigate();
  const isbn = useParams().isbn;
  const [book, setBook] = useState({ authors: [] });
  const [bookWorks, setBookWorks] = useState({});
  const [open, setOpen] = useState(false);
  const [shelfInfo, setShelfInfo] = useState({ bookcase: [] });
  const [addError, setAddError] = useState();
  const [showAddAlert, addAlertComponent] = useAlert(addError || "Succesfully added to your bookcase", 3000, addError ? "error" : "success");
  const [removeError, setRemoveError] = useState();
  const [showRemoveAlert, removeAlertComponent] = useAlert(
    removeError || "Succesfully removed from your bookcase",
    3000,
    removeError ? "error" : "success"
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setBook(res[`ISBN:${isbn}`]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isbn]);

  useEffect(() => {
    if (book.identifiers && book.identifiers.openlibrary) {
      fetch(`https://openlibrary.org/books/${book.identifiers.openlibrary[0]}.json`)
        .then((res) => res.json())
        .then((data) => {
          fetch(`https://openlibrary.org${data.works[0].key}.json`)
            .then((res) => res.json())
            .then((data) => setBookWorks(data));
        });
    }
  }, [book]);

  useEffect(() => {
    if (loggedIn) {
      fetch(
        import.meta.env.VITE_BACKEND_HOST +
          "/user/" +
          username +
          "?" +
          new URLSearchParams({
            fields: ["top_three", "shelf", "bookcase"],
          }),
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (!res.error) setShelfInfo(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShelfInfo({ bookcase: [] });
    }
  }, [loggedIn, username, open]);

  async function addToBookcase(book) {
    const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${username}/bookcase`, {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book }),
    });
    if (!response.ok) {
      setAddError("Something went wrong adding this book to your bookcase");
    } else {
      setAddError(null);
      setShelfInfo({ ...shelfInfo, bookcase: [...shelfInfo.bookcase, book] });
    }
    showAddAlert();
  }

  async function removeFromBookcase(isbn) {
    const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${username}/bookcase/${isbn}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
    });
    if (!response.ok) {
      setRemoveError("Something went wrong removing this book from your bookcase");
    } else {
      setRemoveError(null);
      setShelfInfo({ ...shelfInfo, bookcase: shelfInfo.bookcase.filter((book) => book._id !== isbn) });
    }
    showRemoveAlert();
  }

  return (
    <>
      {addAlertComponent}
      {removeAlertComponent}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Header setLoggedIn={setLoggedIn} backButton />
      </Stack>
      <Stack alignItems="center">
        {loggedIn && username ? (
          shelfInfo.bookcase.find((book) => book._id === isbn) ? (
            <Button onClick={() => removeFromBookcase(isbn)}>Remove from bookcase</Button>
          ) : (
            <Button
              onClick={() =>
                addToBookcase({
                  _id: isbn,
                  cover_image: book.cover ? book.cover.medium : undefined,
                  title: book.title,
                  authors: book.authors.map((author) => author.name),
                })
              }
            >
              Add to bookcase
            </Button>
          )
        ) : null}
        <Box sx={{ margin: "10px", height: "280px" }}>
          <Bookcover isbn={isbn} cover_image={book.cover ? book.cover.medium : undefined} large />
        </Box>
        <Box sx={{ margin: "10px" }}>
          <Stack alignItems="center">
            <Typography align="center" variant="h2" fontWeight="700" gutterBottom>
              {book.title}
            </Typography>
            {book.subtitle != undefined ? (
              <Typography align="center" gutterBottom>
                {book.subtitle}
              </Typography>
            ) : null}
            {book.authors != undefined ? (
              <Typography variant="h6" color="#6A9D8A">
                {book.authors.map((author) => author.name).join(", ")}
              </Typography>
            ) : (
              <Typography variant="h6" color="#6A9D8A">
                No authors found
              </Typography>
            )}
          </Stack>
        </Box>
        <Chip
          onClick={handleOpen}
          sx={{ margin: "10px", fontSize: "14px", bgcolor: "#000000", color: "#FFFFFF" }}
          icon={<Add style={{ transform: "scale(0.7)", color: "#FFFFFF" }} />}
          label="Add to shelf"
        />

        <ModalShelf
          shelfInfo={shelfInfo}
          open={open}
          handleClose={handleClose}
          book={{
            _id: isbn,
            cover_image: book.cover != undefined ? book.cover.medium : null,
            title: book.title,
            authors: book.authors.map((author) => author.name),
          }}
        />

        {(book.identifiers && book.identifiers.amazon)?
            (<Link to={"https://www.amazon.com/gp/product/" + book.identifiers.amazon[0]}>
              <Chip sx={{ margin: "10px", fontSize: "14px" }} color="primary" icon={<ArrowOutward style={{ transform: "scale(0.7)" }} />} label="Buy" />
            </Link>):
            (<Link to={"https://www.amazon.com/s?k="+isbn}>
              <Chip sx={{ margin: "10px", fontSize: "14px" }} color="primary" icon={<ArrowOutward style={{ transform: "scale(0.7)" }} />} label="Buy" />
            </Link>)}
        {bookWorks.description ? (
          <Box sx={{ margin: "10px" }}>
            <Stack alignItems="center" mt={3}>
              <Typography align="center" variant="h4" fontWeight="700" gutterBottom>
                Summary
              </Typography>
              <Typography variant="body1" width="85%">
                {typeof bookWorks.description === "string" ? bookWorks.description : bookWorks.description.value}
              </Typography>
            </Stack>
          </Box>
        ) : null}
      </Stack>
    </>
  );
}
