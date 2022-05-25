import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import EachUserRow from "./EachUserRow";

const MakeAdmin = () => {
  const { data: users, isLoading } = useQuery("allUsers", () =>
    fetch("http://localhost:5000/users", {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  console.log(users);

  return (
    <div className="py-6">
      <div class="overflow-x-auto">
        <table class="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {users?.map((user, index) => (
              <EachUserRow
                index={index}
                key={user._id}
                user={user}
              ></EachUserRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;