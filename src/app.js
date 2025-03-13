import { json } from "express";
import { authUserRouter } from "./routing/authUser.router.js";
import connectionDatabase from "./config/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { chatRouter } from "./routing/chat.router.js";
import verifyUser from "./middleware/verifyUser.js";
import cors from "cors";
import { httpserver, app } from "./socket.js";
import path from "path";
import express from "express";
import { corsOptions } from "./constant/config.js";

async function startServer() {
  dotenv.config();

  const PORT = process.env.PORT || 3001;
  const __dirname = path.resolve();

  app.use(json());
  app.use(cookieParser());
  app.use(cors(corsOptions));

  //router middleware
  app.use("/", (req, res) => {
    res.send("Server is up and running");
  });
  app.use("/api/auth", authUserRouter);
  app.use("/api/chat", verifyUser, chatRouter);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (_, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

  await connectionDatabase();
  httpserver.listen(PORT, () => {
    console.log(`Server is started and listening at PORT ${PORT}`);
  });
}

export default startServer;
