import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

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
      <h2>Pay for {order?.itemName}</h2>
    </div>
  );
};

export default Payment;
