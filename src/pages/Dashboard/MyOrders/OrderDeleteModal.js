import React from "react";

const OrderDeleteModal = ({ orderForDelete, setOrderForDelete }) => {
  // console.log(order);

  const [order, refetch] = orderForDelete;

  return (
    <div>
      {/* <!-- The button to open modal --> */}
      <label for="order-delete-modal" class="btn modal-button">
        open modal
      </label>

      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="order-delete-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">
            Congratulations random Interner user!
          </h3>
          <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div class="modal-action">
            <label
              onClick={() => {
                setOrderForDelete(null);
                refetch();
              }}
              class="btn"
            >
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDeleteModal;
