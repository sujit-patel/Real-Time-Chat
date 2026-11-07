import React, { useState, useMemo } from "react";
import User from "./User.jsx";
import useGetAllUsers from "../context/useGetAllUsers.jsx";
import { useSocketContext } from "../context/SocketContext.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import ProfileModal from "./ProfileModal.jsx";
import defaultAvatar from "/assets/my_profile.webp";
import { IoSearchOutline, IoClose, IoChatbubbles, IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

function Left() {
  const [allUsers, loading] = useGetAllUsers();
  const { onlineUsers } = useSocketContext();
  const [authUser, setAuthUser] = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "online"
  const [showProfileModal, setShowProfileModal] = useState(false);

  const currentUser = authUser?.user || authUser;
  const currentPic = currentUser?.profilePic || defaultAvatar;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("messanger");
      setAuthUser(undefined);
      toast.success("Logged out successfully");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      toast.error("Logout error: " + (error?.response?.data?.message || error.message));
    }
  };

  // Filtered users based on search query and active tab
  const filteredUsers = useMemo(() => {
    if (!allUsers) return [];
    return allUsers.filter((user) => {
      const matchesSearch =
        user.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const isOnline = onlineUsers.includes(user._id);

      if (activeTab === "online") {
        return matchesSearch && isOnline;
      }
      return matchesSearch;
    });
  }, [allUsers, searchQuery, activeTab, onlineUsers]);

  const onlineCount = useMemo(() => {
    if (!allUsers) return 0;
    return allUsers.filter((u) => onlineUsers.includes(u._id)).length;
  }, [allUsers, onlineUsers]);

  return (
    <>
      <div className="w-full h-full flex flex-col bg-slate-900 md:bg-slate-800/40 md:border md:border-slate-800 md:rounded-2xl shadow-xl overflow-hidden">
        {/* Mobile App Bar (Native App Style Header) */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/80 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-slate-950 text-xl shadow-md">
              <IoChatbubbles />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-orange-200 bg-clip-text text-transparent">
                ChitChat
              </h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">
                {onlineCount} online now
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* User Profile Avatar */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="avatar cursor-pointer active:scale-95 transition-transform"
              title="My Profile"
            >
              <div className="w-8 h-8 rounded-full ring-2 ring-orange-400 ring-offset-1 ring-offset-slate-900 overflow-hidden shadow-sm">
                <img
                  src={currentPic}
                  alt="My Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                />
              </div>
            </button>

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-full text-gray-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Log out"
            >
              <IoLogOutOutline className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-4 pt-3 pb-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Chats</h1>
          <span className="badge bg-orange-400/20 text-orange-300 border-none font-semibold text-xs px-2.5 py-1">
            {allUsers?.length || 0} total
          </span>
        </div>

        {/* Search & Filter Container */}
        <div className="p-3 space-y-2.5 border-b border-slate-800/60 bg-slate-900/60">
          {/* Live Search Bar */}
          <div className="relative flex items-center">
            <IoSearchOutline className="absolute left-3 text-gray-400 text-lg pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-800/90 border border-slate-700/80 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/80 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 text-gray-400 hover:text-white"
              >
                <IoClose className="text-base" />
              </button>
            )}
          </div>

          {/* Quick Filter Tabs (Unique Signature Touch) */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-orange-400 text-slate-950 shadow-md"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700/80"
              }`}
            >
              All ({allUsers?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("online")}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "online"
                  ? "bg-green-500 text-slate-950 shadow-md"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700/80"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Online ({onlineCount})
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-1.5">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-2.5">
              <span className="loading loading-spinner loading-md text-orange-400"></span>
              <p className="text-gray-400 text-xs sm:text-sm">Loading contacts...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <User key={user._id} user={user} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-center px-4 space-y-1">
              <p className="text-sm font-medium text-gray-300">
                {activeTab === "online" ? "No contacts are online" : "No contacts found"}
              </p>
              <p className="text-xs text-gray-500">
                {searchQuery
                  ? "Try checking for spelling or search another name"
                  : "When friends register, they will appear here"}
              </p>
            </div>
          )}
        </div>
      </div>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
}

export default Left;
