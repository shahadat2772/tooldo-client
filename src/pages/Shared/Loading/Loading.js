import React from "react";

const Loading = () => {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center ">
      <progress className="progress w-40"></progress>
    </div>
  );
};

export default Loading;
