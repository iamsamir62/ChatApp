import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    console.log("receiverId", receiverId);


    // Validate the message
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: "Message content is required." });
    }

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    // Create a new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message
    });

    // Push the message ID into the conversation's messages array
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await Promise.all([gotConversation.save(), newMessage.save()]);

    //socket IO
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }


    return res.status(201).json({
      success: true,
      message: "Message Sent",
      newMessage
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to send the message",
      error: error.message
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } }).populate("messages")
    return res.status(200).json(
      conversation?.messages
    )


  } catch (error) {
    console.log(error);


  }
}


export { sendMessage, getMessage };
