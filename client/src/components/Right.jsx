import React, { useState } from "react";
import Chat from "./Chat";
import { IoSend } from "react-icons/io5";
import userImg from "../assets/user profile.png";
import useConversation from "../stateManage/useConversation.js";
import useGetMessage from "../context/useGetMessage.js";
import Loading from "../components/Loading.jsx";
import useSendMessage from "../context/useSendMessage.js";

function Right() {
  const { selectedConversation } = useConversation();
  const { loading, messages } = useGetMessage();
  const { loading: sendLoading, sendMessages } = useSendMessage();
  const [newMessages, setNewMessages] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessages.trim()) return;

    await sendMessages(newMessages);
    setNewMessages("");
  };

  return (
    <div className="h-screen w-full flex gap-2 py-2 flex-col">
      {/* User Profile Header */}
      <div>
        <div className="flex gap-5 bg-slate-800 border border-slate-400 hover:bg-slate-700 p-2 rounded-md cursor-pointer">
          <div className="avatar online">
            <div className="w-14 rounded-full">
              <img src={userImg} className="scale-150" alt="User Avatar" />
            </div>
          </div>
          <div>
            <h1 className="text-xl">
              {selectedConversation?.fullname || "sujit patel"}
            </h1>
            <p className="text-sm">Online</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className={`${
          loading ? "p-1" : "px-3 py-2"
        } border border-slate-400 rounded-md overflow-y-auto flex-1 scrollbar-hide`}
      >
        {loading ? (
          <Loading />
        ) : messages.messages?.length > 0 ? (
          messages.messages.map((message) => (
            <Chat key={message._id} message={message} />
          ))
        ) : (
          <div className="flex justify-center font-bold text-2xl h-full items-center">
            <p className=" text-center">Say! Hi 👋 to start the conversation</p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={newMessages}
            onChange={(e) => setNewMessages(e.target.value)}
            placeholder="Send Message"
            className="input border-slate-400 input-bordered w-full pr-10"
          />
          <button
            type="submit"
            disabled={sendLoading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
          >
            <IoSend
              className={`hover:text-gray-200 text-gray-400 cursor-pointer ${
                sendLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Right;
