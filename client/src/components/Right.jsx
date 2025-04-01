import React from "react";
import userImg from "/assets/my_profile.webp";
import useConversation from "../stateManage/useConversation.js";
import Chats from "./Chats.jsx";
import InputMessage from "./InputMessage.jsx";
import { useSocketContext } from "../context/SocketContext.jsx";

function Right() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const itsOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <div className="h-screen w-full flex gap-2 py-2 flex-col">
      {/* User Profile Header */}
      <div className="flex items-center gap-5 bg-gray-800 border border-gray-600 hover:bg-gray-700 p-3 rounded-lg cursor-pointer shadow-md">
        <div className={`avatar ${itsOnline ? "online" : "offline"}`}>
          <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
            <img src={userImg} alt="User Avatar" />
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
      <div className="flex-1 overflow-y-auto scrollbar-hide border border-slate-600 rounded-lg shadow-inner">
        <Chats />
      </div>

      {/* Message Input */}
      <div className="border border-slate-600 rounded-lg">
        <InputMessage />
      </div>
    </div>
  );
}

export default Right;
