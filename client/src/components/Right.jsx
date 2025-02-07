import React from "react";
import Chat from "./Chat";
import User from "./User";
import { IoSend } from "react-icons/io5";
import userImg from "../assets/user profile.png";
function Right() {
  return (
    <>
      <div className="h-screen w-full flex gap-2 py-2 flex-col">
        <div>
          <div className="flex gap-5 bg-slate-700 border border-slate-400 hover:bg-slate-600 p-2 rounded-md cursor-pointer ">
            <div className="avatar online">
              <div className="w-14 rounded-full">
                <img src={userImg} className="scale-150"/>
              </div>
            </div>
            <div>
              <h1 className="text-xl">Sujit Patel</h1>
              <p className="text-sm">Online</p>
            </div>
          </div>
        </div>
        <div className="border border-slate-400 rounded-md px-3 py-2 overflow-y-auto flex-1 scrollbar-hide">
          <Chat />
          <Chat />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Send Message"
            className="input border-slate-400 input-bordered w-full pr-10"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1">
            <IoSend className="hover:text-gray-200 text-gray-400 cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Right;
