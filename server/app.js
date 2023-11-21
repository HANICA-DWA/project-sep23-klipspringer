import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
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

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(sessionParser);
app.use(express.json());
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/sessions", sessionsRouter);

app.use((err, req, res, next) => {
  if (!err.status) err.status = 500;
  res.status(err.status).json({ error: err.message });
});

export default app;

export const server = app.listen(port, host, async () => {
  console.log("> connecting");
  if (process.env.NODE_ENV === 'test') {
    console.log("Connecting to test db")
    await mongoose.connect(`mongodb://127.0.0.1:27017/TestBKS`);
  }
  /* node:coverage ignore next 4 */
  else {
    console.log("Connecting to dev db")
    await mongoose.connect(`mongodb://127.0.0.1:27017/BKS`);
  }
  console.log("> connected");

  const { address, port } = server.address();
  console.log(`Server started on http://${address}:${port}`);
});
