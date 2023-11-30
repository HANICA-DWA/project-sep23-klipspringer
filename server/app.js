import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import { mongoServer } from "./constants.js";

import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRouter.js";
import sessionsRouter from "./routes/sessionsRouter.js";
import bookRouter from "./routes/bookRouter.js";

const app = express();

const sessionParser = session({
  saveUninitialized: true,
  secret: "supergeheimecode",
  resave: false,
  name: "BKSsession",
  cookie: {
    sameSite: "Lax",
  },
});

// Old skool Node __dirname inladen
// Bron: https://byby.dev/node-dirname-not-defined
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3002;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(sessionParser);
app.use(express.json());

app.use("/", express.static("public"));

app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/sessions", sessionsRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use((err, req, res, next) => {
  if (!err.status) err.status = 500;
  res.status(err.status).json({ error: err.message });
});

export default app;

export const server = app.listen(port, host, async () => {
  console.log("> ");
  if (process.env.NODE_ENV === "test") {
    console.log("Connecting to test db");
    await mongoose.connect(`${mongoServer}/TestBKS`);
    /* node:coverage disable */
  } else {
    console.log("Connecting to dev db");
    await mongoose.connect(`${mongoServer}/BKS`);
  }
  console.log("> connected");
  /* node:coverage enable */
  const { address, port } = server.address();
  console.log(`Server started on http://${address}:${port}`);
});
