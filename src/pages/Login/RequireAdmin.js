import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import useToken from "../../hooks/useToken";
import Loading from "../Shared/Loading/Loading";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [token, tokenLoading] = useToken(user);
  const [admin, adminLoading] = useAdmin(user);

  if (loading || tokenLoading || adminLoading) {
    return <Loading></Loading>;
  }

  if (!user || !token || !admin) {
    window.localStorage.removeItem("accessToken");
    signOut();
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default RequireAdmin;
