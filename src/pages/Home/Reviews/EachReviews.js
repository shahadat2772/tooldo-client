import React from "react";

const EachReviews = ({ review }) => {
  return (
    <div class="card w-80 md:w-[350px] bg-base-100 shadow">
      <div class="card-body p-3">
        <h2 class="card-title gap-3">
          <div class="avatar">
            <div class="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://api.lorem.space/image/face?hash=3174" alt="" />
            </div>
          </div>
          <div>
            <p className="font-normal">{review.name}</p>
            <p className="font-normal text-sm">{review.country}</p>
          </div>
        </h2>
        <p>{review.text}</p>
        <p>{review.date}</p>
      </div>
    </div>
  );
};

export default EachReviews;
