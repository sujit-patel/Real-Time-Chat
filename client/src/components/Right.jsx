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
    <div className="h-full w-full flex flex-col overflow-hidden bg-slate-950 md:bg-slate-900 md:border md:border-slate-800 md:rounded-2xl shadow-2xl">
      {/* Native App Style Top Bar */}
      <div className="flex items-center gap-2 sm:gap-3.5 px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/95 border-b border-slate-800/90 backdrop-blur-md flex-shrink-0 z-10 shadow-sm">
        {/* Back button visible only on mobile */}
        <button
          onClick={() => setSelectedConversation(null)}
          className="md:hidden p-2 -ml-1 text-gray-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors active:scale-90"
          title="Back to chats"
        >
          <IoArrowBack className="text-xl text-orange-400" />
        </button>

        {/* Contact Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-slate-700 shadow-md">
            <img
              src={selectedConversation?.profilePic || userImg}
              alt={selectedConversation?.fullname || "User Avatar"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = userImg;
              }}
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full shadow-sm" />
          )}
        </div>

        {/* Contact Name & Status */}
        <div className="min-w-0 flex-1">
          <h2 className="text-sm sm:text-base font-bold text-white truncate leading-tight">
            {selectedConversation?.fullname}
          </h2>
          <p
            className={`text-xs font-medium flex items-center gap-1.5 mt-0.5 ${
              isOnline ? "text-green-400" : "text-gray-400"
            }`}
          >
            {isOnline ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                Offline
              </>
            )}
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide bg-slate-950/70 relative">
        <Chats />
      </div>

      {/* Floating / Docked Message Input */}
      <div className="flex-shrink-0 p-2 sm:p-3 bg-slate-900/90 border-t border-slate-800/80 backdrop-blur-md">
        <InputMessage />
      </div>
    </div>
  );
}

export default Right;
