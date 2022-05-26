import React from "react";
import toast from "react-hot-toast";

const ProductDeleteModal = ({ setProductForDelete, productForDelete }) => {
  const [product, refetch] = productForDelete;

  const handleDelete = (product) => {
    fetch(`https://desolate-cove-12893.herokuapp.com/deleteItem`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ product }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          refetch();
          toast.success("Item deleted.");
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
