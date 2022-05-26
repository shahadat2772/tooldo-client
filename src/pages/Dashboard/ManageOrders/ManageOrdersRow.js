import React, { useContext } from "react";
import { orderDeleteContext } from "../Dashboard/Dashboard";
const ManageOrdersRow = ({ order, refetch, index }) => {
  const { orderForDelete, setOrderForDelete } = useContext(orderDeleteContext);

  const { itemName, email, status, price, totalPrice, paid } = order;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{itemName}</td>
      <td>{email}</td>
      <td>${totalPrice}</td>
      <td>
        {!paid && (
          <div>
            <button className="btn btn-xs btn-primary">Shipped</button>
          </div>
        )}
        {paid && (
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
