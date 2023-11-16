"use strict";

import mongoose from "mongoose";
import Book from "./book.js";

const name = "User";

const schema = new mongoose.Schema({
  _id: { type: String, required: true },
  sso_id: { type: String },
  sso_provider: { type: String, enum: ["Google", "LinkedIn"] },
  name: { type: String, required: true },
  profile_picture: { type: String, required: true, default: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" },
  top_three: { type: [Book.schema], required: true, default: [] },
  shelf: {
    type: [
      {
        name: { type: String },
        books: { type: [Book.schema] },
      },
    ],
  },
  bookcase: {type: [Book.schema]}
});

const model = mongoose.model(name, schema);

export default model;
