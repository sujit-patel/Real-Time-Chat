import React, { useEffect } from "react";
import useConversation from "../stateManage/useConversation.js";
import Chat from "./Chat";

const Chats = () => {
  const { messages } = useConversation();
  return (
    <div className="chat-container h-full p-4 scrollbar-hide overflow-y-auto ">
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => <Chat key={index} message={msg} />)
      ) : (
        <div className=" h-full flex items-center justify-center">
          <p className="text-3xl font-bold text-gray-500">
            Say! Hi 👋 to start the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default Chats;
