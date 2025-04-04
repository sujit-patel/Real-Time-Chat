import React from "react";
import Right from "../components/Right";
import Left from "../components/Left.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import useConversation from "../stateManage/useConversation.js";
import Welcome from "../components/Welcome.jsx";
function Home() {
  const [authUser, setAuthUser] = useAuth();
  const { selectedConversation } = useConversation();

  return (
    <>
      <div className="flex h-screen gap-3 mx-2">
        <Navbar />
        {authUser ? (
          <>
            <Left />
            {selectedConversation ? <Right /> : <Welcome />}
          </>
        ) : (
          <div className="max-h-screen flex items-center justify-center w-full">
            <p className="text-6xl text-red-700 font-bold animate-move">
              User Not Login...!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
