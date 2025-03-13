import mongoose from "mongoose";
import { User } from "./registration.model.js";
import { Message } from "./message.model.js";

const chatSchema = mongoose.Schema(
  {
    participants: [
      { type: mongoose.Types.ObjectId, ref: User, required: true },
    ],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: Message }],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
