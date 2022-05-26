import React, { useContext } from "react";
import toast from "react-hot-toast";
import { orderDeleteContext } from "../Dashboard/Dashboard";
const ManageOrdersRow = ({ order, refetch, index }) => {
  const { orderForDelete, setOrderForDelete } = useContext(orderDeleteContext);

  const { itemName, email, status, price, totalPrice, paid, _id } = order;

  const makeApproved = (id) => {
    fetch(`http://localhost:5000/approve/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          refetch();
        } else {
          toast.error("Doh, something terrible happened!");
        }
      });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{itemName}</td>
      <td>{email}</td>
      <td>${totalPrice}</td>
      <td>
        {status === "approved" && (
          <div>
            <p className="text-secondary">APPROVED</p>
          </div>
        )}
        {paid && status === "pending" && (
          <div>
            <button
              onClick={() => makeApproved(_id)}
              className="btn btn-xs btn-primary"
            >
              Shipped
            </button>
          </div>
        )}
        {!paid && (
          <div className="flex items-center gap-2">
            <p className="text-warning">UNPAID</p>
            <label
              htmlFor="order-delete-modal"
              onClick={() => setOrderForDelete([order, refetch])}
              className="btn btn-xs btn-warning"
            >
              DEL
            </label>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ManageOrdersRow;
