import React, { useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const CheckoutForm = ({ order }) => {
  const [confirmed, setConfirmed] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // Storing the client secret
  const [clientSecret, setClientSecret] = useState("");

  const [cardError, setCardError] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const totalPrice = order?.totalPrice;

  useEffect(() => {
    if (totalPrice) {
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ totalPrice }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        });
    }
  }, [totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    toast.loading("Please wait.", {
      id: "waitingToast",
    });

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");

    const name = order?.name;
    const email = order?.email;

    const { paymentIntent, error: intentErr } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      }
    );

    if (intentErr) {
      toast.dismiss("waitingToast");
      setCardError(intentErr?.message);
      setConfirmed("");
    } else {
      toast.dismiss("waitingToast");
      card.clear();
      setCardError("");
      setTransactionId(paymentIntent.id);
      setConfirmed("We have received your payment.");

      //   UPDATING PAYMENT INFO
      const info = {
        transactionId: paymentIntent.id,
        id: order._id,
      };

      fetch("http://localhost:5000/confirmOrder", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ info }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-xs mt-3 "
          type="submit"
          disabled={!stripe || !clientSecret || confirmed}
        >
          Pay
        </button>
      </form>
      <p className="text-xs text-red-500 mt-1 ml-1">{cardError && cardError}</p>
      <p className="text-xs text-green-500 mt-2 ml-1">
        {confirmed && confirmed}
      </p>
      <p className="text-sm text-orange-400  ml-1">
        {transactionId && <span>Transaction id: {transactionId}</span>}
      </p>
    </div>
  );
};

export default CheckoutForm;
