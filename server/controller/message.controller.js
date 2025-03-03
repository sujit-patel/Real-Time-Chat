import { getReceiverSocketId, io } from "../SocketIO/server.js"
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";
<<<<<<< HEAD
import { getReceiverSocketId, io } from "../SocketIo/server.js";

=======
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Logged-in user

        // Find or create conversation
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }

        // Create new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

<<<<<<< HEAD
        // Push message to conversation and save both
=======
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2
        await Promise.all([conversation.save(), newMessage.save()]);
        const receiversocketId = getReceiverSocketId(receiverId);
        if (receiversocketId) {
            io.to(receiversocketId).emit("newMessage", newMessage);
        }

<<<<<<< HEAD
        res.status(201).json({ newMessage });
=======
        // Fetch receiver socket ID
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Fetch sender socket ID
        // const senderSocketId = getReceiverSocketId(senderId);
        // if (senderSocketId) {
        //     io.to(senderSocketId).emit("newMessage", newMessage);
        // }

        res.status(201).json({ message: "Message Sent Successfully", newMessage });
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2

    } catch (error) {
        console.error("Error in Sending Message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id; // Logged-in user

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }
<<<<<<< HEAD

        const messages = conversation.messages;
        return res.status(200).json(messages);
=======
        const messages = conversation.messages || [];
        return res.status(200).json({ messages });
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2
    } catch (error) {
        console.error("Message fetching error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
