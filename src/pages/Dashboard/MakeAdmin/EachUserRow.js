import React from "react";

const EachUserRow = ({ user, index }) => {
  const handleMakeAdmin = (email) => {
    console.log(email);
    const userInfo = { email: email };
    console.log(userInfo);

    fetch("http://localhost:5000/makeAdmin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ userInfo }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
