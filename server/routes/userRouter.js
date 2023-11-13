import express from 'express';

import User from '../model/user.js'

const router = express.Router();

router.get("/:username", (req, res) => {
    User.findOne({username: req.params.username}).then((user) => {
        console.log(user)
        const userData = {
            name: user.name,
            top_three: user.top_three,
            shelf: user.shelf
        }
        res.send(JSON.stringify(userData));
    })
})

export default router;