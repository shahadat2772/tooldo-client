import React from "react";
import { useForm } from "react-hook-form";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";

const Register = () => {
  // FORM hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);

  // Handling form submit
  const onSubmit = (data) => {
    console.log(data);
    const name = data.name;
    const email = data.email;
    const password = data.password;
  };

  if (gloading) {
    return <Loading></Loading>;
  }

  let errorElement;
  if (gerror) {
    errorElement = (
      <p className="text-error text-[12px] mt-1 m-0">{gerror?.message}</p>
    );
  }

  return (
    <div className="hero min-h-[80vh]">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
        <div class="card-body pt-4">
          <h2 className="text-center text-2xl pb-3">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  Name input */}
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "*this field is required",
                  },
                })}
                type="text"
                placeholder="email"
                class="input input-bordered"
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
            <div class="form-control">
              <label class="label pt-0">
                <span class="label-text">Email</span>
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
                class="input input-bordered"
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
            <div class="form-control">
              <label class="label pt-0">
                <span class="label-text">Password</span>
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
                class="input input-bordered"
              />
              {/* Email field ERRORS */}
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
              {/* <label class="label">
                <a href="#" class="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            {errorElement && errorElement}
            <div class="form-control mt-4">
              <button class="btn btn-primary">Register</button>
            </div>
          </form>
          <div className="divider my-0 mt-1">or</div>
          <div class="form-control mt-2">
            <button
              onClick={() => signInWithGoogle()}
              class="btn btn-outline btn-primary"
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
