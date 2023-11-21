import express from "express";

import Book from "../model/book.js";
import { createError } from "../functions/errorCreation.js";

const apiUrl = "https://openlibrary.org";

const router = express.Router();

router.get("/:id", (req, res, next) => {
  Book.findById(req.params.id).then((book) => {
    if (book === null) {
      fetch(apiUrl + "/isbn/" + req.params.id + ".json")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const cover_url = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`;
          const newBook = { _id: req.params.id, cover_image: cover_url };
          Book.create(newBook);
          res.send(newBook);
        })
        .catch((err) => {
          const error = createError("Book not in external API", 400);
          next(error);
        });
    } else {
      res.send(book);
    }
  });
});

export default router;
