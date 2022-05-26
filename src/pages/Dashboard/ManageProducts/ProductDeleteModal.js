import React from "react";
import toast from "react-hot-toast";

const ProductDeleteModal = ({ setProductForDelete, productForDelete }) => {
  const [product, refetch] = productForDelete;

  const handleDelete = (product) => {
    console.log(product);

    fetch(`http://localhost:5000/deleteItem`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ product }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          refetch();
          setProductForDelete(null);
        } else {
          toast.error("Something went wrong.");
        }
      });
  };

  return (
    <div>
      <input
        type="checkbox"
        id="product-delete-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">WARNING!</h3>
          <p className="py-4">You wanna delete {product.name} </p>
          <div className="modal-action">
            <button
              onClick={() => setProductForDelete(null)}
              className="btn btn-primary"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(product)}
              className="btn btn-warning"
            >
              Confirmed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDeleteModal;
