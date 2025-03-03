import React, { useEffect, useRef } from "react";
import Chat from "./Chat";
import useGetMessage from "../context/useGetMessage.js";
import Loading from "./Loading.jsx";
import useGetSocketMessage from "../context/useGetSocketMessage.js";

function Chats() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage();
  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  }, [messages]);

  return (
    <div
      className={`chat-container h-full ${
        loading ? "p-1" : "p-4"
      } scrollbar-hide overflow-y-auto`}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Chat message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <p className="text-3xl font-bold text-gray-500">
            Say! Hi 👋 to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Chats;
