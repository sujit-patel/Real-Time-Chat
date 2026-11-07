import React from "react";
import userImg from "/assets/my_profile.webp";
import useConversation from "../stateManage/useConversation.js";

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
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "chat-bubble-accent" : "chat-bubble-info";

  const myAvatar = authUser?.user?.profilePic || authUser?.profilePic || userImg;
  const otherAvatar = selectedConversation?.profilePic || userImg;
  const avatarToDisplay = itsMe ? myAvatar : otherAvatar;

  const formattedTime = message?.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="py-0.5">
      <div className={`chat ${chatName}`}>
        <div className="chat-image avatar">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-1 ring-slate-600">
            <img
              alt="User Avatar"
              src={avatarToDisplay || userImg}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = userImg;
              }}
            />
          </div>
        </div>
        <div className="chat-header pb-0.5">
          <time className="text-[10px] sm:text-xs opacity-60">{formattedTime}</time>
        </div>
        <div
          className={`chat-bubble ${chatColor} text-sm sm:text-base break-words break-all max-w-[85%] sm:max-w-[75%] shadow-sm`}
        >
          {message?.message}
        </div>
      </div>
    </div>
  );
}

export default Chat;
