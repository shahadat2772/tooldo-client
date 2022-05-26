import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import ManageProductRow from "./ManageProductRow";

const ManageProducts = () => {
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery("getAllOrders", () =>
    fetch("https://desolate-cove-12893.herokuapp.com/items", {
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
      <h2 className="text-2xl">Manage Products</h2>
      <div className="ordersContainer mt-3">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Item Name</th>
                <th>Available Quat</th>
                <th>Price/unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row  --> */}
              {projects?.map((product, index) => (
                <ManageProductRow
                  index={index}
                  refetch={refetch}
                  key={product._id}
                  product={product}
                ></ManageProductRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
