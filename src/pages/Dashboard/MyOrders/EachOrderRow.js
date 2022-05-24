import React, { useContext } from "react";
import { orderDeleteContext } from "../Dashboard/Dashboard";
const EachOrderRow = ({ refetch, index, order }) => {
  const { orderForDelete, setOrderForDelete } = useContext(orderDeleteContext);

  const { name, itemName, quantity, price, email, _id, paid } = order;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{itemName}</td>
      <td>{quantity}pcs</td>
      <td>${parseInt(price) * parseInt(quantity)}</td>
      <td>{email}</td>
      <td>
        <div>
          {!paid && (
            <div>
              <button className="btn btn-xs btn-success">PAY</button>
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
