import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
const app = express()

const sessionParser = session({
    saveUninitialized: false,
    secret: "supergeheimecode",
    resave: false,
    name: "BKSsession",
});

app.use(sessionParser);

const server = app.listen(async () => {
    console.log("> connecting");
    await mongoose.connect(`mongodb://127.0.0.1:27017/BKS`);
    console.log("> connected");
});