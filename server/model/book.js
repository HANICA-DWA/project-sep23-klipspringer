"use strict";

import mongoose from "mongoose";

const name = "Book";

const schema = new mongoose.Schema({
  _id: { type: String, required: true },
  cover_image: { type: String },
  title: { type: String, required: true },
  authors: { type: [String], required: true },
});

const model = mongoose.model(name, schema);

export default model;
