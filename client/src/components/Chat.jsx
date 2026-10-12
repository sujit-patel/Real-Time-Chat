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
    <div>
      <div className={`chat ${chatName}`}>
        <div className="chat-image avatar">
          <div className="w-10 h-10 rounded-full overflow-hidden">
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
        <div className="chat-header">
          <time className="text-xs opacity-50">{formattedTime}</time>
        </div>
        <div className={`chat-bubble ${chatColor}`}>{message?.message}</div>
      </div>
    </div>
  );
}

export default Chat;
