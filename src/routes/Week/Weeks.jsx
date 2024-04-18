import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Week.css";

const Weeks = () => {
  
    const {state} = useLocation();
    const [weeks, setWeeks] = useState([]);
    const getAllWeeks = async() => {
        try {
            const response = await axios.post("http://localhost:8080/weeks", {"id": state.subject.id})
            const data = response.data;
            setWeeks(data);
            for (let d of data){
               startSessionTime(d)
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const startSessionTime = async(_week) => {
        try {
            const response = await axios.put("http://localhost:8080/startsessiontime", _week)
        } catch (error) {
            console.log(error);
        }   
    }
   
    useEffect(()=>{
        getAllWeeks()
        const interval = setInterval(() => {
            getAllWeeks();
        }, 500);
        return () => clearInterval(interval);
    },[])
      

    return (
    <div className="General">
        <Navbar/>
        <h1>{state.subject.name}</h1>
        {weeks.length === 0 ? 
        <div>
            <h3>Iniciar Nova Semana de Estudos</h3>
            <Link to="/newweek" state={{"subject": state.subject, "student": state.student, "course": state.course}}><button>Iniciar</button></Link>
            <p id="NotWeekP">Não há nenhuma semana de estudos.</p> 
        </div>:
        weeks[weeks.length -1].ended === false? 
        <div>
            <h3>Retomar Semana de Estudos</h3>
            <Link className="General" to="/currentweek" state={{"subject": state.subject, "week": weeks[weeks.length -1], "student": state.student, "course": state.course}}> <button>Retomar</button></Link>
        </div>:
        <div>
            <h3>Iniciar Nova Semana de Estudos</h3>
            <Link to="/newweek" state={{"subject": state.subject, "student": state.student, "course": state.course}}><button>Iniciar</button></Link>
        </div>
        }
        {weeks.map((week) => 
            <Link to="/currentweek" state={{"week": week, "student": state.student, "course": state.course, "subject": state.subject, "startSessionTime": week.startSessionTime }} className="Weeks" key={week.id}>
                <span>Semana {week.id}</span>
                <span> Início: {week.startDay}</span>
                <span> Status: {week.ended? <span>Encerrada</span>: <span>Ativa</span>}</span>
            </Link>
                 
        )}
    </div>
    )
}
export default Weeks;