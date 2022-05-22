import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import EachItem from "./EachItem";

const Items = () => {
  const { data: items, isLoading } = useQuery("items", () =>
    fetch("items.json").then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="my-16">
      <h2 className="text-3xl text-center font-medium mb-10 ">
        TOOLS WE MAKE {items.length}
      </h2>
      <div className="itemsContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-8 gap-x-6 max-w-6xl mx-auto">
        {/* Items */}
        {items?.map((item) => (
          <EachItem item={item}></EachItem>
        ))}
      </div>
    </section>
  );
};

export default Items;
