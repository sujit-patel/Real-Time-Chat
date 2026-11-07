import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, userInfo, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          toast.success("Login Successful...");
        }
        localStorage.setItem("messanger", JSON.stringify(response.data));
        setAuthUser(response.data);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full p-4 sm:p-6 bg-slate-900 text-white gap-4 md:gap-8">
      {/* On desktop show side navbar */}
      <div className="hidden md:flex h-screen items-center">
        <Navbar />
      </div>

      <div className="w-full max-w-md">
        {/* On mobile show home / brand link */}
        <div className="md:hidden flex items-center justify-between mb-4 px-1">
          <Link
            to="/"
            className="text-xl font-bold text-orange-400 flex items-center gap-2"
          >
            ChitChat
          </Link>
          <Link
            to="/signup"
            className="text-xs text-orange-300 hover:underline"
          >
            Need an account?
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-sm"
        >
          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Sign in to continue to ChitChat
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="input input-bordered flex items-center gap-2 bg-slate-900/80 border-slate-700 focus-within:border-orange-400 rounded-xl">
                <input
                  type="email"
                  className="grow text-sm sm:text-base text-white placeholder-gray-400"
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
                  type="password"
                  className="grow text-sm sm:text-base text-white placeholder-gray-400"
                  placeholder="Password"
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
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="btn bg-orange-400 hover:bg-orange-300 text-black font-semibold border-none flex-1 rounded-xl shadow-md active:scale-95 transition-all"
            >
              Sign In
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
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-400 hover:underline font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
