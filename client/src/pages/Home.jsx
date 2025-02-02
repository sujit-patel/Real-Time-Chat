import React from "react";
import Right from "../components/Right";
import Left from "../components/Left.jsx";
import Logout from "../components/Logout.jsx";


function Home() {
  return (
    <>
      <div className="flex h-screen gap-3 mx-2 my-1">
        <Logout />
        <Left />
        <Right />
      </div>
    </>
  );
}

export default Home;
