import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "../../../firebase.init";
import useUserInfo from "../../../hooks/useUserInfo";
import Loading from "../../Shared/Loading/Loading";

const AddReview = () => {
  const [user, loading] = useAuthState(auth);

  // FORM hook
  const { register, handleSubmit, watch, reset } = useForm();

  const userEmail = user?.email;

  const [userInfo] = useUserInfo(userEmail);

  if (loading) {
    return <Loading></Loading>;
  }

  const name = user.displayName;
  const email = user.email;
  const image = user.photoURL || userInfo.image;

  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  const today = `${d}/${m}/${y}`;

  const onSubmit = async (data) => {
    const reviewText = data.review;
    const country = data.country;
    const ratings = data.ratings;

    const review = {
      review: reviewText,
      country,
      ratings,
      today,
      name,
      email,
      image,
    };

    fetch("https://desolate-cove-12893.herokuapp.com/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ review }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          toast.success("Thanks, for your precious review.");
        }
      });
  };

  return (
    <div className="md:h-[100vh] h-[90vh] hero">
      <div className="reviewForm">
        <div className="card w-80 md:w-[550px] shadow mx-auto bg-base-100">
          <h2 className="ml-1 text-2xl text-center pt-4 pb-3">ADD A REVIEW</h2>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Review text */}
              <div className="form-control">
                <textarea
                  required
                  {...register("review")}
                  type="text"
                  placeholder="Your review"
                  className="input input-bordered h-[80px] mb-2"
                />
              </div>
              {/* Country INPUT */}
              <div className="form-control">
                <input
                  required
                  {...register("country")}
                  type="text"
                  placeholder="Your country"
                  className="input input-bordered mb-2"
                />
              </div>
              {/* Star INPUT */}
              <div className="form-control">
                <select
                  {...register("ratings")}
                  className="input input-bordered"
                >
                  <option value={5}>5 Star</option>
                  <option value={4}>4 Star</option>
                  <option value={3}>3 Star</option>
                  <option value={2}>2 Star</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div className=" mt-3">
                <button className="btn btn-primary">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
