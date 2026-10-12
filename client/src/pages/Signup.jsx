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
    <div className="flex items-center gap-5 justify-center min-h-screen py-10">
      <div>
        <Navbar></Navbar>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border w-96 border-slate-600 rounded-md py-4 px-7 space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Signup</h1>

        {/* Profile Image Upload Option */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div
            className="relative cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
            title="Click to choose profile picture (optional)"
          >
            <div className="avatar">
              <div className="w-20 h-20 rounded-full ring-2 ring-orange-300 ring-offset-2 ring-offset-base-100 overflow-hidden">
                <img
                  src={profilePic || defaultAvatar}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
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
            className="text-xs text-orange-300 hover:underline"
          >
            {profilePic ? "Change Photo" : "Upload Photo (Optional)"}
          </button>
        </div>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            required
            className="grow"
            name="fullname"
            placeholder="Fullname"
            {...register("fullname", { required: "Fullname is required" })}
          />
        </label>
        {errors.fullname && (
          <p className="text-red-500">{errors.fullname.message}</p>
        )}

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            required
            className="grow"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
        </label>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="input input-bordered flex items-center gap-2">
          <input
            required
            type="password"
            className="grow"
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
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <label className="input input-bordered flex items-center gap-2">
          <input
            required
            type="password"
            className="grow"
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
          <p className="text-red-500">{errors.confirmpassword.message}</p>
        )}

        <div className="flex flex-wrap justify-between">
          <button
            type="submit"
            className="btn btn-outline text-black hover:bg-orange-200 bg-orange-300 opacity-70"
          >
            Submit
          </button>
          <button
            type="reset"
            className="btn btn-outline text-black hover:bg-orange-200 bg-orange-300 opacity-70"
          >
            Reset
          </button>
        </div>

        <div>
          <p className="text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-500 underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
