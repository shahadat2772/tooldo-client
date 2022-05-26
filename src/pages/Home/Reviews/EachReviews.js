import React from "react";

const EachReviews = ({ review }) => {
  return (
    <div className="card w-80 md:w-[350px] bg-base-100 shadow">
      <div className="card-body p-3">
        <h2 className="card-title gap-3">
          <div className="avatar">
            <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  review?.image
                    ? `${review?.image}`
                    : "https://i.ibb.co/bbgcz6S/avatar.jpg"
                }
                alt=""
              />
            </div>
          </div>
          <div>
            <p className="font-normal">{review.name}</p>
            <p className="font-normal text-sm">{review.country}</p>
          </div>
        </h2>
        <p>{review.review}</p>
        <p className="text-sm">Ratings: {review.ratings} of 5</p>
        <p className="ml-1 text-xs">{review.today}</p>
      </div>
    </div>
  );
};

export default EachReviews;
