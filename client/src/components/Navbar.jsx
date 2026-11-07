import React, { useState, useRef } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoHomeSharp, IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthProvider";
import defaultAvatar from "/assets/my_profile.webp";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);

  const currentUser = authUser?.user || authUser;
  const currentPic = currentUser?.profilePic || defaultAvatar;

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, JPEG, WEBP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfilePic = async () => {
    if (!previewImage) {
      toast.error("Please select a new photo first");
      return;
    }

    setIsUpdating(true);
    try {
      let token = null;
      try {
        const stored = localStorage.getItem("messanger");
        const parsed = stored ? JSON.parse(stored) : null;
        token = parsed?.token || Cookies.get("jwt");
      } catch (e) {
        token = Cookies.get("jwt");
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        { profilePic: previewImage },
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const updatedUser = res.data.user;
      const updatedAuthState = {
        ...authUser,
        user: updatedUser,
      };

      setAuthUser(updatedAuthState);
      localStorage.setItem("messanger", JSON.stringify(updatedAuthState));
      toast.success("Profile picture updated!");
      setShowModal(false);
      setPreviewImage("");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        "Failed to update profile: " +
          (error?.response?.data?.message || error.message)
      );
    } finally {
      setIsUpdating(false);
    }
  };

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
      <div className="flex flex-col items-center justify-between py-4 px-1.5 sm:px-2 h-full w-14 sm:w-16 border-r border-slate-700/80 bg-slate-900/95 flex-shrink-0">
        <div className="flex flex-col items-center gap-5 sm:gap-6">
          <Link
            to="/"
            className="p-2 rounded-xl text-slate-300 hover:text-orange-300 hover:bg-slate-800 transition-all active:scale-95"
            title="Home"
          >
            <IoHomeSharp className="text-xl sm:text-2xl" />
          </Link>
          {!authUser && (
            <Link
              to="/signup"
              className="p-2 rounded-xl text-slate-300 hover:text-orange-300 hover:bg-slate-800 transition-all active:scale-95"
              title="Signup"
            >
              <FaUserPlus className="text-xl sm:text-2xl" />
            </Link>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 sm:gap-5">
          {authUser ? (
            <>
              {/* Profile Avatar Button */}
              <button
                onClick={() => {
                  setPreviewImage(currentUser?.profilePic || "");
                  setShowModal(true);
                }}
                title="View / Edit Profile"
                className="avatar cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-orange-400 ring-offset-2 ring-offset-slate-900 overflow-hidden shadow-md">
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
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all active:scale-95"
                title="Logout"
                onClick={handleLogout}
              >
                <RiLogoutCircleFill className="text-xl sm:text-2xl" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="p-2 rounded-xl text-slate-300 hover:text-orange-300 hover:bg-slate-800 transition-all active:scale-95"
              title="Login"
            >
              <RiLoginCircleFill className="text-xl sm:text-2xl" />
            </Link>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6 w-full max-w-sm max-h-[92vh] overflow-y-auto shadow-2xl space-y-4 relative">
            <button
              onClick={() => {
                setShowModal(false);
                setPreviewImage("");
              }}
              className="absolute top-3.5 right-3.5 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700 text-xl transition-colors"
            >
              <IoClose />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-center text-white">
              User Profile
            </h2>

            {/* Avatar Preview & File Input */}
            <div className="flex flex-col items-center justify-center gap-3">
              <div
                className="relative cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
                title="Click to change photo"
              >
                <div className="avatar">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-orange-400 ring-offset-2 ring-offset-slate-900 overflow-hidden shadow-lg">
                    <img
                      src={previewImage || currentPic}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = defaultAvatar;
                      }}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <FaCamera className="text-2xl" />
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageSelect}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-orange-300 hover:underline font-medium"
              >
                Choose New Photo
              </button>
            </div>

            {/* User Info Details */}
            <div className="bg-slate-900/70 border border-slate-700/60 p-3 sm:p-3.5 rounded-xl space-y-1.5 text-xs sm:text-sm">
              <p className="text-gray-300 truncate">
                <span className="font-semibold text-white">Name: </span>
                {currentUser?.fullname || "User"}
              </p>
              <p className="text-gray-300 truncate">
                <span className="font-semibold text-white">Email: </span>
                {currentUser?.email || "Email not available"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setPreviewImage("");
                }}
                className="btn btn-sm btn-ghost text-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUpdating || !previewImage || previewImage === currentUser?.profilePic}
                onClick={handleSaveProfilePic}
                className="btn btn-sm bg-orange-400 hover:bg-orange-300 text-black font-semibold border-none disabled:bg-slate-700 disabled:text-gray-500"
              >
                {isUpdating ? "Saving..." : "Save Photo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
