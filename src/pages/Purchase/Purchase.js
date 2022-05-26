import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.init";
import toast from "react-hot-toast";

const Purchase = () => {
  const { id } = useParams();

  const [confirmed, setConfirmed] = useState(false);

  const [user, loading] = useAuthState(auth);

  // FORM hook
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { data: item, isLoading } = useQuery(["itemById", id], () =>
    fetch(`https://desolate-cove-12893.herokuapp.com/item/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  const {
    name: itemName,
    image,
    description,
    minimumOrderQuant,
    availableQuant,
    price,
    _id,
  } = item;

  const onSubmit = async (data) => {
    const name = data.name;
    const email = data.email;
    const address = data.address;
    const phone = data.phone;
    const quantity = data.quantity;

    const totalPrice = parseInt(price) * parseInt(quantity);

    const order = {
      image,
      itemName,
      quantity,
      name,
      email,
      address,
      phone,
      price,
      totalPrice,
      status: "pending",
    };

    fetch(`https://desolate-cove-12893.herokuapp.com/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ order }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setConfirmed(true);
          reset();
          toast.success(`Your order is placed successfully.`);
        } else {
          toast.error("Doh! Something terrible happened.");
        }
      });
  };

  return (
    <div className="hero min-h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 bg-base-100 shadow-xl px-6 py-6">
        <div className="m-auto w-80">
          <img className="img " src={image} alt="Album" />
        </div>
        <div className="itemInfo w-80">
          <h2 className="mb-4 text-2xl">{itemName}</h2>
          <p>{description.slice(0, 150)}</p>
          <hr />
          <p className="py-[10px]">minimumOrderQuant: {minimumOrderQuant}pcs</p>
          <hr />
          <p className="py-[10px]">availableQuant: {availableQuant}pcs</p>
          <hr />
          <p className="py-[10px]">price: ${price}/pcs</p>
        </div>
        <div className="form w-80">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  Name input */}
            <div className="form-control">
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "*this field is required",
                  },
                })}
                defaultValue={user?.displayName}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
              {/* Name field ERRORS */}
              {
                <label className="label pb-0 pt-[2px]">
                  {errors.name?.type === "required" && (
                    <span className="text-[12px] text-red-600">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              }
            </div>
            {/* Email input */}
            <div className="form-control">
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "*this field is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                    message: "*invalid email",
                  },
                })}
                defaultValue={user?.email}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
              {/* Email field ERRORS */}
              {
                <label className="label pt-[2px] pb-0">
                  {errors.email?.type === "required" && (
                    <span className="text-[12px] text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="text-[12px] text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              }
            </div>

            {/*  Address input */}
            <div className="form-control">
              <input
                {...register("address", {
                  required: {
                    value: true,
                    message: "*this field is required",
                  },
                })}
                type="text"
                placeholder="Address"
                className="input input-bordered"
              />
              {/* Address field ERRORS */}
              {
                <label className="label pb-0 pt-[2px]">
                  {errors.address?.type === "required" && (
                    <span className="text-[12px] text-red-600">
                      {errors.address.message}
                    </span>
                  )}
                </label>
              }
            </div>

            {/*  PHONE input */}
            <div className="form-control">
              <input
                {...register("phone", {
                  required: {
                    value: true,
                    message: "*this field is required",
                  },
                })}
                type="text"
                placeholder="Phone"
                className="input input-bordered"
              />
              {/* Address field ERRORS */}
              {
                <label className="label pb-0 pt-[2px]">
                  {errors.phone?.type === "required" && (
                    <span className="text-[12px] text-red-600">
                      {errors.phone.message}
                    </span>
                  )}
                </label>
              }
            </div>

            {/* Quantity field */}
            <div className="form-control">
              <input
                {...register("quantity", {
                  required: {
                    value: true,
                    message: "*this field is required",
                  },
                  min: {
                    value: minimumOrderQuant,
                    message: `*minimum order quant is ${minimumOrderQuant}`,
                  },
                  max: {
                    value: availableQuant,
                    message: `*maximum order quant is ${availableQuant}`,
                  },
                })}
                id="minQuantField"
                defaultValue={minimumOrderQuant}
                type="number"
                placeholder="Quantity"
                className="input input-bordered"
              />
              {/* QUANTITY field ERRORS */}
              {
                <label className="label pt-[2px] pb-0">
                  {errors.quantity?.type === "required" && (
                    <span className="text-[12px] text-red-600">
                      {errors.quantity.message}
                    </span>
                  )}
                  {errors.quantity?.type === "min" && (
                    <span className="text-[12px] text-red-600">
                      {errors.quantity.message}
                    </span>
                  )}
                  {errors.quantity?.type === "max" && (
                    <span className="text-[12px] text-red-600">
                      {errors.quantity.message}
                    </span>
                  )}
                </label>
              }
            </div>

            <div className="form-control mt-2">
              <button
                disabled={errors?.quantity?.message || confirmed}
                className="btn btn-primary"
              >
                PLACE ORDER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
