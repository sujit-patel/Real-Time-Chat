import React, { useState } from "react";
import useGetAllUsers from "../context/useGetAllUsers";
import useConversation from "../stateManage/useConversation";
import toast from "react-hot-toast";

function Search({ onSearch }) {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;

    if (!allUsers || allUsers.length === 0) {
      toast.error("No users available");
      return;
    }

    const conversation = allUsers.find((user) =>
      user.fullname.toLowerCase().includes(trimmedSearch.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="input input-bordered input-sm sm:input-md flex items-center gap-2 bg-slate-900/80 border-slate-700 rounded-xl focus-within:border-orange-400 transition-colors">
        <input
          type="text"
          className="grow text-xs sm:text-sm text-white placeholder-gray-400"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="text-gray-400 hover:text-orange-300 transition-colors"
          title="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-80"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>
    </form>
  );
}

export default Search;
