import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../context/useSendMessage.js";

export default function InputMessage() {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");
  console.log(message);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message);
    setMessage("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send Message"
            className="input input-bordered w-full pr-10"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
          >
            <IoSend className="hover:text-gray-200 text-gray-400 cursor-pointer " />
          </button>
        </div>
      </form>
    </>
  );
}
