import { Button, Paper, Typography, Skeleton } from "@mui/material";
import { useState } from "react";

export default function SearchResult({ book, onAdd, closePopper }) {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState("none");
  let authors = "";
  let title = "";

  function showImage() {
    setLoading(false);
    setShow("block");
  }

  if (book.author_name) {
    authors = book.author_name.reduce((prev, curr) => curr + ", " + prev);
    if (authors.length > 50)
      authors = authors.substring(0, 47) + "...";
  }

  if (book.title) {
    if (book.title.length > 50)
      title = book.title.substring(0, 47) + "...";
    else
      title = book.title;
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        height: "100px",
        margin: "14px 14px 0px 14px",
        padding: "0px 0px 0px 8px",
        border: "solid 3px #DAEADB",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {loading ? <Skeleton animation="wave" variant="rectangular" width={50} height={85} sx={{ marginRight: "10px" }} /> : <></>}
        <img
          style={{
            width: "50px",
            height: "85px",
            marginRight: "10px",
            display: show,
          }}
          src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg?default=false`}
          alt={`cover image for ${book.title}`}
          onLoad={() => showImage()}
        />
        <div>
          <Typography variant="body1" sx={{ fontWeight: "700" }}>
            {title}
          </Typography>
          <Typography variant="caption">{authors}</Typography>
        </div>
      </div>
      <Button
        onClick={() => {
          const cover_image = book.cover_i === undefined ? undefined : `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg?default=false`
          onAdd({cover_image: cover_image, _id: book.isbn[0]??book.isbn})
          closePopper()
        }}
        sx={{ marginRight: "10px" }}
        variant="contained"
      >
        <Typography variant="button">Add</Typography>
      </Button>
    </Paper>
  );
}
