import { Button, Paper, Typography, Skeleton, Stack } from "@mui/material";
import { useState } from "react";

export default function SearchResult({ book, onAdd, closePopper }) {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState("none");
  let authors = [];

  function showImage() {
    setLoading(false);
    setShow("block");
  }

  if (book.author_name) {
    if (book.author_name.length > 1) {
      authors = book.author_name.slice(0, 5).map((e, i) => {
        if (i == 4) {
          return e + " ...";
        } else {
          return e + ", ";
        }
      });
    } else {
      authors = book.author_name[0];
    }
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
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?default=false`}
          alt={`cover image for ${book.title}`}
          onLoad={() => showImage()}
        />
        <div>
          <Typography variant="body1" sx={{ fontWeight: "700" }}>
            {book.title}
          </Typography>
          <Typography variant="caption">{authors}</Typography>
        </div>
      </div>
      <Button
        onClick={() => {
          onAdd({cover_image: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?default=false`, _id: book.isbn[0]??book.isbn})
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
