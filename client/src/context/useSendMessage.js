import { useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import { useSocketContext } from "../context/SocketContext";
import axios from "axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { socket } = useSocketContext();
    
    const sendMessages = async (message) => {
        if (!selectedConversation) return;
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/message/send/${selectedConversation._id}`, { message });
            
            setMessages([...messages, res.data]);
            console.log("Message Sent:", res.data);
            socket.emit("sendMessage", {
                senderId: "currentUserId",
                receiverId: selectedConversation._id,
                message,
            });

        } catch (error) {
            console.log("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };
    return { loading, sendMessages };
};

export default useSendMessage;
