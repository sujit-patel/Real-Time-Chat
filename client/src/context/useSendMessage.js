import { useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessages = async (newMessage) => {
        setLoading(true);
        if (selectedConversation && selectedConversation._id) {
            try {
                const res = await axios.post(`/api/message/send/${selectedConversation._id}`, {
                    message: newMessage,
                });
                setMessages([...messages, res.data]);
            } catch (error) {
                console.error("Error sending message", error);
            }
        }
        setLoading(false);
    };

    return { loading, sendMessages };
}

export default useSendMessage;
