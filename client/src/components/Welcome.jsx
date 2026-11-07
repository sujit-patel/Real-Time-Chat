import React from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { TiMessages } from "react-icons/ti";

function Welcome() {
  const [authUser] = useAuth();
  const userName = authUser?.user?.fullname || authUser?.fullname || "Friend";

  return (
    <div className="h-full w-full flex items-center justify-center p-3">
      <div className="border border-slate-700/80 bg-slate-800/40 backdrop-blur-sm h-full w-full text-center rounded-xl p-6 sm:p-10 space-y-4 flex items-center flex-col justify-center shadow-lg">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-400/20 text-orange-300 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
          <TiMessages />
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Welcome, <span className="text-orange-300">{userName}!</span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-md">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
}

export default Welcome;
