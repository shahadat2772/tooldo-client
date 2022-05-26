import React, { useContext } from "react";
import { orderDeleteContext } from "../Dashboard/Dashboard";
const ManageProductRow = ({ product, refetch, index }) => {
  const { productForDelete, setProductForDelete } =
    useContext(orderDeleteContext);

  const { name, availableQuant, price } = product;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>{availableQuant}pcs</td>
      <td>${price}</td>
      <td>
        <label
          onClick={() => setProductForDelete([product, refetch])}
          className="btn btn-warning btn-xs"
          htmlFor="product-delete-modal"
        >
          DEL
        </label>
      </td>
    </tr>
  );
};

export default ManageProductRow;
