import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home/Home";
import Navbar from "./pages/Shared/Navbar/Navbar";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Home></Home>
    </div>
  );
}

export default App;
