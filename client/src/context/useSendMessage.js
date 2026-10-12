import { useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    
    const sendMessages = async (message) => {
        if (!selectedConversation?._id) return false;
        setLoading(true);
        try {
            let token = null;
            try {
                const stored = localStorage.getItem("messanger");
                const authUser = stored ? JSON.parse(stored) : null;
                token = authUser?.token || Cookies.get("jwt");
            } catch (e) {
                token = Cookies.get("jwt");
            }

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/message/send/${selectedConversation._id}`,
                { message },
                {
                    withCredentials: true,
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            
            const newMsg = res.data?.newMessage || res.data;
            if (newMsg) {
                setMessages((prev) => [...prev, newMsg]);
            }
            return true;
        } catch (error) {
            console.log("Error sending message:", error);
            const errorMsg =
                error?.response?.data?.message || "Failed to send message";
            toast.error(errorMsg);
            return false;
        } finally {
            setLoading(false);
        }
    };
    return { loading, sendMessages };
};

export default useSendMessage;
