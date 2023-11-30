"use strict";

import mongoose from "mongoose";
import Book from "./book.js";

function validatorUniqueBooks(val) {
  const uniqueSet = new Set();

  for (const book of val) {
    const bookId = book._id;

    if (uniqueSet.has(bookId)) {
      return false;
    }

    uniqueSet.add(bookId);
  }
  return true;
}

function validatorUsername(val) {
  const regex = /^[\w]{1,30}$/;
  return regex.test(val);
}

const name = "User";

const schema = new mongoose.Schema(
  {
    _id: { type: String, required: true, validate: [validatorUsername, "Username can only contain letters, numbers, dots and underscores "] },
    sso_id: { type: String },
    sso_provider: { type: String, enum: ["Google", "LinkedIn"] },
    name: { type: String, required: true },
    profile_picture: { type: String, required: true, default: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" },
    top_three: {
      type: [Book.schema],
      required: true,
      default: [],
      validate: [
        { validator: validatorUniqueBooks, message: "This book is already in the top three" },
        { validator: (val) => val.length <= 3, message: "Top three has a maximum of 3 books" },
      ],
    },
    shelf: {
      type: [
        {
          name: { type: String },
          books: {
            type: [Book.schema],
            validate: [
              { validator: (val) => val.length >= 3, message: "Must have a minimum of 3 books" },
              { validator: validatorUniqueBooks, message: "Can't have duplicates on a bookshelf" },
            ],
          },
        },
      ],
    },
    bookcase: { type: [Book.schema], required: true, default: [] },
  },
  {
    methods: {
      addToBookcase(books) {
        books.forEach((book) => {
          if (!this.bookcase.find((element) => element._id === book._id)) this.bookcase.push(book);
        });
      },
      deleteShelf(shelf) {
        this.shelf = this.shelf.filter(s => s._id !== shelf)
      },
      removeFromBookcase(books){
        books.forEach((book) => {
          const shelfBook = this.bookcase.find((element) => element._id===book._id);
          const index = this.bookcase.indexOf(shelfBook);
          if (index > -1) {
            this.bookcase.splice(index, 1);
          }
        });
      },
    },
  }
);

const model = mongoose.model(name, schema);

export default model;
