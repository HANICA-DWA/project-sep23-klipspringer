import { Typography, Card, Stack, CardMedia, ImageList } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext } from "../Contexts";
import { Edit } from "@mui/icons-material";

export default function Bookshelf({ name, title, books, hideAdding }) {
  const loggedIn = useContext(LoggedInContext).loggedIn;

  const placeholderBooks = [];

  //TODO na ontwerp Rik dit refactoren
  if ((books.length === 0 && !loggedIn) || hideAdding) {
    placeholderBooks.push(<div></div>);
    placeholderBooks.push(
      <Typography variant="h5" order="2">
        No books in this shelf
      </Typography>
    );
  }

  for (let i = books.length; i < 3; i++) {
    if (loggedIn) {
      placeholderBooks.push(
        <Card style={{ width: "85px", height: "130px" }}>
          <Link to={"/search?"+name}>
            <CardMedia shelf={name} height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
          </Link>
        </Card>
      );
    }
  }

  return (
    <Stack direction="column" alignItems="center">
      <Typography gutterBottom variant="h5" fontWeight="800">
        {title}
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <ImageList cols={3}>
          {books.map((item) => (
            <Card key={item._id} style={{ width: "85px", height: "130px" }}>
              <Link to={"#"}>
                <CardMedia shelf={name} height="130" component="img" image={item.cover_image} alt="titel" />
              </Link>
            </Card>
          ))}
          {placeholderBooks.length !== 0 ? (
            placeholderBooks
          ) : loggedIn && !hideAdding ? (
            <Card style={{ width: "85px", height: "130px" }}>
              <Link to={"/search?"+name}>
                <CardMedia shelf={name} height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
              </Link>
            </Card>
          ) : (
            ""
          )}
        </ImageList>
      </Stack>
      <Stack direction="row">
        <img style={{ width: "320px", height: "20px" }} src="/images/bookshelf.jpg" alt="bookshelf"></img>
        <Edit/>
      </Stack>
    </Stack>
  );
}
