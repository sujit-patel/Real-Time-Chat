import mongoose, { mongo } from "mongoose";
import User from "./user.model";
import Message from "./message.model";

const conversationSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.type.ObjectId,
            ref: User,
        },
    ],
    message: [
        {
            type: mongoose.Schema.type.ObjectId,
            ref: Message,
            default: [],
        },
    ],

}, {
    timestamps: true
});

const Conversation = mongoose.model("conversation", conversationSchema);

export default Conversation;