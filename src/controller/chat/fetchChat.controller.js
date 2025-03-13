import { Chat } from "../../model/chat.model.js";
import { Message } from "../../model/message.model.js";

async function fetchChat(req, res) {
  try {
    const { recieverId } = req.params;
    const senderId = req.body.userId;
    //getting the chat
    let chat = await Chat.find({
      participants: { $all: [senderId, recieverId] },
    });

    if (chat) {
      const message = chat[0].messages;
      const messages = await Message.find({
        _id: { $in: message },
      });
      // messages.forEach((messages) => {
      //   console.log(messages.message);
      //   return res.status(200).json({ message: "We got your messages" });
      // });
      return res.status(200).json({ messages: messages });
    } else {
      return res
        .status(400)
        .json({ message: "No chat found between these users" });
    }
  } catch (error) {
    return error;
    return res
      .status(500)
      .json({ message: "something went wrong while fetching chats" });
  }
}
export default fetchChat;
