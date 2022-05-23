import { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (user) {
      const email = user?.email;

      fetch("http://localhost:5000/isAdmin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [user]);
};
export default useAdmin;
