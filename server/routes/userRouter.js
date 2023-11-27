import express from "express";

import User from "../model/user.js";
import { createError } from "../functions/errorCreation.js";

const router = express.Router();

router.use("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findById(username);
    if (!user) {
      const error = createError("User not found", 404);
      throw error;
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).select("_id");
    const usernameArray = users.map((user) => user._id);
    res.status(200).json(usernameArray);
  } catch (err) {
    next(err);
  }
});

router.get("/:username", (req, res, next) => {
  if (req.query.fields != undefined) {
    const fieldsArray = req.query.fields.split(",");
    const fields = {};
    for (var i = 0; i < fieldsArray.length; i++) {
      fields[fieldsArray[i]] = req.user[fieldsArray[i]];
    }
    res.send(fields);
  } else {
    const error = createError("Specify fields", 400);
    next(error);
  }
});

router.post("/:username/shelf", async (req, res, next) => {
  try {
    req.user.shelf.push(req.body);
    req.user.addToBookcase(req.body.books);
    await req.user.save();
    res.status(201).send(req.body);
  } catch (err) {
    let error = err;
    if (err.errors) error = createError(err.errors[Object.keys(err.errors)[0]].message, 400);
    next(error);
  }
});

router.put("/:username/shelves/:shelf", async (req, res, next) => {
  const { book } = req.body;
  const { shelf } = req.params;
  if (book != undefined && shelf != undefined) {
    try {
      if (shelf === "top_three") {
        const topThree = req.user.top_three;
        topThree.push(book);
        req.user.addToBookcase([book]);
        await req.user.save();
      } else {
        const userShelf = req.user.shelf.id(shelf);
        userShelf.books.push(book);
        req.user.addToBookcase([book]);
        await req.user.save();
      }
      res.status(200).json(book);
    } catch (err) {
      let error = err;
      if (err.errors) error = createError(err.errors[Object.keys(err.errors)[0]].message, 400);
      next(error);
    }
  } else {
    const error = createError("Specify body with book or shelf", 400);
    next(error);
  }
});

export default router;
