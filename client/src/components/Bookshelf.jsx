import { Typography, Card, Stack, CardMedia, ImageList, Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../Contexts";
import { Edit, Delete } from "@mui/icons-material";
import { useDialog } from "../hooks/useDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "../hooks/useAlert";
import Bookcover from "./Bookcover";

export default function Bookshelf({ id, title, books = [], hideAdding, user, unclickable, onDelete, edit, onBookDelete, nrOfColums = 3, placeholder }) {
  const { loggedIn, username } = useContext(LoggedInContext);
  const [errMessage, setErrMessage] = useState("");
  const [showAlert, alertComponent] = useAlert(errMessage, 3000, "warning");
  const navigate = useNavigate();
  const [bookshelfBooks, setBookshelfBooks] = useState(books);
  const placeholderBooks = [];
  const [setDialogOpen, dialog] = useDialog(null, "Are you sure that you want to delete this shelf?", "No", "Yes", onDelete, id);

  useEffect(() => {
    setBookshelfBooks(books);
  }, [books]);

  if ((bookshelfBooks.length === 0 && !loggedIn) || (bookshelfBooks.length === 0 && hideAdding)) {
    placeholderBooks.push(<div key="p1"></div>);
    placeholderBooks.push(
      <Typography key="p2" variant="h5" order="2">
        No books on this shelf
      </Typography>
    );
  }

  for (let i = bookshelfBooks.length; i < 3; i++) {
    if (loggedIn && username === user && !hideAdding) {
      placeholderBooks.push(
        <Card key={i} style={{ width: "85px", height: "160px" }}>
          <Link to={`/${user}/${id}/add`}>
            <CardMedia shelf={id} height="160" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
          </Link>
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
        {unclickable ? null : loggedIn && username === user && !edit ? (
          <>
            <IconButton
              onClick={() => {
                navigate(`/${username}/${id}/edit`);
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
        <Stack direction="row" justifyContent="center" spacing={2}>
          <ImageList cols={nrOfColums}>
            {bookshelfBooks.map((item) => (
              <>
                <Card key={item._id}>
                  <Box sx={{ width: "85px", height: "160px", display: "flex", justifyContent: "flex-end" }}>
                    {loggedIn && username === user && edit ? (
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
                    <Link to={unclickable ? null : `/book/${item._id}`} style={{ textDecoration: "none", color: "black" }}>
                      <Bookcover isbn={item._id} cover_image={item.cover_image} />
                    </Link>
                  </Box>
                </Card>
              </>
            ))}
            {placeholderBooks.length !== 0 ? (
              placeholderBooks
            ) : loggedIn && username === user && !hideAdding && id !== "top_three" ? (
              <Card key={id} style={{ width: "85px", height: "160px" }}>
                <Link to={`/${user}/${id}/add`}>
                  <CardMedia shelf={id} height="160" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
                </Link>
              </Card>
            ) : (
              ""
            )}
          </ImageList>
        </Stack>
        <Stack direction="row" sx={{ height: "20px", width: `${nrOfColums * 100}px`, maxWidth: "98vw", position: "relative", overflow: "hidden" }}>
          <img style={{ bottom: 0, left: 0, top: 0, right: 0, position: "absolute", width: "100%" }} src="/images/bookshelf.jpg" alt="bookshelf"></img>
        </Stack>
        <Stack direction="row">
          {bookshelfBooks.map((item) => (
            <Stack margin="3px">
              <Typography width="85px" variant="caption" fontWeight="600" >{item.title}</Typography>
              <Typography width="85px" variant="caption" >{item.authors[0]}</Typography>
            </Stack>
          ))}
          {placeholderBooks !== 0 ? placeholderBooks.map((item) => (
            <div style={{width: "85px"}}></div>
          )) : null}
          {loggedIn && username === user && !hideAdding && id !== "top_three" ?
          <div style={{width: "85px"}}></div> : null}
        </Stack>
      </Stack>
    </>
  );
}
