import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import useGetMessage from "../context/useGetMessage.js";
import Loading from "./Loading.jsx";
import useConversation from "../stateManage/useConversation.js";

function Chats() {
  const { loading, messages } = useGetMessage();
  const { selectedConversation } = useConversation();
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    setShowChat(false);
    setTimeout(() => {
      setShowChat(true);
    }, 1000);
    setShowChat(false);
  }, [selectedConversation]);

  return (
    <div
      className={`chat-container h-full ${
        loading || !showChat ? "p-1" : "p-4"
      } scrollbar-hide overflow-y-auto`}
    >
      {loading || !showChat ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}>
            <Chat message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div className=" h-full flex items-center justify-center">
          <p className="text-3xl font-bold text-gray-500">
            Say! Hi 👋 to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Chats;
