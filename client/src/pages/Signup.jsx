import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider.jsx";
import defaultAvatar from "/assets/my_profile.webp";
import { FaCamera } from "react-icons/fa6";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const handleImageChange = (e) => {
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
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword,
      profilePic: profilePic || "",
    };
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/signup`, userInfo, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("messanger", JSON.stringify(response.data));
        setAuthUser(response.data);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error : " + error.response.data.message);
        }
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full p-4 sm:p-6 bg-slate-900 text-white gap-4 md:gap-8">
      {/* On desktop show side navbar */}
      <div className="hidden md:flex h-screen items-center">
        <Navbar />
      </div>

      <div className="w-full max-w-md py-4">
        {/* On mobile show home / brand link */}
        <div className="md:hidden flex items-center justify-between mb-4 px-1">
          <Link
            to="/"
            className="text-xl font-bold text-orange-400 flex items-center gap-2"
          >
            ChitChat
          </Link>
          <Link
            to="/login"
            className="text-xs text-orange-300 hover:underline"
          >
            Already have an account?
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-sm"
        >
          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Create Account
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Sign up to start chatting with friends
            </p>
          </div>

          {/* Profile Image Upload Option */}
          <div className="flex flex-col items-center justify-center gap-2 pt-1 pb-2">
            <div
              className="relative cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
              title="Click to choose profile picture (optional)"
            >
              <div className="avatar">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full ring-4 ring-orange-400 ring-offset-2 ring-offset-slate-900 overflow-hidden shadow-lg">
                  <img
                    src={profilePic || defaultAvatar}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <FaCamera className="text-xl" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-orange-300 hover:underline font-medium"
            >
              {profilePic ? "Change Photo" : "Upload Photo (Optional)"}
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="input input-bordered flex items-center gap-2 bg-slate-900/80 border-slate-700 focus-within:border-orange-400 rounded-xl">
                <input
                  type="text"
                  required
                  className="grow text-sm sm:text-base text-white placeholder-gray-400"
                  name="fullname"
                  placeholder="Full Name"
                  {...register("fullname", { required: "Full name is required" })}
                />
              </label>
              {errors.fullname && (
                <p className="text-red-400 text-xs mt-1 px-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            <div>
              <label className="input input-bordered flex items-center gap-2 bg-slate-900/80 border-slate-700 focus-within:border-orange-400 rounded-xl">
                <input
                  type="email"
                  required
                  className="grow text-sm sm:text-base text-white placeholder-gray-400"
                  name="email"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 px-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="input input-bordered flex items-center gap-2 bg-slate-900/80 border-slate-700 focus-within:border-orange-400 rounded-xl">
                <input
                  required
                  type="password"
                  className="grow text-sm sm:text-base text-white placeholder-gray-400"
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters",
                    },
                  })}
                />
              </label>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 px-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="input input-bordered flex items-center gap-2 bg-slate-900/80 border-slate-700 focus-within:border-orange-400 rounded-xl">
                <input
                  required
                  type="password"
                  className="grow text-sm sm:text-base text-white placeholder-gray-400"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  {...register("confirmpassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </label>
              {errors.confirmpassword && (
                <p className="text-red-400 text-xs mt-1 px-1">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="btn bg-orange-400 hover:bg-orange-300 text-black font-semibold border-none flex-1 rounded-xl shadow-md active:scale-95 transition-all"
            >
              Sign Up
            </button>
            <button
              type="reset"
              className="btn btn-outline border-slate-600 hover:bg-slate-700 text-gray-300 flex-1 rounded-xl"
            >
              Reset
            </button>
          </div>

          <div className="text-center pt-2 border-t border-slate-700/60">
            <p className="text-xs sm:text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-400 hover:underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
