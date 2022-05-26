import React from "react";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import EachOrderRow from "./EachOrderRow";
import { useNavigate } from "react-router-dom";
const MyOrders = () => {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  const email = user?.email;

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["ordersById", email], () =>
    fetch(`http://localhost:5000/orders/${email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      <h2 className="ml-1 text-2xl">Your Orders</h2>

      <div className="orders mt-4">
        <div class="overflow-x-auto">
          <table class="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <EachOrderRow
                  key={order._id}
                  refetch={refetch}
                  index={index}
                  order={order}
                ></EachOrderRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
