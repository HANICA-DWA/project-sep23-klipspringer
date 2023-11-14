import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';

import userRouter from './routes/userRouter.js'
import bookRouter from './routes/bookRouter.js'

const app = express()
app.use(cors())
app.options("*", cors());


const sessionParser = session({
    saveUninitialized: false,
    secret: "supergeheimecode",
    resave: false,
    name: "BKSsession",
});

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3001;

app.use(sessionParser);
app.use("/user", userRouter);
app.use("/book", bookRouter);

const server = app.listen(port, host, async () => {
    console.log("> connecting");
    await mongoose.connect(`mongodb://127.0.0.1:27017/BKS`);
    console.log("> connected");

    const { address, port } = server.address();
    console.log(`Server started on http://${address}:${port}`)
});