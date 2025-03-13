import { Chat } from "../../model/chat.model.js";
import { Message } from "../../model/message.model.js";
import { io, userSocketId } from "../../socket.js";

async function chat(req, res) {
  try {
    const { message } = req.body;
    const { recieverId } = req.params;
    const senderId = req.body.userId;

    //getting the chat
    let chat = await Chat.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    let finalMessageToSend = {};
    if (chat) {
      finalMessageToSend = new Message({
        sender: senderId,
        message: message,
      });
      await finalMessageToSend.save();
      chat.messages.push(finalMessageToSend._id);
    } else {
      finalMessageToSend = new Message({
        sender: senderId,
        message: message,
      });
      await finalMessageToSend.save();
      chat = new Chat({
        participants: [senderId, recieverId],
      });
      chat.messages.push(finalMessageToSend._id);
    }
    await chat.save();
    //for online users only need to send live messages
    const socketId = userSocketId(recieverId);
    if (socketId) {
      io.to(socketId).emit("message", finalMessageToSend);
    }
    return res.status(200).json(finalMessageToSend);
  } catch (error) {
    console.log("error while saving chat", error);
    return res
      .status(500)
      .json({ message: "Something went wrong while sending message" });
  }
}

export default chat;
