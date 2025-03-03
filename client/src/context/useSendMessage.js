import { useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";

<<<<<<< HEAD
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
=======
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
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2

export default useSendMessage;
