import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth } from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import useToken from "../../hooks/useToken";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // FORM hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // User creator hook using email and password
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, uerror] = useUpdateProfile(auth);

  const [signInWithGoogle, gUser, gloading, gerror] = useSignInWithGoogle(auth);

  const [epUser, setEpUser] = useState(null);
  // TOKEN HOOK
  const [token] = useToken(epUser || gUser);

  // Handling form submit
  const onSubmit = async (data) => {
    const displayName = data.name;
    const email = data.email;
    const password = data.password;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName });
  };

  useEffect(() => {
    if (user && !updating) {
      setEpUser(user);
    }
  }, [user, updating]);

  if (loading || updating || gloading) {
    return <Loading></Loading>;
  }

  let errorElement;

  if (error || gerror) {
    errorElement = (
      <p className="text-error text-[12px] mt-1 m-0">
        {error?.message || gerror?.message}
      </p>
    );
  }

  if (token) {
    navigate("/home");
  }

  return (
    <div className="hero min-h-[80vh]">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body pt-4">
          <h2 className="text-center text-2xl pb-3">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  Name input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "*this field is required",
                  },
                })}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
              {/* Name field ERRORS */}
              {
                <label className="label pb-0 pt-[4px]">
                  {errors.name?.type === "required" && (
                    <span className="text-[12px] text-red-600">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              }
            </div>
            {/* Email input */}
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "*this field is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                    message: "*invalid email",
                  },
                })}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
              {/* Email field ERRORS */}
              {
                <label className="label pt-[4px] pb-0">
                  {errors.email?.type === "required" && (
                    <span className="text-[12px] text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="text-[12px] text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              }
            </div>
            {/* Password INPUT */}
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "*this field is required",
                  },
                  minLength: {
                    value: 6,
                    message: "*at least six characters here",
                  },
                })}
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              {/* Password field ERRORS */}
              {
                <label className="label pt-[4px] pb-0">
                  {errors.password?.type === "required" && (
                    <span className="text-[12px] text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-[12px] text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              }
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            {errorElement && errorElement}
            <div className="form-control mt-4">
              <button className="btn btn-primary">Register</button>
            </div>
            <label className="label pb-0">
              <Link className="text-[12px] text-secondary " to={"/login"}>
                Have account?
              </Link>
            </label>
          </form>
          <div className="divider my-0 ">or</div>
          <div className="form-control mt-2">
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline btn-primary"
            >
              <img
                className="w-[25px] h-[25px] mr-1"
                src="https://i.ibb.co/0ZbPGnh/google.png"
                alt=""
              />
              <span className="text-secondary">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
