import React from "react";
import toast from "react-hot-toast";

const EachUserRow = ({ user, index, refetch }) => {
  const handleMakeAdmin = (email) => {
    toast.loading("Please wait.", {
      id: "makeAdminToast",
    });
    const userInfo = { email: email };

    fetch("https://desolate-cove-12893.herokuapp.com/makeAdmin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ userInfo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.dismiss("makeAdminToast");
          refetch();
        }
      });
  };

  const { name, email, role, _id } = user;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{name || "not found"}</td>
      <td>{email}</td>
      <td>
        {role === "admin" || (
          <button
            onClick={() => handleMakeAdmin(email)}
            className="btn btn-primary btn-xs"
          >
            Make Admin
          </button>
        )}
        {role === "admin" && (
          <button className="btn btn-warning btn-xs">Delete Admin</button>
        )}
      </td>
    </tr>
  );
};

export default EachUserRow;
