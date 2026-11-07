import React from "react";
import User from "./User.jsx";
import useGetAllUsers from "../context/useGetAllUsers.jsx";
import Search from "./Search.jsx";

function Left() {
  const [allUsers, loading] = useGetAllUsers();
  return (
    <div className="w-full h-full flex flex-col border border-slate-700 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 space-y-3 shadow-lg overflow-hidden">
      <div>
        <div className="flex items-center justify-between pb-2 px-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Chats</h1>
          {allUsers?.length > 0 && (
            <span className="badge bg-orange-400/20 text-orange-300 border-none font-semibold text-xs">
              {allUsers.length}
            </span>
          )}
        </div>
        <Search />
      </div>
      <div className="border-t border-slate-700/80 my-1" />
      <div className="space-y-2 overflow-y-auto scrollbar-hide flex-1 pr-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-32 space-y-2">
            <span className="loading loading-spinner text-orange-400"></span>
            <p className="text-gray-400 text-xs sm:text-sm">Loading chats...</p>
          </div>
        ) : allUsers && allUsers.length > 0 ? (
          allUsers.map((user) => <User key={user._id} user={user} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <p className="text-sm">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Left;
