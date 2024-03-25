import {useState, useEffect} from "react";
import axios from "axios";
import {useLocation, Link} from "react-router-dom";

const Subjects = () => {
    const {state} = useLocation();
    const [subjects, setSubjects] = useState([]);
   
    const getSubjects = async() => {
        try {
            const response = await axios.post("http://localhost:8080/subjects", 
                {"id": state.courseId}
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
        <div>
            <h3>Curso</h3>
            <h2>
                <p>curso - {state.courseName}</p>
                <p>Id estudante{state.student.id}</p>
                <p>Id Curso {state.courseId}</p>
            </h2>
            <h3>Matérias</h3>
            <a href="/registersubject">Cadastrar Matéria</a>
            <h2>
                {subjects.length === 0 ? <span>Nenhuma matéria cadastrada por enquanto.</span> : (
                    subjects.map((subject) =>
                        <li className="Subjects" key={subject.id}>
                            <Link
                                to="/weeks"
                                state={{"courseId": state.courseId, "courseName": state.CourseName, "student": state, "subjectId": subject.id, "subjectName": subject.name}}
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