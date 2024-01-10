import {Link, useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header";
import { Add, ArrowBackIos, ArrowOutward, Bookmark } from "@mui/icons-material";
import { Box, Button, Chip, Stack, Typography, Link as LinkMUI } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalShelf from "../components/ModalShelf";
import Bookcover from "../components/Bookcover";
import { useAlert } from "../hooks/useAlert";
import { useDispatch, useSelector } from "react-redux";
import { addToBookcase, removeFromBookcase } from "../redux/reducers/profileReducer";

export default function Detailpage() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isbn = useParams().isbn;
  const [book, setBook] = useState({ authors: [] });
  const [bookWorks, setBookWorks] = useState({});
  const [open, setOpen] = useState(false);
  const [addError, setAddError] = useState();
  const [showAddAlert, addAlertComponent] = useAlert(addError || "Succesfully added to your bookcase", 3000, addError ? "error" : "success");
  const [removeError, setRemoveError] = useState();
  const [readMore, setReadMore] = useState(false);
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

  async function bookcaseHandler(book) {
    if (profile.bookcase.find((book) => book._id === isbn)) {
      const cb = (error) => {
        setRemoveError(error);
        showRemoveAlert();
      };
      dispatch(removeFromBookcase({ isbn: book._id, cb }));
    } else {
      const cb = (error) => {
        setAddError(error);
        showAddAlert();
      };
      dispatch(addToBookcase({ book, cb }));
    }
  }

  function handleReadMore(summary) {
    if (summary.length > 200) {
      return (
        <Stack alignItems="center">
          <Typography variant="body1" width="85%" sx={{ overflowWrap: "anywhere" }}>
            {!readMore ? summary.substr(0, 200) + "..." : summary}
          </Typography>
          <Button onClick={() => setReadMore(!readMore)}>{!readMore ? "Read more" : "Read less"}</Button>
        </Stack>
      );
    } else {
      return (
        <Typography variant="body1" width="85%" sx={{ overflowWrap: "anywhere" }}>
          {summary}
        </Typography>
      );
    }
  }

  return (
    <>
      {addAlertComponent}
      {removeAlertComponent}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Header />
      </Stack>
      <ArrowBackIos onClick={() => navigate(-1)} sx={{ paddingLeft: "15px" }} />
      <Stack alignItems="center">
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
              <Typography variant="h6" color="primary" textAlign="center">
                {book.authors.map((author, index, array) => {
                  const url = new URL(author.url);
                  const authorId = url.pathname.split("/").slice(2, 3)[0];
                  return (
                    <React.Fragment key={author.name}>
                      <Link data-testid="author-page-link" to={`/author/${authorId}`} style={{ color: "inherit" }}>
                        {author.name}
                      </Link>
                      {index < array.length - 1 && ", "}
                    </React.Fragment>
                  );
                })}
              </Typography>
            ) : (
              <Typography variant="h6" color="primary">
                No authors found
              </Typography>
            )}
          </Stack>
        </Box>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Chip
            onClick={handleOpen}
            sx={{ margin: "10px", fontSize: "14px", bgcolor: "#000000", color: "#FFFFFF" }}
            icon={<Add style={{ transform: "scale(0.7)", color: "#FFFFFF" }} />}
            label="Add to shelf"
          />
          {profile.loggedIn && profile._id ? (
            <Bookmark
              color={profile.bookcase.find((book) => book._id == isbn) ? "primary" : "disabled"}
              fontSize="large"
              onClick={() =>
                bookcaseHandler({
                  _id: isbn,
                  cover_image: book.cover ? book.cover.medium : "",
                  title: book.title,
                  authors: book.authors ? book.authors.map((author) => author.name) : [],
                })
              }
              sx={{ cursor: "pointer" }}
            />
          ) : null}
        </Stack>

        <ModalShelf
          shelfInfo={{ top_three: profile.top_three, shelf: profile.shelf }}
          open={open}
          handleClose={handleClose}
          book={{
            _id: isbn,
            cover_image: book.cover != undefined ? book.cover.medium : null,
            title: book.title,
            authors: book.authors != undefined ? book.authors.map((author) => author.name) : [],
          }}
        />

        {book.identifiers && book.identifiers.amazon ? (
          <LinkMUI href={"https://www.amazon.com/gp/product/" + book.identifiers.amazon[0]} target="_blank">
            <Chip sx={{ margin: "10px", fontSize: "14px" }} color="primary" icon={<ArrowOutward style={{ transform: "scale(0.7)" }} />} label="Buy" />
          </LinkMUI>
        ) : (
          <LinkMUI href={"https://www.amazon.com/s?k=" + isbn} target="_blank">
            <Chip sx={{ margin: "10px", fontSize: "14px" }} color="primary" icon={<ArrowOutward style={{ transform: "scale(0.7)" }} />} label="Buy" />
          </LinkMUI>
        )}
        {bookWorks.description ? (
          <Box sx={{ margin: "10px" }}>
            <Stack alignItems="center" mt={3}>
              <Typography align="center" variant="h4" fontWeight="700" gutterBottom>
                Summary
              </Typography>
              {typeof bookWorks.description === "string" ? handleReadMore(bookWorks.description) : handleReadMore(bookWorks.description.value)}
            </Stack>
          </Box>
        ) : null}
      </Stack>
    </>
  );
}
