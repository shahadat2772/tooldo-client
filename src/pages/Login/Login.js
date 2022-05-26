import { async } from "@firebase/util";
import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../Shared/Loading/Loading";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // FORM hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [signInWithEmailAndPassword, user, esloading, eserror] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);

  const [sendPasswordResetEmail, sending, fperror] =
    useSendPasswordResetEmail(auth);

  const from = location?.state?.from?.pathname || "/home";

  // TOKEN HOOK
  const [token] = useToken(guser || user);
  // Handling form submit
  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    await signInWithEmailAndPassword(email, password);
  };

  if (gloading || esloading) {
    return <Loading></Loading>;
  }

  let errorElement;
  if (gerror || eserror) {
    errorElement = (
      <p className="text-error text-[12px] mt-1 m-0">
        {gerror?.message || eserror?.message}
      </p>
    );
  }

  if (token) {
    navigate(from, { replace: true });
  }

  const handleForgetPass = async () => {
    const email = document.getElementById("userEmail").value;
    if (!email) {
      toast.error("Enter an email to reset password.");
    } else {
      await sendPasswordResetEmail(email);
      toast.success("Password reset email sended.");
    }
  };

  return (
    <div className="hero min-h-[80vh]">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body pt-4">
          <h2 className="text-center text-2xl pb-3">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                id="userEmail"
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
              <label onClick={handleForgetPass} className="label pb-0">
                <span className="label-text-alt link link-hover">
                  Forgot password?
                </span>
              </label>
            </div>
            {errorElement && errorElement}
            <div className="form-control mt-3">
              <button className="btn btn-primary">Login</button>
            </div>
            <label className="label pb-0">
              <Link className="text-[12px] text-secondary " to={"/register"}>
                New to dooldo?
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

export default Login;
