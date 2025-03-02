import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
// import useSendMessage from "../context/useSendMessage.js";

export default function InputMessage() {
  // const { sendMessages } = useSendMessage();
  const [messages, setMessages] = useState("");

  // console.log(messages);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!messages.trim()) return;
    // await sendMessages(messages);
    setMessages("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="relative">
          <input
            type="text"
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
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
