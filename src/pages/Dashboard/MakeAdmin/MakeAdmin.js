import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import EachUserRow from "./EachUserRow";

const MakeAdmin = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("allUsers", () =>
    fetch("https://desolate-cove-12893.herokuapp.com/users", {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="table w-full">
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
            {users?.map((user, index) => (
              <EachUserRow
                refetch={refetch}
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
