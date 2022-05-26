import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.init";

const MemberDetail = () => {
  const { id } = useParams();

  const { data: member, isLoading } = useQuery(["memberById", id], () =>
    fetch(`https://desolate-cove-12893.herokuapp.com/teamMember/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        window.localStorage.removeItem("accessToken");
        signOut(auth);
        return;
      } else {
        return res.json();
      }
    })
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="card mx-4 lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={member?.img} alt="Album" />
        </figure>
        <div className="card-body justify-center">
          <h2
            style={{ fontFamily: "Oswald" }}
            className="card-title text-[40px]"
          >
            {member?.name}
            <br />
          </h2>
          <div className="role mt-4">
            <p>{member?.role}</p>
          </div>
          <div className="memberInfo text-info mt-8">
            <p className="py-[10px]">born on: {member?.birth}</p>
            <hr />
            <p className="py-[10px]">email: {member?.email}</p>
            <hr />
            <p className="py-[10px]"> phone: {member?.phone}</p>
            <hr />
            <p className="py-[10px]">lives in: {member?.address}</p>
            <hr />
            <p className="py-[10px]">education: {member?.education}</p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
