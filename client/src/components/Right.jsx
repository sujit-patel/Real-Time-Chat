<<<<<<< HEAD
import React from "react";
import userImg from "../assets/my_profile.webp";
import useConversation from "../stateManage/useConversation.js";
import Chats from "./Chats.jsx";
import InputMessage from "./InputMessage.jsx";
import { useSocketContext } from "../context/SocketContext.jsx";

function Right() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const itsOnline = onlineUsers.includes(selectedConversation._id);
=======
import React, { useEffect, useRef, useState } from "react";
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
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessages.trim()) return;

    await sendMessages(newMessages);
    setNewMessages("");
  };

  //last message
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  }, [messages]);
  return (
    <div className="h-screen w-full flex gap-2 py-2 flex-col">
      {/* User Profile Header */}
<<<<<<< HEAD
      <div className="flex items-center gap-5 bg-gray-800 border border-gray-600 hover:bg-gray-700 p-3 rounded-lg cursor-pointer shadow-md">
        <div className={`avatar ${itsOnline ? "online" : "offline"}`}>
          <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
            <img src={userImg} alt="User Avatar" />
=======
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
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            {selectedConversation?.fullname}
          </h1>
          <p
            className={`text-sm ${
              itsOnline ? "text-green-400" : "text-red-400"
            }`}
          >
            {itsOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Chat Messages */}
<<<<<<< HEAD
      <div className="flex-1 overflow-y-auto scrollbar-hide border border-slate-600 rounded-lg shadow-inner">
        <Chats />
      </div>

      {/* Message Input */}
      <div className="border border-slate-600 rounded-lg">
        <InputMessage />
      </div>
=======
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
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2
    </div>
  );
}

export default Right;
