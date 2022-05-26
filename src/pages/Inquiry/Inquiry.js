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
          className="bannerContent w-[300px] md:w-[400px] left-[5%] md:left-[35%] top-[25%] md:top-[18%]"
        >
          <h2
            style={{ fontFamily: "Oswald" }}
            className="text-2xl text-white mb-2"
          >
            INQUIRY NOW
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name INPUT */}
            <div className="form-control">
              <input
                required
                {...register("name")}
                type="text"
                placeholder="*Your Name"
                className="input input-bordered mb-2"
              />
            </div>
            {/* EMAIL INPUT */}
            <div className="form-control">
              <input
                required
                {...register("email")}
                type="text"
                placeholder="*Your Email"
                className="input input-bordered mb-2"
              />
            </div>
            {/* Country INPUT */}
            <div className="form-control">
              <input
                required
                {...register("country")}
                type="text"
                placeholder="*Your country"
                className="input input-bordered mb-2"
              />
            </div>
            {/* MESSAGE text */}
            <div className="form-control">
              <textarea
                required
                {...register("message")}
                type="text"
                placeholder="*Tell us your demand, we will contact you soon"
                className="input input-bordered h-[80px] mb-2"
              />
            </div>
            <div className="mt-1">
              <button className="btn btn-primary block ">Send Massage</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Inquiry;
