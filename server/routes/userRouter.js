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

router.put("/:username/shelves/:shelf", (req, res, next) => {
  const { book } = req.body;
  const { username, shelf } = req.params;
  if (book != undefined && shelf != undefined) {
    User.findById(username)
      .then((user) => {
        if (user === null) {
          const error = createError("User not found", 404);
          throw error;
        } else if (shelf === "top_three") {
          const topThree = user.top_three;
          topThree.push(book);
          user.addToBookcase([book]);
          return user.save();
        } else {
          const userShelf = user.shelf.id(shelf);
          userShelf.books.push(book);
          user.addToBookcase([book]);
          return user.save();
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
    const error = createError("Specify bosy with book or shelf", 400);
    next(error);
  }
});

export default router;
