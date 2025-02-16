import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    reciver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    message: {
        type: String,
        require: true,
        maxlength: 1000,
        trim: true,
        validate: [
            {
                validator: (value) => value.length > 0,
                message: "Message Cannot Be Empty",
            }
        ]
    },
    createdAt: { type: Date, default: Date.now }
},
    {
        timestamps: true,
    });

const Message = mongoose.model("Message", messageSchema);

export default Message;