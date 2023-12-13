"use strict";

import mongoose from "mongoose";

const name = "Genre";

const schema = new mongoose.Schema({
  _id: { type: String, required: true },
  subgenres: { type: [] },
});

const model = mongoose.model(name, schema);

export default model;
