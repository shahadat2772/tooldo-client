import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { email } = useParams();

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/user/${email}`, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  }, [email]);

  const {
    name,
    email: userEmail,
    education,
    address,
    phone,
    linkedIn,
    _id,
    image,
  } = userInfo;

  // Handling form submit
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="p-6">
      <div className="usersInfoContainer">
        <div class="card w-[650px] bg-base-100 shadow mx-auto pb-4">
          {/* CONTENT */}
          <h2 className="text-center py-4 text-xl">Update Profile</h2>
          <form className="w-[450px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
            {/*  Name input */}
            <div class="form-control">
              <label class="label pb-[2px]">
                <span class="label-text">Name</span>
              </label>
              <input
                {...register("name")}
                required
                defaultValue={name}
                type="text"
                placeholder="Name"
                class="input input-bordered"
              />
            </div>
            {/* Email input */}
            <div class="form-control">
              <label class="label py-[2px] ">
                <span class="label-text">Email</span>
              </label>
              <input
                {...register("email")}
                defaultValue={userEmail}
                disabled
                type="email"
                placeholder="email"
                class="input input-bordered"
              />
            </div>

            {/* Education input */}
            <div class="form-control">
              <label class="label py-[2px] ">
                <span class="label-text">Education</span>
              </label>
              <input
                {...register("education")}
                defaultValue={education}
                type="text"
                placeholder="Education"
                class="input input-bordered"
              />
            </div>

            {/* Address input */}
            <div class="form-control">
              <label class="label py-[2px] ">
                <span class="label-text">Address</span>
              </label>
              <input
                {...register("address")}
                defaultValue={address}
                type="text"
                placeholder="city/district"
                class="input input-bordered"
              />
            </div>

            {/* Linkdin input */}
            <div class="form-control">
              <label class="label py-[2px] ">
                <span class="label-text">LinkedIn</span>
              </label>
              <input
                {...register("linkedIn")}
                defaultValue={linkedIn}
                type="text"
                placeholder="LinkedIn profile link"
                class="input input-bordered"
              />
            </div>

            {/* File input */}
            <div class="form-control">
              <label class="label py-[2px] ">
                <span class="label-text">Profile Photo</span>
              </label>
              <input
                {...register("image")}
                type="file"
                placeholder="LinkedIn profile link"
                class="input input-bordered"
              />
            </div>

            <div class="mr-auto mt-4">
              <button class=" btn btn-primary px-8">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
