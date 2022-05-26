import React from "react";
import toast from "react-hot-toast";

const OrderDeleteModal = ({ orderForDelete, setOrderForDelete }) => {
  const [order, refetch] = orderForDelete;

  const handleDelete = (order) => {
    fetch(`https://desolate-cove-12893.herokuapp.com/delete`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ order }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          refetch();
          setOrderForDelete(null);
        } else {
          toast.error("Something went wrong.");
        }
      });
  };

  return (
    <div>
      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="order-delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">WARNING!</h3>
          <p className="py-4">You wanna delete {order.itemName} from orders?</p>
          <div className="modal-action">
            <button
              onClick={() => setOrderForDelete(null)}
              className="btn btn-primary"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(order)}
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

export default OrderDeleteModal;
