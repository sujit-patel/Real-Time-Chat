import React from "react";
import userImg from "/assets/my_profile.webp";
import useConversation from "../stateManage/useConversation.js";
import Chats from "./Chats.jsx";
import InputMessage from "./InputMessage.jsx";
import { useSocketContext } from "../context/SocketContext.jsx";
import { IoArrowBack } from "react-icons/io5";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = selectedConversation?._id
    ? onlineUsers.includes(selectedConversation._id)
    : false;

  return (
    <div className="h-full w-full flex flex-col gap-2 overflow-hidden">
      {/* User Profile Header */}
      <div className="flex items-center gap-2 sm:gap-4 bg-slate-800/90 border border-slate-700/80 p-2.5 sm:p-3 rounded-xl shadow-md flex-shrink-0">
        {/* Back button visible only on mobile */}
        <button
          onClick={() => setSelectedConversation(null)}
          className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-full transition-colors active:scale-95"
          title="Back to chats"
        >
          <IoArrowBack className="text-xl" />
        </button>

        <div className={`avatar ${isOnline ? "online" : "offline"} flex-shrink-0`}>
          <div className="ring-orange-400/50 ring-offset-base-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-offset-1 overflow-hidden">
            <img
              src={selectedConversation?.profilePic || userImg}
              alt={selectedConversation?.fullname || "User Avatar"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = userImg;
              }}
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-bold text-white truncate">
            {selectedConversation?.fullname}
          </h2>
          <p
            className={`text-xs font-medium flex items-center gap-1 ${
              isOnline ? "text-green-400" : "text-gray-400"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? "bg-green-400" : "bg-gray-500"
              }`}
            />
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide border border-slate-700/80 rounded-xl bg-slate-900/60 shadow-inner">
        <Chats />
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0">
        <InputMessage />
      </div>
    </div>
  );
}

export default Right;
