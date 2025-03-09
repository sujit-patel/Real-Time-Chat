import { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../stateManage/useConversation.js";
import sound from "../assets/level-up.mp3";

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId === selectedConversation._id) {
                const notification = new Audio(sound);
                notification.play();
                setMessages([...messages, newMessage]);
            }
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, messages, setMessages, selectedConversation]);
};

export default useGetSocketMessage;
