import React from "react";

function User() {
  return (
    <>
      <div className="flex gap-5 bg-slate-700 hover:bg-slate-600 p-2 rounded-md cursor-pointer ">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h1 className="text-xl">Sujit Patel</h1>
          <p className="text-sm">sujit@gmail.com</p>
        </div>
      </div>
    </>
  );
}

export default User;
