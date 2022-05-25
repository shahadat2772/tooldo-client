import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home/Home";
import Navbar from "./pages/Shared/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import MemberDetail from "./pages/Home/OurTeam/MemberDetail";
import Register from "./pages/Login/Register";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./pages/Login/RequireAuth";
import Purchase from "./pages/Purchase/Purchase";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import MyOrders from "./pages/Dashboard/MyOrders/MyOrders";
import Payment from "./pages/Dashboard/Payment/Payment";
import AddReview from "./pages/Dashboard/AddReview/AddReview";
import MyProfile from "./pages/Dashboard/MyProfile/MyProfile";
import UpdateProfile from "./pages/Dashboard/MyProfile/UpdateProfile";
import ManageOrders from "./pages/Dashboard/ManageOrders/ManageOrders";
import RequireAdmin from "./pages/Login/RequireAdmin";
import MakeAdmin from "./pages/Dashboard/MakeAdmin/MakeAdmin";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          {/* Nested Routs */}
          {/* ONLY USER ROUTES */}
          <Route
            path="/dashboard/myOrders"
            element={<MyOrders></MyOrders>}
          ></Route>
          <Route
            path="/dashboard/payment/:id"
            element={
              <RequireAuth>
                <Payment></Payment>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/dashboard/addReview"
            element={
              <RequireAuth>
                <AddReview></AddReview>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/dashboard/myProfile"
            element={
              <RequireAuth>
                <MyProfile></MyProfile>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/dashboard/updateProfile/:email"
            element={
              <RequireAuth>
                <UpdateProfile></UpdateProfile>
              </RequireAuth>
            }
          ></Route>

          {/* ONLY ADMIN ROUTS */}
          <Route
            path="/dashboard/manageOrders"
            element={
              <RequireAdmin>
                <ManageOrders></ManageOrders>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="/dashboard/makeAdmin"
            element={
              <RequireAdmin>
                <MakeAdmin></MakeAdmin>
              </RequireAdmin>
            }
          ></Route>
        </Route>
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase></Purchase>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/member/:id"
          element={
            <RequireAuth>
              <MemberDetail></MemberDetail>
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
