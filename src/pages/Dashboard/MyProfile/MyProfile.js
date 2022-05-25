import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";

const MyProfile = () => {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user) {
      const email = user?.email;

      fetch(`http://localhost:5000/user/${email}`, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  }, [user]);

  if (loading) {
    return <Loading></Loading>;
  }

  const { name, email, education, address, phone, linkedIn, _id, image } =
    userInfo;

  return (
    <div className="p-6">
      <div className="usersInfoContainer">
        <div class="card w-[650px] bg-base-100 shadow mx-auto">
          {/* <div className="text-center text-2xl py-6">Your Profile</div> */}
          <figure class="px-10 pt-4">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img
                  src={image ? image : "https://i.ibb.co/bbgcz6S/avatar.jpg"}
                  alt=""
                />
              </div>
            </div>
          </figure>
          <div class="card-body pt-4 items-center ">
            <h2 class="card-title">Hello, {name}</h2>
            <div className="usersSubInfo text-info w-96">
              <p className="py-[10px]">Email: {email}</p>
              <hr />
              <p className="py-[10px]">
                Education: {education ? education : "not found"}
              </p>
              <hr />
              <p className="py-[10px]">
                lives in: {address ? address : "not found"}
              </p>
              <hr />
              <p className="py-[10px]">Phone: {phone ? phone : "not found"}</p>
              <hr />
              <p className="py-[10px]">
                LinkedIn: {linkedIn ? linkedIn : "not found"}
              </p>
              <hr />
              <div class="card-actions">
                <button
                  onClick={() => navigate(`/dashboard/updateProfile/${email}`)}
                  class="ml-auto btn btn-primary mt-4"
                >
                  UPDATE INFO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
