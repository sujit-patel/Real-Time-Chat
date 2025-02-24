import React from "react";
import userImg from "../assets/user profile.png";

function Chat({ message }) {
  return (
    <div>
      <div className="chat chat-start">
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
          {/* <time className="text-xs opacity-50">12:45</time> */}
        </div>
        <div className="chat-bubble">ok</div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
      <div className="chat chat-end">
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
        <div className="chat-bubble">{message.message}</div>
        {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
      </div>
    </div>
  );
}

export default Chat;
