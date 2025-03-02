import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";

function Login() {
  const [ authUser, setAuthUser ] = useAuth();
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
      .post("/api/user/login", userInfo)
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
    <div className="flex items-center gap-5 justify-center h-screen">
      <div>
        <Navbar></Navbar>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border w-1/3 border-slate-600 rounded-md py-3 px-7 space-y-5"
      >
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            className="grow"
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
            type="password"
            className="grow"
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
          <p className="text-red-500">{errors.password.message}</p>
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-sky-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
