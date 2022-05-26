import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import ManageOrdersRow from "./ManageOrdersRow";

const ManageOrders = () => {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("getAllOrders", () =>
    fetch("http://localhost:5000/getOrders", {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl">Manage Orders</h2>
      <div className="ordersContainer mt-3">
        <div className="overflow-x-auto">
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
              {orders?.map((order, index) => (
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
