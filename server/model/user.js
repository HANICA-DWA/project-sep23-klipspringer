"use strict"

import mongoose from 'mongoose';
import Book from './book.js'

const name = "User";

const schema = new mongoose.Schema({
    _id: {type: String, required: true},
    sso_token: {type: String},
    name: {type: String},
    username: {type: String},
    top_three: {type: [Book.schema]},
    shelf: {type: [{
        name: {type: String},
        books: {type: [Book.schema]}
    }]},
});

const model = mongoose.model(name, schema);

export default model;