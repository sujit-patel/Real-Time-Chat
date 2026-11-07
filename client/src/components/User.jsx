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
      className={`flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all duration-150 border ${
        isSelected
          ? "bg-slate-800 border-orange-400/60 shadow-lg"
          : "bg-slate-900/60 md:bg-slate-800/40 border-slate-800/70 hover:bg-slate-800/70 active:scale-[0.99]"
      }`}
      onClick={handleClick}
    >
      {/* Avatar with dynamic online ring */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-700/80 shadow-md">
          <img
            src={user.profilePic || userImg}
            alt={user.fullname}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = userImg;
            }}
          />
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full shadow-sm" />
        )}
      </div>

      {/* User Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <h2 className="text-sm sm:text-base font-semibold truncate text-white">
            {user.fullname}
          </h2>
          {isOnline && (
            <span className="text-[10px] text-green-400 font-medium hidden sm:inline-block">
              Active
            </span>
          )}
        </div>
        <p className="text-xs truncate text-gray-400 mt-0.5">
          {isOnline ? (
            <span className="text-green-400/90 font-medium">Online now</span>
          ) : (
            user.email
          )}
        </p>
      </div>
    </div>
  );
}

export default User;
