import { useEffect, useState } from "react";

const useUserInfo = (email) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    if (email) {
      fetch(`https://desolate-cove-12893.herokuapp.com/user/${email}`, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  }, [email]);

  return [userInfo];
};

export default useUserInfo;
