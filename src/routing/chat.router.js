import { Router } from "express";
import chat from "../controller/chat/chat.controller.js";
import fetchChat from "../controller/chat/fetchChat.controller.js";

const chatRouter = Router();

chatRouter.post("/:recieverId", chat);
chatRouter.get("/:recieverId", fetchChat);

export { chatRouter };
