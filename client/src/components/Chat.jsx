import React from "react";
import userImg from "/assets/my_profile.webp";
import useConversation from "../stateManage/useConversation.js";
import { IoCheckmarkDone } from "react-icons/io5";

function Chat({ message }) {
  const { selectedConversation } = useConversation();
  let authUser = null;
  try {
    const stored = localStorage.getItem("messanger");
    authUser = stored ? JSON.parse(stored) : null;
  } catch (e) {
    authUser = null;
  }

  const currentUserId = authUser?.user?._id || authUser?._id;
  const itsMe = String(message?.senderId) === String(currentUserId);

  const myAvatar = authUser?.user?.profilePic || authUser?.profilePic || userImg;
  const otherAvatar = selectedConversation?.profilePic || userImg;

  const formattedTime = message?.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className={`flex w-full my-1.5 ${itsMe ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[75%] ${itsMe ? "flex-row-reverse" : "flex-row"}`}>
        {/* Contact Avatar for received messages */}
        {!itsMe && (
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden ring-1 ring-slate-700 flex-shrink-0 mb-0.5">
            <img
              alt="Avatar"
              src={otherAvatar}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = userImg;
              }}
            />
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`px-3.5 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base leading-relaxed break-words break-all shadow-md transition-all ${
            itsMe
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-medium rounded-2xl rounded-br-xs"
              : "bg-slate-800/95 border border-slate-700/70 text-slate-100 rounded-2xl rounded-bl-xs"
          }`}
        >
          <span>{message?.message}</span>
          <div
            className={`flex items-center justify-end gap-1 text-[10px] sm:text-[11px] mt-1 -mb-0.5 ${
              itsMe ? "text-slate-950/70 font-semibold" : "text-gray-400 font-normal"
            }`}
          >
            <span>{formattedTime}</span>
            {itsMe && <IoCheckmarkDone className="text-xs text-slate-950/80" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
