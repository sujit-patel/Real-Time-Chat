import React from "react";
import Right from "../components/Right";
import Left from "../components/Left.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
function Home() {
  const { authUser, setAuthUser } = useAuth();
  return (
    <>
      <div className="flex h-screen gap-3 mx-2">
        <Navbar />
        {authUser ? (
          <>
            <Left />
            <Right />
          </>
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <p className="text-2xl text-red-500 font-bold animate-move">
              User Not Login...!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
