import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home/Home";
import Navbar from "./pages/Shared/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import MemberDetail from "./pages/Home/OurTeam/MemberDetail";
import Register from "./pages/Login/Register";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/member/:id"
          element={<MemberDetail></MemberDetail>}
        ></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </div>
  );
}

export default App;
