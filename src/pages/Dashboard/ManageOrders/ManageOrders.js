import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import ManageOrdersRow from "./ManageOrdersRow";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const [sortedOrders, setSortedOrders] = useState([]);

  const { data, isLoading, refetch } = useQuery("getAllOrders", () =>
    fetch("https://desolate-cove-12893.herokuapp.com/getOrders", {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  useEffect(() => {
    setSortedOrders(data);
    setOrders(data);
  }, [data]);

  const sortBy = (status) => {
    let sorted;
    if (status === "all") {
      setSortedOrders(orders);
      return;
    } else if (status === "unpaid") {
      sorted = orders.filter((order) => !order?.paid);
    } else {
      sorted = orders.filter((order) => order.status === status);
    }

    setSortedOrders(sorted);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl">Manage Orders</h2>
      <div className="ordersContainer mt-3">
        <div className="overflow-x-auto">
          {/* Sorting buttons */}
          <div class="btn-group mb-3">
            <button
              onClick={() => sortBy("pending")}
              class="btn btn-xs btn-outline"
            >
              Pending
            </button>
            <button
              onClick={() => sortBy("unpaid")}
              class="btn btn-xs btn-outline"
            >
              Unpaid
            </button>
            <button
              onClick={() => sortBy("approved")}
              class="btn btn-xs btn-outline"
            >
              Shipped
            </button>
            <button
              onClick={() => sortBy("all")}
              class="btn btn-xs btn-outline"
            >
              All
            </button>
          </div>
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Item Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row  --> */}
              {sortedOrders?.map((order, index) => (
                <ManageOrdersRow
                  index={index}
                  refetch={refetch}
                  key={order._id}
                  order={order}
                ></ManageOrdersRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
