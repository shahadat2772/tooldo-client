import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading></Loading>;
  }

  // Nested menu items
  const items = (
    <>
      {user && (
        <>
          <li>
            <Link to={`/dashboard/myOrders`}>My Orders</Link>
          </li>
          <li>
            <Link to={`/dashboard/addReview`}>Add A Review</Link>
          </li>
          <li>
            <Link to={`/dashboard/myProfile`}>My Profile</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div class="drawer drawer-mobile ">
      <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <Outlet />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {items}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
