import { Typography, Card, Stack, CardMedia, ImageList, Icon, Box, CardHeader, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../Contexts";
import { Edit, Delete } from "@mui/icons-material";
import { ImageNotSupported } from "@mui/icons-material";
import { useDialog } from "../hooks/useDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "../hooks/useAlert";
import Bookcover from "./Bookcover";

export default function Bookshelf({ id, title, books = [], hideAdding, user, unclickable, onDelete, edit, onBookDelete }) {
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

  //TODO na ontwerp Rik dit refactoren
  if ((bookshelfBooks.length === 0 && !loggedIn) || (bookshelfBooks.length === 0 && hideAdding)) {
    placeholderBooks.push(<div></div>);
    placeholderBooks.push(
      <Typography variant="h5" order="2">
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
    <Stack direction="column" alignItems="center">
      {dialog}
      {alertComponent}
      <Typography gutterBottom variant="h5" fontWeight="800" sx={{ overflowWrap: "anywhere", maxWidth: "100%", textAlign: "center" }}>
        {title}
      </Typography>
      {unclickable ? null : loggedIn && username === user && !edit
        ?
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
       : null}
      <Stack direction="row" justifyContent="center" spacing={2}>
        <ImageList cols={3}>
          {bookshelfBooks.map((item) => (
            <Card key={item._id}>
              {loggedIn && username === user && edit ? (
                <IconButton aria-label="settings" onClick={() => onBookDelete(item._id)}>
                  <DeleteIcon />
                </IconButton>
              ) : null}
              <Box sx={{ width: "85px", height: "160px" }}>
                <Link to={unclickable ? null :  `/book/${item._id}`} style={{ textDecoration: "none", color: "black" }}>
                  <Bookcover isbn={item._id} cover_image={item.cover_image} />
                </Link>
              </Box>
            </Card>
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
      <Stack direction="row">
        <img style={{ width: "320px", height: "20px" }} src="/images/bookshelf.jpg" alt="bookshelf"></img>
      </Stack>
    </Stack>
  );
}
