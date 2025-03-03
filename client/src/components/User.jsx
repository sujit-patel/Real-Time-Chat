import React from "react";
import userImg from "../assets/my_profile.webp";
import useConversation from "../stateManage/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const itsMe = onlineUsers.includes(user._id);

  const handleClick = () => {
    setSelectedConversation(user);
    console.log("Selected user : " + user.fullname);
  };
  return (
    <>
      <div
        className={`flex gap-5 hover:bg-slate-700 border border-slate-600 p-2 rounded-md cursor-pointer 
        ${isSelected ? "bg-slate-600" : ""}`}
        onClick={handleClick}
      >
        <div className={`avatar ${itsMe ? "online" : "offline"}`}>
          <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
            <img src={userImg} />
          </div>
        </div>
        <div>
          <h1 className="text-xl">{user.fullname}</h1>
          <p className="text-sm ">{user.email}</p>
        </div>
      </div>
    </>
  );
}

export default User;
