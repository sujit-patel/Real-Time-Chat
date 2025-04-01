import React from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const [ authUser, setAuthUser ] = useAuth();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("messanger");
      if (!token) {
        toast.error("Already Logout User...");
      } else {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`);
        localStorage.removeItem("messanger");
        toast.success("Logout Successful...");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast.error("Error : " + error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center px-2 gap-5">
        <Link to="/" className="scale-150 hover:text-slate-200" title="Home">
          <IoHomeSharp />
        </Link>
        <Link
          to="/signup"
          className="scale-150 hover:text-slate-200"
          title="Signup"
        >
          <FaUserPlus />
        </Link>
        {authUser ? (
          <button
            className="scale-150 hover:text-slate-200"
            title="Logout"
            onClick={handleLogout}
          >
            <RiLogoutCircleFill />
          </button>
        ) : (
          <Link
            to="/login"
            className="scale-150 hover:text-slate-200"
            title="Login"
          >
            <RiLoginCircleFill />
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;
