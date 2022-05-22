import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUserGroup,
  faMoneyBill1Wave,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const Summary = () => {
  return (
    <section
      style={{
        backgroundImage: `url('https://i.ibb.co/DDp1zbq/Untitled-2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
      className=" rounded-[8px]"
    >
      {/* Section content */}

      <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-items-center gap-5 py-10 px-12">
        <div className="repuInfo flex items-center w-[280px] gap-3">
          <h2 className="text-white text-4xl text-center">
            Heading to a better tomorrow.
          </h2>
        </div>
        <div className="repuInfo flex items-center w-[250px] gap-3">
          <FontAwesomeIcon
            className="text-white text-[52px]"
            icon={faUserGroup}
          />
          <div className="subInfo text-white">
            <p className="text-3xl">100%</p>
            <p>Customer Satisfaction</p>
          </div>
        </div>
        <div className="repuInfo flex items-center w-[250px] gap-3">
          <FontAwesomeIcon
            className="text-white text-[52px]"
            icon={faMoneyBill1Wave}
          />
          <div className="subInfo text-white">
            <p className="text-3xl">$850,000</p>
            <p>Annual revenue</p>
          </div>
        </div>
        <div className="repuInfo flex items-center w-[250px] gap-3">
          <FontAwesomeIcon className="text-white text-[52px]" icon={faGlobe} />
          <div className="subInfo text-white">
            <p className="text-3xl">87+</p>
            <p>Countries served</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
