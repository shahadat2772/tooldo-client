import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import EachItem from "./EachItem";

const Items = () => {
  const { data: items, isLoading } = useQuery("items", () =>
    fetch("https://desolate-cove-12893.herokuapp.com/items").then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section id="services" className="my-16">
      <h2
        style={{ fontFamily: "Oswald" }}
        className="md:text-3xl text-2xl text-center font-medium mb-16"
      >
        TOOLS WE MAKE
      </h2>
      <div className="itemsContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-8 gap-x-6 max-w-6xl mx-auto">
        {/* Items */}
        {items?.slice(0, 6).map((item) => (
          <EachItem key={items._id} item={item}></EachItem>
        ))}
      </div>
    </section>
  );
};

export default Items;
