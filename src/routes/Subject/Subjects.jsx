import {useState, useEffect} from "react";
import axios from "axios";
import {useLocation, Link} from "react-router-dom";

const Subjects = () => {
    const {state} = useLocation();
    const [subjects, setSubjects] = useState([]);
   
    const getSubjects = async() => {
        try {
            const response = await axios.post("http://localhost:8080/subjects", 
                {"id": state.course.id}
            )
            const data = response.data;
            setSubjects(data);
        } catch (error) {
            console.log("Erro ao listar matérias.");
        }
    }

    useEffect(()=>{ 
        getSubjects()
    })
    
    
    return(
        <div className="General">
            <h3>Curso</h3>
            <h2>
                <span>curso {state.course.name} </span>
                <span>- id estudante {} </span>
                <span>- id curso {state.course.id}</span>
            </h2>
            <h3>Matérias</h3>
            <Link to="/newsubject" state={{"course": state.course}}>
                Cadastrar Matéria</Link>
            <h2>
                {subjects.length === 0 ? <span>Nenhuma matéria cadastrada por enquanto.</span> : (
                    subjects.map((subject) =>
                        <li className="Subjects" key={subject.id}>
                            <Link
                                to="/weeks"
                                state={{"course": state.course, "student": state.student, "subject": subject}}
                            >
                                {subject.name}
                            </Link>
                        </li>
                    )
                )}
            </h2>

        </div>
    )
} 

export default Subjects;