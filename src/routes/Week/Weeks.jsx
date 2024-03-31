import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";

const Weeks = () => {
    const {state} = useLocation();
    const [weeks, setWeeks] = useState([]);
    const getAllWeeks = async() => {
        try {
            const response = await axios.post("http://localhost:8080/weeks", {"id": state.subject.id})
            const data = response.data;
            setWeeks(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{getAllWeeks()})

    return (
    <div className="General">
        <h1>Matéria {state.subject.name} - id {state.subject.id}</h1>
        {weeks.length === 0 ? 
        <div>
            <h3>Iniciar Nova Semana de Estudos</h3>
            <Link to="/newweek" state={{"subject": state.subject}}><button>Iniciar</button></Link>
            <p>Não há nenhuma semana concluída por enquanto.</p> 
        </div>:
        weeks[weeks.length -1].ended === false? 
        <div>
            <h3>Retomar Semana de Estudos</h3>
            <Link to="/currentweek" state={{"subject": state.subject, "week": weeks[weeks.length -1], "sessionStart": true}}><button>Retomar</button></Link>
        </div>:
        <div>
            <h3>Iniciar Nova Semana de Estudos</h3>
            <Link to="/newweek" state={{"subject": state.subject}}><button>Iniciar</button></Link>
        </div>
        }
        {weeks.map((week) => 
            <Link to="/currentweek" state={{"week": week, "sessionStart": true}} className="Weeks" key={week.id}>
                <p>Semana {week.id}</p>
                <p>Data de Início {week.startDay}</p>
                <p>Status: {week.ended? <p>encerrada</p>: <p>ativa</p>}</p>
            </Link>
                 
        )}
    </div>
    )
}
export default Weeks;