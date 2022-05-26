import React, { createContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import OrderDeleteModal from "../MyOrders/OrderDeleteModal";
import useAdmin from "../../../hooks/useAdmin";

export const orderDeleteContext = createContext();

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);

  const [admin, adminLoading] = useAdmin(user);

  console.log(admin);

  const [orderForDelete, setOrderForDelete] = useState(null);

  if (loading || adminLoading) {
    return <Loading></Loading>;
  }

  // Nested menu items
  const items = (
    <>
      {/* ONLY USERS ROUTES */}
      {user && !admin && (
        <>
          <li>
            <Link to={`/dashboard/myOrders`}>My Orders</Link>
          </li>
          <li>
            <Link to={`/dashboard/addReview`}>Add A Review</Link>
          </li>
        </>
      )}

      {/* ONLY ADMIN ROUTES */}

      {user && admin && (
        <>
          <li>
            <Link to={`/dashboard/manageOrders`}>Manage Orders</Link>
          </li>
          <li>
            <Link to={`/dashboard/addProduct`}>Add Product</Link>
          </li>
          <li>
            <Link to={`/dashboard/addReview`}>Manage Products</Link>
          </li>
          <li>
            <Link to={`/dashboard/makeAdmin`}>Make Admin</Link>
          </li>
        </>
      )}
      {/* COMMON ROUTES */}
      <li>
        <Link to={`/dashboard/myProfile`}>My Profile</Link>
      </li>
    </>
  );

  return (
    <div class="drawer drawer-mobile ">
      <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <orderDeleteContext.Provider
          value={{ orderForDelete, setOrderForDelete }}
        >
          <Outlet />
        </orderDeleteContext.Provider>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {items}
        </ul>
      </div>
      {orderForDelete && (
        <OrderDeleteModal
          setOrderForDelete={setOrderForDelete}
          orderForDelete={orderForDelete}
        ></OrderDeleteModal>
      )}
    </div>
  );
};

export default Dashboard;
