import { useEffect, useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";
import Cookies from "js-cookie";

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id) {
                setMessages([]);
                setLoading(false);
                return;
            }

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

                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/message/get/${selectedConversation._id}`,
                    {
                        withCredentials: true,
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    }
                );
                setMessages(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.log("Error in getting messages:", error);
                setMessages([]);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { loading, messages };
};

export default useGetMessage;
