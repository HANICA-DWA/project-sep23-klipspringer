import express from "express";

import User from "../model/user.js";

const router = express.Router();

router.get("/:username", (req, res) => {
    if (req.query.fields != undefined) {
        const fieldsArray = req.query.fields.split(",")
        User.findOne(req.params.username).then((user) => {
            const fields = {}
            for (var i = 0; i < fieldsArray.length; i++) {
                fields[fieldsArray[i]] = user[fieldsArray[i]]
            }
            res.send(JSON.stringify(fields))
        }).catch((err) => {
            res.send(err)
        })
    }  
})

router.post("/:username/shelf", (req, res) => {
    User.findById(req.params.username).then((user) => {
        if (user === null) {
            res.sendStatus(404);
        } else {
            console.log(req.body)
            user.shelf.push(req.body)
            user.save();
            res.sendStatus(200);
        }
    })
})

export default router;
