import React from "react";

function Loading() {
  return (
    <div className="bg-gradient-to-r from-slate-600 to-slate-700 h-full rounded-md flex items-center justify-center p-5 animate-pulse">
      <div className="flex w-60 flex-col gap-6">
        <div className="skeleton h-36 w-full rounded-lg animate-bounce"></div>
        <div className="skeleton h-5 w-32 rounded-md animate-pulse"></div>
        <div className="skeleton h-5 w-full rounded-md animate-fade"></div>
        <div className="skeleton h-5 w-full rounded-md animate-fade"></div>
      </div>
    </div>
  );
}

export default Loading;
