import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUserGroup,
  faMoneyBill1Wave,
  faGlobe,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const EachOrderRow = ({ refetch, index, order }) => {
  const { name, itemName, quantity, price, email, _id, paid } = order;

  console.log(quantity, price);

  console.log(order);

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
              <button className="btn btn-xs btn-warning ml-1">CAL</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EachOrderRow;
