import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { orderDeleteContext } from "../Dashboard/Dashboard";
const EachOrderRow = ({ refetch, index, order }) => {
  const navigate = useNavigate();

  const { orderForDelete, setOrderForDelete } = useContext(orderDeleteContext);

  const { name, itemName, quantity, price, email, _id, paid, totalPrice } =
    order;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{itemName}</td>
      <td>{quantity}pcs</td>
      <td>${totalPrice}</td>
      <td>{email}</td>
      <td>
        <div>
          {!paid && (
            <div>
              <button
                onClick={() => navigate(`/dashboard/payment/${order._id}`)}
                className="btn btn-xs btn-success"
              >
                PAY
              </button>
              <label
                onClick={() => setOrderForDelete([order, refetch])}
                className="btn btn-xs btn-warning ml-1"
                htmlFor="order-delete-modal"
              >
                CAL
              </label>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EachOrderRow;
