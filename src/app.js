import { json } from "express";
import { authUserRouter } from "./routing/authUser.router.js";
import connectionDatabase from "./config/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { chatRouter } from "./routing/chat.router.js";
import verifyUser from "./middleware/verifyUser.js";
import cors from "cors";
import { httpserver, app } from "./socket.js";
import { corsOptions } from "./constant/config.js";

async function startServer() {
  dotenv.config();

  const PORT = process.env.PORT || 3001;

  app.use(json());
  app.use(cookieParser());
  app.use(cors(corsOptions));

  //router middleware
  app.use("/api/auth", authUserRouter);
  app.use("/api/chat", verifyUser, chatRouter);
  // app.use("/", (req, res) => {
  //   res.send("Server is up and running");
  // });
  await connectionDatabase();
  httpserver.listen(PORT, () => {
    console.log(`Server is started and listening at PORT ${PORT}`);
  });
}

export default startServer;
