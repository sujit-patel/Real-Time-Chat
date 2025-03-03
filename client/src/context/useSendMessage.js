import { useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessages = async (message) => {
        setLoading(true);
        try {
            const res = await axios.post(
                `/api/message/send/${selectedConversation._id}`, { message }
            );
            setMessages([...messages, res.data]);
            setLoading(false);
        } catch (error) {
            console.log("Error in getting messages", error);
            setLoading(false);
        }
    };
    return { loading, sendMessages };
};

export default useSendMessage;
