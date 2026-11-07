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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
          className="input input-bordered w-full pr-12 text-sm sm:text-base bg-slate-800/80 border-slate-700 rounded-xl focus:border-orange-400 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!message.trim() || loading}
          className={`absolute right-2 p-2 rounded-lg transition-all ${
            message.trim() && !loading
              ? "text-orange-400 hover:text-orange-300 hover:bg-slate-700/60 active:scale-95"
              : "text-gray-500 cursor-not-allowed"
          }`}
          title="Send"
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs text-orange-400"></span>
          ) : (
            <IoSend className="text-lg sm:text-xl" />
          )}
        </button>
      </div>
    </form>
  );
}
