import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";

import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRouter.js";
import sessionsRouter from "./routes/sessionsRouter.js";
import bookRouter from "./routes/bookRouter.js";
import multer from "multer";
import genreRouter from "./routes/genreRouter.js";

const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({ noServer: true });

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

const mongoServer = process.env.MONGO_HOST || "mongodb://127.0.0.1:27017";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(sessionParser);
app.use(express.json());

app.use("/public", express.static("public"));

app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/sessions", sessionsRouter);
app.use("/genre", genreRouter);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else {
    if (!err.status) err.status = 500;
    res.status(err.status).json({ error: err.message });
  }
});

export default app;

//handle upgrades from http requests to websocket
httpServer.on("upgrade", (request, socket, head) => {
  sessionParser(request, {}, () => {
    //TODO check if session before continuing
    wsServer.handleUpgrade(request, socket, head, (ws) => {
      wsServer.emit("connection", ws, request);
    });
  });
});

wsServer.broadcastToFollowers = (ws, data) => {};

wsServer.on("connection", (ws, request) => {
  //TODO array or something from "following" to ws object, so broadcastToFollowers can use this array to find followers
  //and then also own _id (handle) to ws object
  ws.on("message", (data) => {});
});

export const server = httpServer.listen(port, host, async () => {
  console.log("> connecting");
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
