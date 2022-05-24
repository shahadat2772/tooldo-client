import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// REACT STRIPE
const stripePromise = loadStripe(
  "pk_test_51L105BIxM8sRxo2mh9agH6bogilwho5NgGj1UqtzfXtlLoaBTG4ufhc31Kem5Og0H5bfx1cfv87lGEZTNgDWGTTR007hgLkB5x"
);

const Payment = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useQuery(["gettingOrderById", id], () =>
    fetch(`http://localhost:5000/order/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      <div class="card lg:card-side bg-base-100 shadow-xl">
        {/* <div class="card w-80 bg-base-100 "> */}
        <figure>
          <img className="w-80" src={order?.image} alt="Shoes" />
        </figure>
        {/* <div class="card-body"> */}
        {/* <p className="py-[0px]">Item: {order?.itemName}</p>
            <hr />
            <p className="py-[0px]">Quant: {order?.quantity}pcs</p>
            <hr />
            <p className="py-[0px]">
              Total: ${parseInt(order?.quantity) * parseInt(order?.price)}
            </p>
            <hr />
            <p className="py-[0px]">Email: {order.email}</p>
            <hr />
            <p className="py-[0px]">Address: {order.address}</p> */}
        {/* </div> */}
        {/* </div> */}

        <div class="card-body justify-center">
          <h2 class="card-title">
            {order.name}, <br /> Confirm your order.
          </h2>
          <div className="paymentComponent">
            <div className="orderInfo mt-2">
              <p className="py-[0px]">Item: {order?.itemName}</p>
              <hr />
              <p className="py-[0px]">Quant: {order?.quantity}pcs</p>
              <hr />
              <p className="py-[0px]">
                Total: ${parseInt(order?.quantity) * parseInt(order?.price)}
              </p>
              <hr />
              <p className="py-[0px]">Email: {order.email}</p>
              <hr />
              <p className="py-[0px]">Address: {order.address}</p>
            </div>
            <div className="paymentElement mt-5">
              <Elements stripe={stripePromise}>
                <CheckoutForm order={order} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
