import './App.css';
import Courses from './routes/Courses';
import {useNavigate} from "react-router-dom";



function App() {
  const navigate = useNavigate();
  navigate("/login");
  return (
    <div className="App">
    </div>
  );
}

export default App;
