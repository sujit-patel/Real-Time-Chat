import React from "react";
import Chat from "./Chat";
import { IoSend } from "react-icons/io5";
import userImg from "../assets/user profile.png";
import useConversation from "../stateManage/useConversation.js";
import useGetMessage from "../context/useGetMessage.js";
import Loading from "../components/Loading.jsx";

function Right() {
  const { selectedConversation } = useConversation();
  const { loading, messages } = useGetMessage();
  // console.log(messages);
  console.log(messages);
  console.log(messages.messages);

  return (
    <div className="h-screen w-full flex gap-2 py-2 flex-col">
      {/* User Profile Header */}
      <div>
        <div className="flex gap-5 bg-slate-700 border border-slate-400 hover:bg-slate-600 p-2 rounded-md cursor-pointer">
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
      <div className="border border-slate-400 rounded-md px-3 py-2 overflow-y-auto flex-1 scrollbar-hide">
        {loading ? (
          <Loading />
        ) : (
          messages.messages?.length > 0 &&
          messages.messages.map((message) => (
            <Chat key={message._id} message={message} />
          ))
        )}
        {!loading && messages.length === 0 && (
          <div className="flex justify-center font-bold text-2xl h-full items-center">
            <p className=" text-center">Say! Hi 👋 to start the conversation</p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Send Message"
          className="input border-slate-400 input-bordered w-full pr-10"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1">
          <IoSend className="hover:text-gray-200 text-gray-400 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default Right;
