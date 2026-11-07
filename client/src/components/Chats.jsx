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
        loading ? "p-3" : "px-3 py-4 sm:px-5"
      } scrollbar-hide overflow-y-auto space-y-2`}
    >
      {/* Security / Privacy Pill (Signature Chat App Touch) */}
      {!loading && messages?.length > 0 && (
        <div className="flex justify-center mb-3">
          <span className="text-[10px] sm:text-xs bg-slate-800/90 border border-slate-700/60 text-gray-400 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 backdrop-blur-sm">
            <span>🔒</span> End-to-end encrypted conversation
          </span>
        </div>
      )}

      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : messages && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id || Math.random()} ref={lastMsgRef}>
            <Chat message={message} />
          </div>
        ))
      ) : (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-500/20 to-amber-400/20 border border-orange-400/30 flex items-center justify-center text-3xl shadow-lg animate-bounce">
            👋
          </div>
          <div className="space-y-1">
            <p className="text-lg sm:text-xl font-bold text-white">
              Say Hi to start chatting!
            </p>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xs">
              Send a greeting message to start your conversation with {selectedConversation?.fullname}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chats;
