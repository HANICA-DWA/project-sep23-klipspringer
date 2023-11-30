import express from "express";

import User from "../model/user.js";
import { createError } from "../functions/errorCreation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.q ? req.query.q : "";
  const users = await User.find({ _id: { $regex: search, $options: "i" } }, "_id profile_picture")
    .limit(10)
    .exec();
  res.send(users);
});

const forbiddenNames = ["register", "login", "search", "find", "linkedin", "unauthorized"]

router.head("/check/:username", async (req, res, next) => {
  const { username } = req.params;
  if (forbiddenNames.includes(username))
    next(createError("Illegal username", 403));
  const user = await User.findById(username);
  if (user)
    next(createError("User already exists", 403));
  res.status(200).send();
});

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
  const { book, name, books, type } = req.body;
  const { shelf } = req.params;
  if (shelf != undefined) {
    try {
      if (shelf === "top_three") {
        const topThree = req.user.top_three;
        topThree.push(book);
        req.user.addToBookcase([book]);
        await req.user.save();
      } else if (books && type == "editshelf") {
        const userShelf = req.user.shelf.id(shelf);
        userShelf.books = books;
        userShelf.name = name;
        req.user.addToBookcase(books);
        await req.user.save();
      } else if(book != undefined){
        const userShelf = req.user.shelf.id(shelf);
        userShelf.books.push(book);
        req.user.addToBookcase([book]);
        await req.user.save();
      }
      res.status(200).json(book);
    } catch (err) {
      const error = createError("Invalid book or shelf", 400);
      next(error);
    }
  } else {
    const error = createError("Specify body with book or shelf", 400);
    next(error);
  }
});

router.delete("/:username/shelves/:shelf", async (req, res, next) => {
  try {
    const { shelf } = req.params;
    const userShelf = req.user.shelf.id(shelf);
    req.user.deleteShelf(userShelf._id);
    await req.user.save();
    res.status(200).json("Shelf deleted succesfully");
  } catch (err){
    const error = createError("Shelf not found", 404)
    next(error)
  }
});

router.delete("/:username/shelves/:shelf/book/:book", async (req, res, next) => {
  const { shelf, book } = req.params;
  if (book != undefined && shelf != undefined) {
    try {
      if (shelf === "top_three") {
        const topThree = req.user.top_three;
        const shelfBook = topThree.find((shelfBook) => shelfBook._id === book);
        const index = topThree.indexOf(shelfBook);
        if (index > -1) {
          topThree.splice(index, 1);
          req.user.removeFromBookcase([shelfBook]);
          await req.user.save();
        }
      } else {
        const userShelf = req.user.shelf.id(shelf);
        const shelfBook = userShelf.books.find((shelfBook) => shelfBook._id === book);
        const index = userShelf.books.indexOf(shelfBook);
        if (index > -1) {
          userShelf.books.splice(index, 1);
          req.user.removeFromBookcase([shelfBook]);
          await req.user.save();
        }
      }
      res.status(200).json(book);
    } catch (err) {
      const error = createError("Shelf not found", 404);
      next(error);
    }
  }
});

router.delete("/:username/bookcase/:book", async (req, res, next) => {
  const { book } = req.params;
  if (book != undefined) {
    try {
      const bookcaseBook = req.user.bookcase.find((bookcaseBook) => bookcaseBook._id === book);
      if (bookcaseBook != undefined) {
        req.user.removeFromBookcase([bookcaseBook]);
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

router.put("/:username/bookcase", async (req, res, next) => {
  const { book } = req.body;
  if (book != undefined) {
    try {
      req.user.addToBookcase([book]);
      await req.user.save();
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
