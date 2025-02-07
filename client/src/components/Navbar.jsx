import React from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

function Navbar() {
  return (
    <>
      <div className="flex flex-col justify-center px-2 gap-5">
        <Link to="/" className="scale-150 hover:text-slate-200">
          <IoHomeSharp />
        </Link>
        <Link to="/signup" className="scale-150 hover:text-slate-200">
          <FaUserPlus />
        </Link>
        <Link to="/login" className="scale-150 hover:text-slate-200">
          <RiLoginCircleFill />
        </Link>
        <Link to="/logout" className="scale-150 hover:text-slate-200">
          <RiLogoutCircleFill />
        </Link>
      </div>
    </>
  );
}

export default Navbar;
