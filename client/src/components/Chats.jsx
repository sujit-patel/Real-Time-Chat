import React, { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import useGetMessage from "../context/useGetMessage.js";
import Loading from "./Loading.jsx";
import useConversation from "../stateManage/useConversation.js";
import useGetSocketMessage from "../context/useGetSocketMessage.js";

function Chats() {
  const { loading, messages } = useGetMessage();
  const { selectedConversation } = useConversation();
  const [showChat, setShowChat] = useState(false);
  const lastMsgRef = useRef(null);

  useGetSocketMessage();
  useEffect(() => {
    if (showChat && lastMsgRef.current) {
      setTimeout(() => {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, showChat]);

  useEffect(() => {
    setShowChat(false);
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedConversation]);

  return (
    <div
      className={`chat-container h-full ${
        loading || !showChat ? "p-1" : "p-4"
      } scrollbar-hide overflow-y-auto`}
    >
      {loading || !showChat ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Chat message={message} />
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-3xl text-center font-bold text-gray-500">
            Say! Hi 👋 to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Chats;
