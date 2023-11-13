"use strict"

import mongoose from 'mongoose';

const name = "Book";

const schema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String}
});

const model = mongoose.model(name, schema);

export default model;