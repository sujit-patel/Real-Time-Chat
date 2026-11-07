import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../context/useSendMessage.js";

export default function InputMessage() {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim() || loading) return;
    const success = await sendMessages(message);
    if (success) {
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
          className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-800/90 border border-slate-700/80 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/80 transition-all shadow-inner"
        />
      </div>

      <button
        type="submit"
        disabled={!message.trim() || loading}
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all shadow-md active:scale-90 ${
          message.trim() && !loading
            ? "bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 hover:from-orange-400 hover:to-amber-300 shadow-orange-500/25 cursor-pointer"
            : "bg-slate-800 text-gray-500 border border-slate-700/60 cursor-not-allowed"
        }`}
        title="Send message"
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs text-orange-400"></span>
        ) : (
          <IoSend className="text-base sm:text-lg translate-x-0.5" />
        )}
      </button>
    </form>
  );
}
