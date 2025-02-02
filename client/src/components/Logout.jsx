import React from "react";
import { HiOutlineLogout } from "react-icons/hi";

function Logout() {
  return (
    <>
      <div className="flex items-end mb-5">
        <button className="scale-150 bg-slate-700 hover:bg-slate-600 rounded-md mx-2">
          <HiOutlineLogout className="m-2"/>
        </button>
      </div>
    </>
  );
}

export default Logout;
