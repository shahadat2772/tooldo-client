import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";

const AddReview = () => {
  const [user, loading] = useAuthState(auth);

  // FORM hook
  const { register, handleSubmit, watch, reset } = useForm();

  if (loading) {
    return <Loading></Loading>;
  }

  const name = user.displayName;
  const email = user.email;
  const image = user.photoURL;

  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  const today = `${d}/${m}/${y}`;

  const onSubmit = async (data) => {
    console.log(data);
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

    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ review }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          reset();
          toast.success("Thanks, for your precious review.");
        }
      });
  };

  return (
    <div className="p-6">
      <div className="reviewForm">
        <div className="card w-80 md:w-[550px] shadow mx-auto bg-base-100">
          <h2 className="ml-1 text-2xl text-center pt-4 pb-3">ADD A REVIEW</h2>
          <div class="card-body p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Review text */}
              <div class="form-control">
                <textarea
                  required
                  {...register("review")}
                  type="text"
                  placeholder="Your review"
                  class="input input-bordered h-[80px] mb-2"
                />
              </div>
              {/* Country INPUT */}
              <div class="form-control">
                <input
                  required
                  {...register("country")}
                  type="text"
                  placeholder="Your country"
                  class="input input-bordered mb-2"
                />
              </div>
              {/* Star INPUT */}
              <div class="form-control">
                <select {...register("ratings")} class="input input-bordered">
                  <option value={5}>5 Star</option>
                  <option value={4}>4 Star</option>
                  <option value={3}>3 Star</option>
                  <option value={2}>2 Star</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div class=" mt-3">
                <button class="btn btn-primary">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
