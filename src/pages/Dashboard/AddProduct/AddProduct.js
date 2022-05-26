import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  // FORM hook
  const { register, handleSubmit, watch, reset } = useForm();

  //  IMG KEY
  const imageStorageKey = `1ada22c843bec539f6c33ffc5484c2a5`;
  const onSubmit = async (data) => {
    toast.loading("Please wait.", {
      id: "productAddingToast",
    });
    const { name, price, minimumOrderQuant, availableQuant, description } =
      data;

    // Saving the imag to imgBB
    const file = data.file[0];
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const image = result.data.url;

          const product = {
            name,
            image,
            description,
            minimumOrderQuant,
            availableQuant,
            price,
          };

          fetch(`http://localhost:5000/addProduct`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
            body: JSON.stringify({ product }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.insertedId) {
                reset();
                toast.dismiss("productAddingToast");
                toast.success("Product added successfully.");
              } else {
                toast.error("Doh, something terrible happened.");
              }
            });
        }
      });
  };
  return (
    <div className="py-6">
      <div className="reviewForm">
        <div className="card w-80 md:w-[550px] shadow mx-auto bg-base-100">
          <h2 className="ml-1 text-2xl text-center pt-4 pb-3">ADD A PRODUCT</h2>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name INPUT */}
              <div className="form-control">
                <input
                  required
                  {...register("name")}
                  type="text"
                  placeholder="Product Name"
                  className="input input-bordered mb-2"
                />
              </div>
              {/* Available  quant */}
              <div className="form-control">
                <input
                  required
                  {...register("availableQuant")}
                  type="number"
                  placeholder="Available Quant"
                  className="input input-bordered mb-2"
                />
              </div>
              {/* Minimum order quant */}
              <div className="form-control">
                <input
                  required
                  {...register("minimumOrderQuant")}
                  type="number"
                  placeholder="Minimum Order Quant"
                  className="input input-bordered mb-2"
                />
              </div>
              {/* Price */}
              <div className="form-control">
                <input
                  required
                  {...register("price")}
                  type="number"
                  placeholder="Price/Unit"
                  className="input input-bordered mb-2"
                />
              </div>

              {/* Description text */}
              <div className="form-control">
                <textarea
                  required
                  {...register("description")}
                  type="text"
                  placeholder="Description"
                  className="input input-bordered h-[80px] mb-2"
                />
              </div>
              {/* Photo input */}
              <div className="form-control">
                <label className="label py-[2px] ">
                  <span className="label-text">Product Photo</span>
                </label>
                <input
                  required
                  {...register("file")}
                  type="file"
                  placeholder="LinkedIn profile link"
                  className="input input-bordered"
                />
              </div>

              <div className=" mt-3">
                <button className="btn btn-primary">ADD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
