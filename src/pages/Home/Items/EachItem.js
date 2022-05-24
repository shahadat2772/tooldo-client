import React from "react";
import { useNavigate } from "react-router-dom";

const EachItem = ({ item }) => {
  const navigate = useNavigate();

  const {
    name,
    image,
    description,
    minimumOrderQuant,
    availableQuant,
    price,
    _id,
  } = item;
  return (
    <div class="card card-compact w-80 md:w-[350px] bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div class="card-body">
        <h2 class="text-accent card-title font-normal">{name}</h2>
        <p className="text-accent">{description.slice(0, 100)}</p>
        <div className="infoContainer w-60 mx-auto my-1">
          <div className="infos flex w-full justify-between my-1">
            <span className="font-medium">Min Order Quant:</span>
            <span className="font-medium">{minimumOrderQuant}pcs</span>
          </div>
          <div className="infos flex w-full justify-between my-1">
            <span className="font-medium">Available Quant:</span>
            <span className="font-medium">{availableQuant}pcs</span>
          </div>
          <div className="infos flex w-full  justify-between my-1">
            <span className="font-medium">Price:</span>
            <span className="font-medium">${price}</span>
          </div>
        </div>
        <div class="card-actions justify-end">
          <button
            onClick={() => navigate(`/purchase/${_id}`)}
            class="btn btn-primary"
          >
            place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default EachItem;
