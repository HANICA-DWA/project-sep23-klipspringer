import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Add, ArrowBackIosNew, ArrowOutward, ImageNotSupported } from "@mui/icons-material";
import {Box, Button, Chip, IconButton, Stack, Typography} from "@mui/material";
import { LoggedInContext } from "../Contexts";
import { useContext, useEffect, useState } from "react";
import ModalShelf from "../components/ModalShelf";
import Bookcover from "../components/Bookcover";
import {useAlert} from "../hooks/useAlert.jsx";
import DeleteIcon from "@mui/icons-material/Delete.js";

export default function Detailpage({ setLoggedIn }) {
  const { loggedIn, username } = useContext(LoggedInContext);
  const navigate = useNavigate();
  const isbn = useParams().isbn;
  const [book, setBook] = useState({});
  const [open, setOpen] = useState(false);
  const [shelfInfo, setShelfInfo] = useState([]);
    const [bookcaseInfo, setBookcaseInfo] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [showAlert, alertComponent] = useAlert(errMessage, 3000, "warning");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setBook(res[`ISBN:${isbn}`]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(
      import.meta.env.VITE_BACKEND_HOST +
        "/user/" +
        username +
        "?" +
        new URLSearchParams({
          fields: ["top_three", "shelf"],
        }),
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setShelfInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(
        import.meta.env.VITE_BACKEND_HOST +
        "/user/" +
        username +
        "?" +
        new URLSearchParams({
          fields: ["bookcase"],
        }),
        {
          method: "GET",
        }
    )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setBookcaseInfo(res.bookcase??[]);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  function deleteBookHandler(bookId) {
    if (loggedIn && username && bookcaseInfo.filter((book) => book._id === bookId).length > 0) {
      fetch(import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "/bookcase/" + bookId, {
        method: "DELETE",
      })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (!res.error) {
              navigate(-1);
            } else {
              setErrMessage(res.error);
              showAlert();
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  useEffect(() => {
    console.log("bookcaseInfo",bookcaseInfo)
  }, [bookcaseInfo]);

  function addToBookcase() {}

  return (
    <>
      {alertComponent}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ArrowBackIosNew sx={{ margin: "20px" }} onClick={() => navigate(-1)} />
        <Header setLoggedIn={setLoggedIn} />
        {loggedIn && username && bookcaseInfo.filter((book) => book._id === isbn).length > 0 ?(<IconButton aria-label="settings" onClick={() => deleteBookHandler(isbn)}>
          <DeleteIcon />
        </IconButton>):null}
      </Stack>
      <Stack alignItems="center">
        <Button onClick={addToBookcase}>Add to bookcase</Button>
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
              book.authors.map((author, index, array) => {
                {
                  return (
                    <Typography key={name[1]} variant="h6" color="#6A9D8A">
                      {author.name}
                      {index !== array.length - 1 ? ", " : ""}
                    </Typography>
                  );
                }
              })
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
          book={{ _id: isbn, cover_image: book.cover != undefined ? book.cover.medium : null }}
        />

        <Chip sx={{ margin: "10px", fontSize: "14px" }} color="primary" icon={<ArrowOutward style={{ transform: "scale(0.7)" }} />} label="Buy" />
      </Stack>
    </>
  );
}
