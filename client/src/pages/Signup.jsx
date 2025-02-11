import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider.jsx";
// import { useAuth } from "../context/AuthProvider.jsx";

function Signup() {
  const [authUser, setAuthUser] = useAuth;
  console.log(authUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword,
    };
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("messanger", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error : " + error.response.data.message);
        }
      });
  };

  return (
    <div className="flex items-center gap-5 justify-center h-screen">
      <Toaster />
      <div>
        <Navbar></Navbar>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border w-1/3 border-slate-600 rounded-md py-3 px-7 space-y-5"
      >
        <h1 className="text-4xl font-bold text-center">Signup</h1>

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
                value: 6,
                message: "Password must be at least 6 characters",
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
