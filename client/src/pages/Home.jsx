import React from "react";
import Right from "../components/Right";
import Left from "../components/Left.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import useConversation from "../stateManage/useConversation.js";
import Welcome from "../components/Welcome.jsx";
import { Link } from "react-router-dom";
import { IoChatbubblesOutline } from "react-icons/io5";

function Home() {
  const [authUser] = useAuth();
  const { selectedConversation } = useConversation();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 text-white">
      {authUser ? (
        <div className="flex h-full w-full overflow-hidden">
          {/* Navbar: On mobile, visible when on chat list; on desktop, always visible */}
          <div
            className={`${
              selectedConversation ? "hidden md:flex" : "flex"
            } flex-shrink-0`}
          >
            <Navbar />
          </div>

          {/* Left Sidebar (Chats List): On mobile, visible only when no chat is active; on desktop, always visible */}
          <div
            className={`${
              selectedConversation ? "hidden md:flex" : "flex"
            } flex-1 md:flex-initial md:w-80 lg:w-96 h-full flex-shrink-0 p-2 md:p-3 overflow-hidden`}
          >
            <Left />
          </div>

          {/* Right Panel (Active Chat or Welcome): On mobile, visible only when chat is selected; on desktop, always visible */}
          <div
            className={`${
              selectedConversation ? "flex" : "hidden md:flex"
            } flex-1 h-full p-2 md:p-3 overflow-hidden`}
          >
            {selectedConversation ? <Right /> : <Welcome />}
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-full w-full items-center justify-center p-4">
          <div className="hidden md:block mr-6">
            <Navbar />
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 max-w-md w-full bg-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl space-y-5">
            <div className="w-20 h-20 bg-orange-400/20 text-orange-300 rounded-full flex items-center justify-center text-4xl shadow-inner">
              <IoChatbubblesOutline />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Welcome to ChitChat
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              Connect and message with your friends in real-time. Please log in or sign up to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
              <Link
                to="/login"
                className="btn bg-orange-400 hover:bg-orange-300 text-black font-semibold flex-1 border-none"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="btn btn-outline border-slate-500 hover:bg-slate-700 text-white flex-1"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
