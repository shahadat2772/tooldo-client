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

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
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
