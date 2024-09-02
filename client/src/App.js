import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AllRouter from "./components/AllRouter";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
