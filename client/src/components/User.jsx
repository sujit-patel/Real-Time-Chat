import React from "react";
import userImg from "../assets/user profile.png";
import useConversation from "../stateManage/useConversation.js";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  const handelClick = () => {
    setSelectedConversation(user);
    console.log("Selected user : " + user.fullname);
  };
  return (
    <>
      <div
        className={`flex gap-5 hover:bg-slate-600 border border-slate-500 p-2 rounded-md cursor-pointer 
        ${isSelected ? "bg-slate-600" : ""}`}
        onClick={handelClick}
      >
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src={userImg} className="scale-150" />
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
