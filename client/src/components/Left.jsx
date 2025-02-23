import React, { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

function Left() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/user/getallusers");
        setAllUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching getUsers:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="space-y-5 border w-1/4 h-screen px-3 py-3 flex flex-col border-slate-400 rounded-md">
      <div>
        <h1 className="text-4xl font-bold text-center pb-3">Chats</h1>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
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
