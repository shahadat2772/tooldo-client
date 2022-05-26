import React from "react";
import { useQuery } from "react-query";
import EachReviews from "./EachReviews";
import Loading from "../../Shared/Loading/Loading";

const Reviews = () => {
  const { data: reviews, isLoading } = useQuery("reviews", () =>
    fetch("http://localhost:5000/review").then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="my-20">
      <h2 style={{ fontFamily: "Oswald" }} className="text-3xl text-center">
        REVIEWS
      </h2>
      <div className="reviewsContainer grid grid-cols-1 md:grid-cols-3 justify-items-center max-w-6xl gap-y-8 gap-x-6 mx-auto mt-10">
        {reviews?.map((review) => (
          <EachReviews key={review._id} review={review}></EachReviews>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
