import { Typography, Card, Stack, CardMedia, ImageList, Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { useDialog } from "../hooks/useDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "../hooks/useAlert";
import Bookcover from "./Bookcover";
import { useSelector } from "react-redux";

export default function Bookshelf({ id, title, books = [], hideAdding, user, unclickable, onDelete, edit, onBookDelete, nrOfColums = 3, placeholder, hideDesc }) {
  const profile = useSelector(state => state.profile)
  const [errMessage, setErrMessage] = useState("");
  const [showAlert, alertComponent] = useAlert(errMessage, 3000, "warning");
  const navigate = useNavigate();
  const [bookshelfBooks, setBookshelfBooks] = useState(books);
  const placeholderBooks = [];
  const [setDialogOpen, dialog] = useDialog(null, "Are you sure that you want to delete this shelf?", "No", "Yes", onDelete, id);
  const [groupedBooks, setGroupedBooks] = useState([]);

  useEffect(() => {
    setBookshelfBooks(books);
  }, [books]);

  useEffect(() => {
    if (id === 'top_three') {
      setGroupedBooks([[...bookshelfBooks]]);
      return;
    }

    if (bookshelfBooks.length === 0) {
      setGroupedBooks([[]]);
      return;
    }

    const result = bookshelfBooks.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / nrOfColums)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])

    setGroupedBooks(result)
  }, [bookshelfBooks])

  function handleLongName(name) {
    if (name.length > 30) {
      return (
          <Typography width="85px" variant="caption" fontWeight="600" sx={{ overflowWrap: "anywhere" }}>
            {name.substr(0, 30) + "..."}
          </Typography>
      );
    } else {
      return (
        <Typography width="85px" variant="caption" fontWeight="600" sx={{ overflowWrap: "anywhere" }}>
          {name}
        </Typography>
      );
    }
  }

  if ((bookshelfBooks.length === 0 && (!profile.loggedIn || profile._id !== user)) || (bookshelfBooks.length === 0 && hideAdding)) {
    placeholderBooks.push(<div key="p1"></div>);
    placeholderBooks.push(
      <Typography key="p2" variant="h5" order="2">
        No books on this shelf
      </Typography>);
  }

  for (let i = bookshelfBooks.length; i < 3; i++) {
    if (profile.loggedIn && profile._id === user && !hideAdding) {
      placeholderBooks.push(
        <Card key={i} style={{ width: "85px", height: "160px" }}>
          <div onClick={() => { navigate(`/${user}/${id}/add`) }}>
            <CardMedia shelf={id} height="160" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
          </div>
        </Card>
      );
    }
  }

  return (
    <>
      <Stack direction="column" alignItems="center">
        {dialog}
        {alertComponent}
        <Typography gutterBottom variant="h5" fontWeight="800" sx={{ overflowWrap: "anywhere", maxWidth: "100%", textAlign: "center" }}>
          {title}
        </Typography>
        {unclickable ? null : profile.loggedIn && profile._id === user && !edit ? (
          <>
            <IconButton
              onClick={() => {
                navigate(`/${profile._id}/${id}/edit`);
              }}
            >
              <Edit />
            </IconButton>
            {id !== "top_three" ? (
              <IconButton
                onClick={() => {
                  setDialogOpen();
                }}
              >
                <Delete />
              </IconButton>
            ) : null}
          </>
        ) : null}
        {groupedBooks.map((books, i) => {
          return (
            <Stack alignItems="center" key={i}>
              <Stack direction="row" justifyContent="center" spacing={1}>
                <ImageList cols={nrOfColums}>
                  {books.map((item) => (
                    <Card key={item._id}>
                      <Box sx={{ width: "85px", height: "160px", display: "flex", justifyContent: "flex-end" }}>
                        {profile.loggedIn && profile._id === user && edit ? (
                          <IconButton
                            sx={{
                              position: "absolute",
                              marginTop: "-0.6rem",
                              marginRight: "-0.6rem",
                              bgcolor: "black",
                              borderRadius: "50%",
                              width: "1.7rem",
                              height: "1.7rem",
                              "&:hover": {
                                bgcolor: "primary.main",
                              },
                            }}
                            onClick={() => onBookDelete(item._id)}
                          >
                            <DeleteIcon
                              sx={{
                                position: "relative",
                                color: "white",
                                width: "1rem",
                                height: "1rem",
                              }}
                            />
                          </IconButton>
                        ) : null}
                        <div onClick={() => unclickable ? null : navigate(`/book/${item._id}`)}>
                          <Bookcover isbn={item._id} cover_image={item.cover_image} />
                        </div>
                      </Box>
                    </Card>
                  ))}
                  {placeholderBooks.length !== 0 ? (
                    placeholderBooks
                  ) : profile.loggedIn && profile._id === user && !hideAdding && id !== "top_three" && books.length < 4 ? (
                    <Card key={id} style={{ width: "85px", height: "160px" }}>
                      <div onClick={() => { navigate(`/${user}/${id}/add`) }}>
                        <CardMedia shelf={id} height="160" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
                      </div>
                    </Card>
                  ) : (
                    ""
                  )}
                </ImageList>
              </Stack>
              <Stack direction="row" justifyContent="center" sx={{ height: "20px", width: `${nrOfColums * 100}px`, maxWidth: "98vw", overflow: "hidden" }}>
                <img style={{ width: "100%" }} src="/images/bookshelf.jpg" alt="bookshelf"></img>
              </Stack>
              {!hideDesc ? (<Stack direction="row" justifyContent="start" sx={{ marginLeft: "5px", width: `${nrOfColums * 88}px` }}>
                {books.map((item) => (
                  <Stack margin="2px" key={item._id}>
                    {handleLongName(item.title)}
                    <Typography width="85px" variant="caption" sx={{ overflowWrap: "anywhere" }}>{item.authors ? item.authors[0] : null}</Typography>
                  </Stack>
                ))}
              </Stack>) : null}
            </Stack>)
        }
        )}
      </Stack>
    </>
  );
}
