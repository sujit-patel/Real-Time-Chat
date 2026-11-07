import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthProvider";
import defaultAvatar from "/assets/my_profile.webp";

function ProfileModal({ isOpen, onClose }) {
  const [authUser, setAuthUser] = useAuth();
  const [previewImage, setPreviewImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

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
      onClose();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 w-full max-w-sm max-h-[92vh] overflow-y-auto shadow-2xl space-y-4 relative animate-scaleIn">
        <button
          onClick={() => {
            onClose();
            setPreviewImage("");
          }}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-slate-700 text-lg transition-colors"
          title="Close"
        >
          <IoClose />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-center text-white">
          My Profile
        </h2>

        {/* Avatar Preview & File Input */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div
            className="relative cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
            title="Click to change photo"
          >
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring-4 ring-orange-400 ring-offset-2 ring-offset-slate-900 overflow-hidden shadow-xl">
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
        <div className="bg-slate-900/80 border border-slate-700/60 p-4 rounded-2xl space-y-2 text-xs sm:text-sm">
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
        <div className="flex justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              setPreviewImage("");
            }}
            className="btn btn-sm btn-ghost text-gray-300 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={
              isUpdating || !previewImage || previewImage === currentUser?.profilePic
            }
            onClick={handleSaveProfilePic}
            className="btn btn-sm bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 text-slate-950 font-semibold border-none rounded-xl disabled:bg-slate-700 disabled:text-gray-500"
          >
            {isUpdating ? "Saving..." : "Save Photo"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
