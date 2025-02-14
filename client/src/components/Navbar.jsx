import React from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("messanger");
      if (!token) {
        toast.error("Already Logout User...");
      } else {
        const res = await axios.post("/api/user/logout");
        localStorage.removeItem("messanger");
        toast.success("Logout Successful...");
        // window.location.reload();
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
        <Link to="/signup" className="scale-150 hover:text-slate-200" title="Signup" >
          <FaUserPlus />
        </Link>
        <Link to="/login" className="scale-150 hover:text-slate-200" title="Login">
          <RiLoginCircleFill />
        </Link>
        <button className="scale-150 hover:text-slate-200" title="Logout" onClick={handleLogout}>
          <RiLogoutCircleFill />
        </button>
      </div>
    </>
  );
}

export default Navbar;
