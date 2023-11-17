import express from "express";

import User from "../model/user.js";
import { createError } from "../functions/errorCreation.js";

const router = express.Router();

router.get("/:username", (req, res, next) => {
  if (req.query.fields != undefined) {
    const fieldsArray = req.query.fields.split(",");
    User.findById(req.params.username)
      .then((user) => {
        const fields = {};
        for (var i = 0; i < fieldsArray.length; i++) {
          fields[fieldsArray[i]] = user[fieldsArray[i]];
        }
        res.send(fields);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    const error = createError("Specify fields", 400);
    next(error);
  }
});

router.post("/:username/shelf", (req, res, next) => {
  User.findById(req.params.username)
    .then((user) => {
      if (user === null) {
        const error = createError("User not found", 404);
        throw error;
      } else {
        user.shelf.push(req.body);
        user.addToBookcase(req.body.books);
        return user.save();
      }
    })
    .then(() => {
      res.status(201).send(req.body);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:username/book", (req, res, next) => {
  const { book, shelf } = req.body;
  const { username } = req.params;
  if (book != undefined && shelf != undefined) {
    User.findById(username)
      .then((user) => {
        if (user === null) {
          const error = createError("User not found", 404);
          throw error;
        } else if (shelf === "top_three") {
          const topThree = user.top_three;
          if(topThree.find((item) => item._id === book._id)){
            const error = createError("This book is already on the shelf", 400);
            throw error;
          } else {
            topThree.push(book);
            user.addToBookcase([book]);
            return user.save();
          }
        } else {
          const userShelf = user.shelf.id(shelf);
          if(userShelf.books.find((item) => item._id === book._id)){
            const error = createError("This book is already on the shelf", 400);
            throw error;
          } else {
            userShelf.books.push(book);
            user.addToBookcase([book]);
            return user.save();
          }
        }
      })
      .then(() => {
        res.statusCode = 200;
        res.send();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    const error = createError("Specify body with book or shelf", 400);
    next(error);
  }
})

export default router;
