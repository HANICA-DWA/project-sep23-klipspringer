import express from 'express';

import User from '../model/user.js'

const router = express.Router();

router.get("/:username", (req, res) => {
    if (req.query.fields != undefined) {
        const fieldsArray = req.query.fields.split(",")
        User.findOne({ username: req.params.username }).then((user) => {
            const fields = {}
            for (var i = 0; i < fieldsArray.length; i++) {
                fields[fieldsArray[i]] = user[fieldsArray[i]]
            }
            res.send(JSON.stringify(fields))
        }).catch((err) => {
            res.send(err)
        })
    }
    // User.findOne({username: req.params.username}).then((user) => {
    //     const userData = {
    //         name: user.name,
    //         profile_picture: user.profile_picture,
    //         top_three: user.top_three,
    //         shelf: user.shelf
    //     }
    //     res.send(JSON.stringify(userData));
    // })    
})

export default router;