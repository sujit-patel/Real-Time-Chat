import { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../stateManage/useConversation.js";
import sound from "/assets/level-up.mp3";

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            if (
                selectedConversation &&
                String(newMessage?.senderId) === String(selectedConversation?._id)
            ) {
                try {
                    const notification = new Audio(sound);
                    notification.play().catch(() => {});
                } catch (e) {
                    console.log("Audio play error", e);
                }
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, selectedConversation, setMessages]);
};

export default useGetSocketMessage;
