import express from "express";

import User from "../model/user.js";

const router = express.Router();

router.get("/:username", (req, res) => {
  User.findOne({ _id: req.params.username }).then((user) => {
    const userData = {
      name: user.name,
      profile_picture: user.profile_picture,
      top_three: user.top_three,
      shelf: user.shelf,
    };
    res.send(JSON.stringify(userData));
  });
});

export default router;
