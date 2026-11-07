import React from "react";
import userImg from "/assets/my_profile.webp";
import useConversation from "../stateManage/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const handleClick = () => {
    setSelectedConversation(user);
  };

  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-xl cursor-pointer transition-all duration-200 border ${
        isSelected
          ? "bg-slate-700/80 border-orange-400/50 shadow-md"
          : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-700/50"
      }`}
      onClick={handleClick}
    >
      <div className={`avatar ${isOnline ? "online" : "offline"} flex-shrink-0`}>
        <div className="ring-orange-400/50 ring-offset-base-100 w-11 h-11 sm:w-12 sm:h-12 rounded-full ring-2 ring-offset-1 overflow-hidden">
          <img
            src={user.profilePic || userImg}
            alt={user.fullname}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = userImg;
            }}
          />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-sm sm:text-base font-semibold truncate text-white">
          {user.fullname}
        </h2>
        <p className="text-xs text-gray-400 truncate">{user.email}</p>
      </div>
    </div>
  );
}

export default User;
