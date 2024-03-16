import './App.css';
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from 'react';

function App() {

  const navigate = useNavigate();
  const { student } = "";


  useEffect(() => {
    if (!student) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [navigate])

  return (

    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
