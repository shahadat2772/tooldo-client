import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (user) {
      const userEmail = user?.user?.email;
      const userInfo = { email: userEmail };
      console.log(user);
      fetch("http://localhost:5000/token", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userInfo }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.accessToken) {
            setToken(result.accessToken);
            window.localStorage.setItem("accessToken", result.accessToken);
          }
        });
    }
  }, [user]);

  return [token];
};

export default useToken;
