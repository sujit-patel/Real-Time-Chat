import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // conversation creation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // messages
        const newMessage = await new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        // await newMessage.save();
        // Push the new message to the conversation and save it
        // await conversation.save();

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json({ message: "Message Sent Successfully", newMessage });

    } catch (error) {
        console.log("Error in Sending Message :" + error);
        res.status(500).json({ message: "Intenal Server Error" });
    }
}

export const getMessage = async () => {
    console.log("first")
 }