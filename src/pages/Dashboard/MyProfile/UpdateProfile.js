import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import toast from "react-hot-toast";
import useUserInfo from "../../../hooks/useUserInfo";
const UpdateProfile = () => {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");

  // const [userInfo, setUserInfo] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { email } = useParams();

  const [userInfo] = useUserInfo(email);

  // useEffect(() => {
  //   if (email) {
  //     fetch(`https://desolate-cove-12893.herokuapp.com/user/${email}`, {
  //       headers: {
  //         authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setUserInfo(data));
  //   }
  // }, [email]);

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

  // Img hosting key
  const imageStorageKey = `1ada22c843bec539f6c33ffc5484c2a5`;

  // Handling form submit
  const onSubmit = async (data) => {
    toast.loading("Please wait.", {
      id: "userInfoLoading",
    });
    const name = document.getElementById("nameField").value;
    const email = document.getElementById("emailField").value;
    const education = document.getElementById("educationInput").value;
    const address = document.getElementById("addressInput").value;
    const phone = document.getElementById("phoneInput").value;
    const linkedIn = document.getElementById("linkedinInput").value;

    const file = data.file[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            const uploadedImgUrl = result.data.url;

            const updatedInfo = {
              name,
              email,
              education,
              address,
              phone,
              linkedIn,
              image: uploadedImgUrl,
            };

            fetch(
              `https://desolate-cove-12893.herokuapp.com/updateProfileInfo/${_id}`,
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  authorization: `Bearer ${window.localStorage.getItem(
                    "accessToken"
                  )}`,
                },
                body: JSON.stringify({ updatedInfo }),
              }
            )
              .then((res) => res.json())
              .then((updated) => {
                if (updated.modifiedCount) {
                  toast.dismiss("userInfoLoading");
                  toast.success("Info updated successfully.");
                  navigate("/dashboard/myProfile");
                } else {
                  toast.error("Doh, something terrible happened.");
                  toast.dismiss("userInfoLoading");
                }
                toast.dismiss("userInfoLoading");
              });
          }
        });
    } else {
      const updatedInfo = {
        name,
        email,
        education,
        address,
        phone,
        linkedIn,
        image: image || "",
      };

      fetch(
        `https://desolate-cove-12893.herokuapp.com/updateProfileInfo/${_id}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
          body: JSON.stringify({ updatedInfo }),
        }
      )
        .then((res) => res.json())
        .then((updated) => {
          if (updated.modifiedCount) {
            toast.dismiss("userInfoLoading");
            toast.success("Info updated successfully.");
            navigate("/dashboard/myProfile");
          } else {
            toast.error("Doh, something terrible happened.");
          }
        });
    }
  };

  return (
    <div className="md:p-6 h-[100vh] hero">
      <div className="usersInfoContainer">
        <div className="card md:w-[650px] bg-base-100 md:shadow p-2 mx-auto pb-4">
          {/* CONTENT */}
          <h2 className="text-center py-4 text-xl">Update Profile</h2>
          <form
            className="md:w-[450px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/*  Name input */}
            <div className="form-control">
              <label className="label pb-[2px]">
                <span className="label-text">Name</span>
              </label>
              <input
                id="nameField"
                required
                defaultValue={name}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            {/* Email input */}
            <div className="form-control">
              <label className="label py-[2px] ">
                <span className="label-text">Email</span>
              </label>
              <input
                id="emailField"
                defaultValue={userEmail}
                disabled
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>

            {/* Education input */}
            <div className="form-control">
              <label className="label py-[2px] ">
                <span className="label-text">Education</span>
              </label>
              <input
                id="educationInput"
                defaultValue={education}
                type="text"
                placeholder="Education"
                className="input input-bordered"
              />
            </div>

            {/* Address input */}
            <div className="form-control">
              <label className="label py-[2px] ">
                <span className="label-text">Address</span>
              </label>
              <input
                id="addressInput"
                defaultValue={address}
                type="text"
                placeholder="city/district"
                className="input input-bordered"
              />
            </div>

            {/* Number input */}
            <div className="form-control">
              <label className="label py-[2px] ">
                <span className="label-text">Phone</span>
              </label>
              <input
                id="phoneInput"
                defaultValue={phone}
                type="text"
                placeholder="Phone"
                className="input input-bordered"
              />
            </div>
            {/* Linkdin input */}
            <div className="form-control">
              <label className="label py-[2px] ">
                <span className="label-text">LinkedIn</span>
              </label>
              <input
                id="linkedinInput"
                defaultValue={linkedIn}
                type="text"
                placeholder="LinkedIn profile link"
                className="input input-bordered"
              />
            </div>

            {/* File input */}
            <div className="form-control">
              <label className="label py-[2px] ">
                <span className="label-text">Profile Photo</span>
              </label>
              <input
                {...register("file")}
                type="file"
                placeholder="LinkedIn profile link"
                className="input input-bordered"
              />
            </div>

            <div className="mr-auto mt-4">
              <button className=" btn btn-primary px-8">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
