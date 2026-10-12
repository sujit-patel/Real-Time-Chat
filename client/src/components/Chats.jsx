import React, { useEffect, useRef } from "react";
import Chat from "./Chat.jsx";
import useGetMessage from "../context/useGetMessage.js";
import Loading from "./Loading.jsx";
import useConversation from "../stateManage/useConversation.js";
import useGetSocketMessage from "../context/useGetSocketMessage.js";

function Chats() {
  const { loading, messages } = useGetMessage();
  const { selectedConversation } = useConversation();
  const lastMsgRef = useRef(null);

  useGetSocketMessage();

  useEffect(() => {
    if (lastMsgRef.current) {
      setTimeout(() => {
        lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <div
      className={`chat-container h-full ${
        loading ? "p-1" : "p-4"
      } scrollbar-hide overflow-y-auto`}
    >
      {loading ? (
        <Loading />
      ) : messages && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id || Math.random()} ref={lastMsgRef}>
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
