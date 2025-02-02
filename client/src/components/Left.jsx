import React from "react";
import User from "./User";
function left() {
  return (
    <>
      <div className="w-1/4 space-y-5 h-screen flex flex-col">
        <div>
          <h1 className="text-4xl font-bold text-center pb-3">Chat</h1>
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
          <User />
          <User />
          <User />
          <User />
        </div>
      </div>
    </>
  );
}

export default left;
