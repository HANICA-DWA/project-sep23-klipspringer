import { Typography, Card, Stack, CardMedia, ImageList, Link } from "@mui/material";

export default function Bookshelf({ title, books, hideAdding }) {
  let loggedIn = false; // FIXME replace with actual login status

  const placeholderBooks = [];

  //TODO na ontwerp Rik dit refactoren
  if (books.length === 0 && !loggedIn || hideAdding) {
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
          <Link href={"/search"}>
            <CardMedia height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
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
              <Link href={"#"}>
                <CardMedia height="130" component="img" image={item.cover_image} alt="titel" />
              </Link>
            </Card>
          ))}
          {placeholderBooks.length !== 0 ? (
            placeholderBooks
          ) : loggedIn && !hideAdding ? (
            <Card style={{ width: "85px", height: "130px" }}>
              <Link href={"/search"}>
                <CardMedia height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />
              </Link>
            </Card>
          ) : (
            ""
          )}
        </ImageList>
      </Stack>
      <img style={{ width: "320px", height: "20px" }} src="/images/bookshelf.jpg" alt="bookshelf"></img>
    </Stack>
  );
}
