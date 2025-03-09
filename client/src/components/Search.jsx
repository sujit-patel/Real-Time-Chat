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
    <form onSubmit={handleSubmit}>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
    </form>
  );
}

export default Search;
