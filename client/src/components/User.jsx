import React from "react";
import userImg from "../assets/user profile.png"
function User() {
  return (
    <>
      <div className="flex gap-5 bg-slate-700 hover:bg-slate-600 p-2 rounded-md cursor-pointer ">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src={userImg} className="scale-150" />
          </div>
        </div>
        <div>
          <h1 className="text-xl">user.fullname</h1>
          <p className="text-sm ">user.email</p>
        </div>
      </div>
    </>
  );
}

export default User;
