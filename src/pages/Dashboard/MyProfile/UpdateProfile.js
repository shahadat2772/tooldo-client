import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import toast from "react-hot-toast";
const UpdateProfile = () => {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");

  const [userInfo, setUserInfo] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
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

  // Img hosting key
  const imageStorageKey = `1ada22c843bec539f6c33ffc5484c2a5`;

  // Handling form submit
  const onSubmit = async (data) => {
    toast.loading("Please wait.", {
      id: "userInfoLoading",
    });
    const name = document.getElementById("nameField").value;
    const email = document.getElementById("emailField").value;
    const education = data.education;
    const address = data.address;
    const phone = data.phone;
    const linkedIn = data.linkedIn;
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

            fetch(`http://localhost:5000/updateProfileInfo/${_id}`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${window.localStorage.getItem(
                  "accessToken"
                )}`,
              },
              body: JSON.stringify({ updatedInfo }),
            })
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

      fetch(`http://localhost:5000/updateProfileInfo/${_id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ updatedInfo }),
      })
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
    <div className="md:p-6">
      <div className="usersInfoContainer">
        <div class="card md:w-[650px] bg-base-100 shadow mx-auto pb-4">
          {/* CONTENT */}
          <h2 className="text-center py-4 text-xl">Update Profile</h2>
          <form
            className="md:w-[450px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/*  Name input */}
            <div class="form-control">
              <label class="label pb-[2px]">
                <span class="label-text">Name</span>
              </label>
              <input
                id="nameField"
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
                id="emailField"
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

            {/* Number input */}
            <div class="form-control">
              <label class="label py-[2px] ">
                <span class="label-text">Phone</span>
              </label>
              <input
                {...register("phone")}
                defaultValue={phone}
                type="text"
                placeholder="Phone"
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
                {...register("file")}
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
