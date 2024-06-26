import {React, useState, useEffect } from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar";
const Courses = () => {
  
    const [courses, setCourses] = useState([]);
    const {state} = useLocation();
    
    const getCourses = async() => {
        try {
            const response = await axios.post("http://localhost:8080/courses", {"id": state.student.id});
            const data = response.data;
            setCourses(data);
        } catch (error) {
            return error;
        }
    }

    useEffect(()=>{
        getCourses()
    },[])

    return (
        <div className="General">
            <Navbar coursesPage="1"  />
            <h1>Cursos</h1>
           <img src="book_icon.png" />
           <Link to="/newcourse" state={{"student": state.student}}>Novo Curso</Link>
            <h2>
                {courses.length === 0? <a href="">Não há cursos</a>:(
                    courses.map((course) => 
                    <li className="Courses" key={course.id}>
                        <Link 
                            to="/subjects" 
                            state={{"course": course, "student": state.student}}
                            >{course.name}
                        </Link>
                    </li>
                    )
                )}
            </h2>
        </div>
    );
};

export default Courses;