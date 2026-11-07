import React from "react";

function Loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center p-4 space-y-4 max-w-md mx-auto">
      <div className="chat chat-start flex items-end">
        <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
        <div className="skeleton h-9 w-44 rounded-2xl ml-2 bg-slate-700/60"></div>
      </div>
      <div className="chat chat-end flex items-end justify-end">
        <div className="skeleton h-11 w-52 rounded-2xl mr-2 bg-slate-700/60"></div>
        <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
      </div>
      <div className="chat chat-start flex items-end">
        <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
        <div className="skeleton h-8 w-32 rounded-2xl ml-2 bg-slate-700/60"></div>
      </div>
    </div>
  );
}

export default Loading;
