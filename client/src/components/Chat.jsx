import React from "react";
import userImg from "../assets/my_profile.webp";

function Chat({ message }) {
  const authUser = JSON.parse(localStorage.getItem("messanger"));
  const itsMe = message.senderId === authUser.user._id;
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "chat-bubble-accent" : "chat-bubble-info";
  return (
    <div>
      <div className={`chat ${chatName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
<<<<<<< HEAD
            <img alt="User Avatar" src={userImg} />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">
            {new Date(message.createdAt).toLocaleTimeString()}
          </time>
        </div>
        <div className={`chat-bubble ${chatColor}`}>{message.message}</div>
=======
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
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2
      </div>
    </div>
  );
}

export default Chat;
