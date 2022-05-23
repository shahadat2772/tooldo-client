import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";

import { useNavigate } from "react-router-dom";

const OurTeam = () => {
  const navigate = useNavigate();

  const { data: members, isLoading } = useQuery("members", () =>
    fetch("http://localhost:5000/teamMember", {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="px-4 pt-10">
      <div
        style={{
          backgroundImage: `url('https://i.ibb.co/NrmSYB5/bgfor-Our-Team.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bannerImage  rounded relative  "
      >
        <div className="bannerContent">
          <h2
            style={{ fontFamily: "Oswald" }}
            className="text-3xl text-white text-center pt-8"
          >
            OUR TEAM
          </h2>
          <div className="teamMembers grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto justify-items-center py-8">
            {/* Each teammember */}

            {members?.map((member, index) => (
              <div key={index} class="card-compact w-60 hover:bg-naturel-300">
                <img src={member.img} alt="member" />
                <div class="card-body text-white">
                  <h2
                    onClick={() => navigate(`/member/${member._id}`)}
                    style={{ fontFamily: "Oswald" }}
                    class="card-title text-[24px] cursor-pointer hover:text-secondary"
                  >
                    {member.name}
                  </h2>
                  <p className="cursor-pointer text-secondary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
