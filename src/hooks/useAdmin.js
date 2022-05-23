import { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(undefined);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const email = { email: user?.email };
      fetch("http://localhost:5000/isAdmin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          const role = data?.role;
          setAdmin(role);
          setAdminLoading(false);
        });
    }

    return [admin, adminLoading];
  }, [user]);
};
export default useAdmin;
