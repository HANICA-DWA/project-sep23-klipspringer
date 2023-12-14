import express from "express";

import Genre from "../model/genre.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    const result = await Genre.find({})
    res.send(result)
});

export default router;
