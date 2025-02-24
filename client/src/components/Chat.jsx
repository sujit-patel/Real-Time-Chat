import React from "react";
import userImg from "../assets/user profile.png";

function Chat({ message }) {
  const authUser = JSON.parse(localStorage.getItem("messanger"));
  const itsMe = message.senderId === authUser.user._id;
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "chat-bubble-info" : "chat-bubble-accent";
  return (
    <div>
      <div className={`chat ${chatName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={userImg}
              className="scale-150"
            />
          </div>
        </div>
        <div className="chat-header">
          {/* Anakin */}
          {/* <time className="text-xs opacity-50">12:46</time> */}
        </div>
        <div className={`chat-bubble ${chatColor}`}>{message.message}</div>
        {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
      </div>
    </div>
  );
}

export default Chat;
