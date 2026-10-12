import { getReceiverSocketId, io } from "../SocketIo/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// DAILY LIMIT SETTINGS (Set to null or remove later if not needed)
const MAX_DAILY_MESSAGES_PER_USER = 10;

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Logged-in user

        // Daily message limit check for logged-in user (Max 10 messages across all chats per day)
        if (MAX_DAILY_MESSAGES_PER_USER) {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const todayMessagesCount = await Message.countDocuments({
                senderId,
                createdAt: { $gte: startOfDay, $lte: endOfDay },
            });

            if (todayMessagesCount >= MAX_DAILY_MESSAGES_PER_USER) {
                return res.status(400).json({
                    message: `Daily message limit reached (Max ${MAX_DAILY_MESSAGES_PER_USER} messages per day).`,
                });
            }
        }

        // Find or create conversation
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
                messages: [],
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

        // Push message to conversation and save both
        await Promise.all([conversation.save(), newMessage.save()]);
        const receiversocketId = getReceiverSocketId(receiverId);
        if (receiversocketId) {
            io.to(receiversocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in Sending Message:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id; // Logged-in user

        const conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages || [];
        return res.status(200).json(messages);
    } catch (error) {
        console.error("Message fetching error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
