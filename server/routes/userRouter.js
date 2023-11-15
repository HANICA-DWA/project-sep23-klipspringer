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
  if(req.body.book != undefined && req.body.shelf != undefined){
    User.findById(req.params.username).then((user) => {
      if (user === null) {
        const error = createError("User not found", 404);
        throw error;
      } else {
        user.shelf.findById(req.body.shelf).then((shelf) => {
          shelf.push(req.body.book);
          return user.save();
        })
      }
    }).then(() => {
      res.statusCode = 200;
      res.send();
    }).catch((err) => {
      next(err);
    })
  } else {
    const error = createError("Specify bosy with book or shelf", 400);
    next(error);
  }
})

export default router;
