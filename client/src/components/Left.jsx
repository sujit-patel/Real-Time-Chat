import React from "react";
import User from "./User.jsx";
import useGetAllUsers from "../context/useGetAllUsers.jsx";
import Search from "./Search.jsx";

function Left() {
  const [allUsers, loading] = useGetAllUsers();
  return (
    <div className="space-y-5 border w-1/4 max-h-screen px-3 my-2 py-3 flex flex-col border-slate-600 rounded-md">
      <div>
        <h1 className="text-4xl font-bold text-center pb-3">Chats</h1>
        <Search></Search>
      </div>
      <hr />
      <div className="space-y-2 overflow-y-auto scrollbar-hide flex-1">
        {allUsers.length > 0 ? (
          allUsers.map((user) => <User key={user._id} user={user} />)
        ) : (
          <p className="text-white">Users Not Found</p>
        )}
      </div>
    </div>
  );
}

export default Left;
