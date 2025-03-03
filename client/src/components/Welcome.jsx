import React from "react";

function Welcome() {
  const itsMe = JSON.parse(localStorage.getItem("messanger"));
  // console.log(itsMe);
  return (
    <>
<<<<<<< HEAD
      <div className="max-h-screen my-1 w-full p-1">
        <div className="border h-full w-full rounded-md space-y-3 flex items-center flex-col justify-center border-slate-600">
=======
      <div className="h-full w-full p-1">
        <div className="border h-full w-full rounded-md space-y-3 flex items-center flex-col justify-center border-slate-400">
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2
          <h1 className="text-6xl font-bold">Welcome to ChitChat</h1>
          <p className="text-2xl"><span className="text-orange-200 underline">{itsMe.user.fullname}</span> Select Your Friend and Start Messages</p>
        </div>
      </div>
    </>
  );
}

export default Welcome;
