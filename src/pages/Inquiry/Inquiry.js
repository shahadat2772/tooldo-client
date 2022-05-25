import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Inquiry = () => {
  // FORM hook
  const { register, handleSubmit, watch, reset } = useForm();

  const onSubmit = async (data) => {
    const inquiry = data;

    fetch("http://localhost:5000/addInquiry", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ inquiry }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          reset();
          toast.success("Thanks a lot! We have received your inquiry.");
        } else {
          toast.error("Doh, something terrible happened.");
        }
      });
  };
  return (
    <section className="px-4">
      <div
        style={{
          //   backgroundImage: `url('https://i.ibb.co/DzWFrjh/banner-1.jpg')`,
          backgroundImage: `url('https://i.ibb.co/KWrmnyP/newBG-1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bannerImage h-[90vh] rounded relative"
      >
        <div
          style={{
            position: "absolute",
          }}
          className="bannerContent w-[400px] left-[35%]  top-[18%] "
        >
          <h2
            style={{ fontFamily: "Oswald" }}
            className="text-2xl text-white mb-2"
          >
            INQUIRY NOW
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name INPUT */}
            <div class="form-control">
              <input
                required
                {...register("name")}
                type="text"
                placeholder="*Your Name"
                class="input input-bordered mb-2"
              />
            </div>
            {/* EMAIL INPUT */}
            <div class="form-control">
              <input
                required
                {...register("email")}
                type="text"
                placeholder="*Your Email"
                class="input input-bordered mb-2"
              />
            </div>
            {/* Country INPUT */}
            <div class="form-control">
              <input
                required
                {...register("country")}
                type="text"
                placeholder="*Your country"
                class="input input-bordered mb-2"
              />
            </div>
            {/* MESSAGE text */}
            <div class="form-control">
              <textarea
                required
                {...register("message")}
                type="text"
                placeholder="*Tell us your demand, we will contact you soon"
                class="input input-bordered h-[80px] mb-2"
              />
            </div>
            <div class="mt-1">
              <button class="btn btn-primary block ">Send Massage</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Inquiry;
