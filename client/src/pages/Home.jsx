import React from "react";
import Right from "../components/Right";
import Left from "../components/Left.jsx";
import Navbar from "../components/Navbar.jsx";
function Home() {
  return (
    <>
      <div className="flex h-screen gap-3 mx-2">
        <Navbar></Navbar>
        <Left />
        <Right />
      </div>
    </>
  );
}

export default Home;
