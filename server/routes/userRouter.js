import express from "express";
import multer from "multer";

import User from "../model/user.js";
import { createError } from "../functions/errorCreation.js";
import { createFileFilter, customName } from "../functions/fileUpload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.q ? req.query.q : "";
  const users = await User.find({ _id: { $regex: search, $options: "i" } }, "_id profile_picture")
    .limit(10)
    .exec();
  res.send(users);
});

const forbiddenNames = ["register", "login", "search", "find", "linkedin", "unauthorized"];

router.head("/check/:username", async (req, res, next) => {
  const { username } = req.params;
  if (forbiddenNames.includes(username)) next(createError("Illegal username", 403));
  const user = await User.findById(username);
  if (user) next(createError("User already exists", 403));
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

router.use("/:username", (req, res, next) => {
  const { username } = req.params;
  /* node:coverage disable */
  if (process.env.NODE_ENV !== "test" && (!req.session.loggedIn || req.session.user !== username)) {
    next(createError("Unauthorized", 403));
  }
  /* node:coverage enable */
  next();
});

/* node:coverage disable */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/avatars");
  },
  filename: customName,
});
const upload = multer({ storage: storage, fileFilter: createFileFilter("image/"), limits: { fileSize: 1024 * 1024 * 2 } });
/* node:coverage enable */

router.patch("/:username", upload.single("image"), async (req, res, next) => {
  const { name } = req.body;
  try {
    if (req.file) req.user.profile_picture = req.file.path;
    if (!name) throw createError("Name is required", 400);
    req.user.name = name;
    await req.user.save();
    res.status(200).json({ message: "Succesfully updated", profile_picture: req.user.profile_picture, name: req.user.name });
  } catch (err) {
    let error = err;
    if (err.errors) error = createError(err.errors[Object.keys(err.errors)[0]].message, 400);
    next(error);
  }
});

router.post("/:username/shelf", async (req, res, next) => {
  try {
    req.user.shelf.push(req.body);
    req.user.addToBookcase(req.body.books);
    await req.user.save();
    const newShelfItemId = req.user.shelf[req.user.shelf.length - 1]._id;
    res.status(201).send({ ...req.body, _id: newShelfItemId });
  } catch (err) {
    let error = err;
    if (err.errors) error = createError(err.errors[Object.keys(err.errors)[0]].message, 400);
    next(error);
  }
});

router.put("/:username/shelves/:shelf", async (req, res, next) => {
  const { book, name, books, type } = req.body;
  const { shelf } = req.params;
  if (book === undefined && books === undefined && name === undefined) {
    next(createError("Missing request body", 400));
  }

  if (shelf != undefined) {
    try {
      if (books && type === "editshelf") {
        let userShelf;
        shelf === "top_three" ? (userShelf = req.user.top_three) : (userShelf = req.user.shelf.id(shelf));
        userShelf.books = books;
        userShelf.name = name;
        req.user.addToBookcase(books);
        await req.user.save();
      } else if (shelf === "top_three") {
        const topThree = req.user.top_three;
        if (Array.isArray(book)) {
          book.forEach((item) => {
            topThree.books.push(item);
          })
        } else {
          topThree.books.push(book);
          req.user.addToBookcase([book]);
        }
        await req.user.save();
      } else if (book != undefined) {
        const userShelf = req.user.shelf.id(shelf);
        if (Array.isArray(book)) {
          book.forEach((item) => {
            userShelf.books.push(item);
          })
        } else {
          userShelf.books.push(book);
          req.user.addToBookcase([book]);
        }
        await req.user.save();
      }
      res.status(200).json({ shelf: shelf === "top_three" ? req.user.top_three : req.user.shelf.id(shelf), bookcase: req.user.bookcase });
    } catch (err) {
      let error = createError("Invalid book or shelf", 400);
      if (err.errors) error = createError(err.errors[Object.keys(err.errors)[0]].message, 400);
      next(error);
    }
  }
});

router.delete("/:username/shelves/:shelf", async (req, res, next) => {
  try {
    const { shelf } = req.params;
    const userShelf = req.user.shelf.id(shelf);
    req.user.deleteShelf(userShelf._id);
    await req.user.save();
    res.status(200).json("Shelf deleted succesfully");
  } catch (err) {
    const error = createError("Shelf not found", 404);
    next(error);
  }
});

router.delete("/:username/shelves/:shelf/book/:book", async (req, res, next) => {
  const { shelf, book } = req.params;
  if (book != undefined && shelf != undefined) {
    try {
      if (shelf === "top_three") {
        const topThree = req.user.top_three;
        const shelfBook = topThree.books.find((shelfBook) => shelfBook._id === book);
        const index = topThree.books.indexOf(shelfBook);
        if (index > -1) {
          topThree.books.splice(index, 1);
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
      } else throw new Error();
      res.status(200).json(book);
    } catch (err) {
      next(createError("Specified book does not exist", 404));
    }
  }
});

router.put("/:username/bookcase", async (req, res, next) => {
  const { book } = req.body;
  if (book != undefined) {
    try {
      if (!typeof book === "object" || !Object.keys(book).every((key) => ["title", "authors", "_id", "cover_image"].includes(key)) || Object.keys(book).length !== 4)
        throw new Error();
      req.user.addToBookcase([book]);
      await req.user.save();
      res.status(200).json(book);
    } catch (err) {
      next(createError("Invalid request body", 400));
    }
  }
});

router.put("/:username/follow", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.username);
    const account = await User.findById(req.body.account);
    user.following.push({_id: account._id, profile_picture: account.profile_picture});
    account.followers.push({_id: user._id, profile_picture: user.profile_picture});

    await user.save();
    await account.save();
    res.status(200).json(account);
  } catch (err) {
    next(createError("Cannot follow, maybe user doesnt exist", 400))
  }
});

router.delete("/:username/unfollow", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.username);
    const account = await User.findById(req.body.account);
    user.following.pull(account._id)
    account.followers.pull(user._id)

    await user.save();
    await account.save();
    res.status(200).json(account);
  } catch {
    next(createError("Cannot unfollow, maybe user doesnt exist", 400))
  }
})

export default router;
