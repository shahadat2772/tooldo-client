import { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState("");
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const email = { email: user?.email };

      fetch("https://desolate-cove-12893.herokuapp.com/isAdmin", {
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
  }, [user]);

  return [admin, adminLoading];
};
export default useAdmin;
