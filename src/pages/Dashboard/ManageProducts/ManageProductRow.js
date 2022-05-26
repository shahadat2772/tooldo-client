import React from "react";

const ManageProductRow = ({ product, refetch, index }) => {
  const { name, availableQuant, price } = product;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>{availableQuant}pcs</td>
      <td>${price}</td>
      <td>
        <button className="btn btn-warning btn-xs">DEL</button>
      </td>
    </tr>
  );
};

export default ManageProductRow;
