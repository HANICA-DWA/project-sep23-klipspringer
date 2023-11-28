import {Typography, Card, Stack, CardMedia, ImageList, Icon, Box, CardHeader, IconButton} from "@mui/material";
import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import { LoggedInContext } from "../Contexts";
import { Edit } from "@mui/icons-material";
import { ImageNotSupported } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Bookshelf({ id, title, books = [], hideAdding, user}) {
  const { loggedIn, username } = useContext(LoggedInContext);

  const [bookshelfBooks, setBookshelfBooks] = useState(books);

  const placeholderBooks = [];

    function deleteBookHandler(bookId) {
        if(loggedIn && username === user){
            fetch(import.meta.env.VITE_BACKEND_HOST +
                "/user/" +
                username +
                "/shelves/" +
                id +
                "/book/" +
                bookId,
                {
                    method: "DELETE",
                }).then((res) => {
                    return res.json()})
                .then((res) => {
                    if(!res.error){
                        setBookshelfBooks(bookshelfBooks.filter(book => book._id !== bookId));
                    }
                    else{
                        console.log(res.error);
                    }
                }).catch((err) => {
                console.log(err);
            });
        }
    }

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
        <Card key={i} style={{ width: "85px", height: "130px" }}>
          <Link to={`/${user}/${id}/add`}>
            <CardMedia shelf={id} height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
          </Link>
        </Card>
      );
    }
  }

  return (
    <Stack direction="column" alignItems="center">
      <Typography gutterBottom variant="h5" fontWeight="800" sx={{ overflowWrap: "anywhere", maxWidth: "100%", textAlign: "center" }}>
        {title}
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <ImageList cols={3}>
          {bookshelfBooks.map((item) => (
            <Card key={item._id} style={{ width: "85px", height: "130px" }}>
                {loggedIn && username === user ?(
                    <IconButton aria-label="settings" onClick={()=>deleteBookHandler(item._id)} >
                        <DeleteIcon />
                    </IconButton>
                ):null}
              <Link to={"#"} style={{ textDecoration: "none", color: "black" }}>
                {item.cover_image !== undefined ? (
                  <CardMedia shelf={id} height="130" component="img" image={item.cover_image} alt={item._id} />
                ) : (
                  <Stack sx={{ alignItems: "center" }}>
                    <ImageNotSupported sx={{ fontSize: 80 }} />
                    <Typography variant="caption">No image found</Typography>
                  </Stack>
                )}
              </Link>
            </Card>
          ))}
          {placeholderBooks.length !== 0 ? (
            placeholderBooks
          ) : loggedIn && username === user && !hideAdding && id !== "top_three" ? (
            <Card key={id} style={{ width: "85px", height: "130px" }}>
              <Link to={`/${user}/${id}/add`}>
                <CardMedia shelf={id} height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
              </Link>
            </Card>
          ) : (
            ""
          )}
        </ImageList>
      </Stack>
      <Stack direction="row">
        <img style={{ width: "320px", height: "20px" }} src="/images/bookshelf.jpg" alt="bookshelf"></img>
        {document.URL.includes("shelf") ? null : loggedIn && username === user ? <Edit /> : null}
      </Stack>
    </Stack>
  );
}
