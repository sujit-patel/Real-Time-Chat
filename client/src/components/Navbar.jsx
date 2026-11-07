import React, { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import defaultAvatar from "/assets/my_profile.webp";
import ProfileModal from "./ProfileModal.jsx";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [showModal, setShowModal] = useState(false);

  const currentUser = authUser?.user || authUser;
  const currentPic = currentUser?.profilePic || defaultAvatar;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("messanger");
      setAuthUser(undefined);
      toast.success("Logout Successful...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(
        "Error : " + (error?.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between py-5 px-2 h-full w-16 border-r border-slate-800 bg-slate-900/95 flex-shrink-0">
        <div className="flex flex-col items-center gap-6">
          <Link
            to="/"
            className="p-2.5 rounded-2xl text-slate-300 hover:text-orange-400 hover:bg-slate-800/80 transition-all active:scale-95 shadow-sm"
            title="Home"
          >
            <IoHomeSharp className="text-2xl" />
          </Link>
          {!authUser && (
            <Link
              to="/signup"
              className="p-2.5 rounded-2xl text-slate-300 hover:text-orange-400 hover:bg-slate-800/80 transition-all active:scale-95 shadow-sm"
              title="Signup"
            >
              <FaUserPlus className="text-2xl" />
            </Link>
          )}
        </div>

        <div className="flex flex-col items-center gap-5">
          {authUser ? (
            <>
              {/* Profile Avatar Button */}
              <button
                onClick={() => setShowModal(true)}
                title="View / Edit Profile"
                className="avatar cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-10 h-10 rounded-full ring-2 ring-orange-400 ring-offset-2 ring-offset-slate-900 overflow-hidden shadow-lg hover:ring-orange-300 transition-all">
                  <img
                    src={currentPic}
                    alt="My Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
              </button>

              <button
                className="p-2.5 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-slate-800/80 transition-all active:scale-95 shadow-sm"
                title="Logout"
                onClick={handleLogout}
              >
                <RiLogoutCircleFill className="text-2xl" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="p-2.5 rounded-2xl text-slate-300 hover:text-orange-400 hover:bg-slate-800/80 transition-all active:scale-95 shadow-sm"
              title="Login"
            >
              <RiLoginCircleFill className="text-2xl" />
            </Link>
          )}
        </div>
      </div>

      <ProfileModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default Navbar;
