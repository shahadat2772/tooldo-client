import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.init";
import { signOut } from "firebase/auth";
import Loading from "../../Shared/Loading/Loading";
const Navbar = () => {
  // Navigator
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user?.email) {
      const email = user?.email;
      fetch(`https://desolate-cove-12893.herokuapp.com/user/${email}`, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  }, [user]);

  console.log(userInfo);

  const navLinks = (
    <>
      <li>
        <Link to={"/home"}>Home</Link>
      </li>
      <li>
        <Link to={"/myPortfolio"}>Portfolio</Link>
      </li>
      <li>
        <Link to={"/blogs"}>Blogs</Link>
      </li>
      {/* ONLY USERS ROUTE */}
      {user && (
        <>
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
        </>
      )}

      {user ? (
        <li
          onClick={() => {
            window.localStorage.removeItem("accessToken");
            signOut(auth);
          }}
        >
          <a className="flex gap-1">
            <p>logout</p>
          </a>
        </li>
      ) : (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      )}
      {user && (
        <li>
          <a href="">
            <div
              onClick={() => navigate("/dashboard/myProfile")}
              className="flex items-center"
            >
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img
                    alt=""
                    src={
                      (user?.photoURL && user.photoURL) ||
                      (userInfo?.image && userInfo.image) ||
                      "https://i.ibb.co/bbgcz6S/avatar.jpg"
                    }
                  />
                </div>
              </div>
            </div>
          </a>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar py-3 h-[80px] bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          className="btn btn-ghost normal-case font-medium font-b text-2xl "
          to={"/home"}
        >
          TOOL<span className="text-secondary ">DO</span>
        </Link>
      </div>
      <label
        htmlFor="dashboard-drawer"
        className="ml-auto btn btn-ghost drawer-button lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{navLinks}</ul>
      </div>
    </div>
  );
};

export default Navbar;
