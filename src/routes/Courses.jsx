import {React, useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Courses = () => {
   
    const [courses, setCourses] = useState([]);
   
    const getCourses = async(_student) => {
        const student = 
            {
                "id": 1,
                
        }
        
        try {
            const response = await axios.post("http://localhost:8080/courses", student);
            const data = response.data;
            setCourses(data);
        } catch (error) {
            return error;
        }
    }

    useEffect(()=>{
        getCourses();
    },[])

    return (
        <div>
            <h1>Courses</h1>
            <h2>
                {courses.length === 0? "Cadastrar cursos":(
                    courses.map((course) => 
                    <li className="course" key={course.id}>
                        <Link 
                        to="/subjects" 
                        state={{"courseId": course.id, "courseName": course.name}}
                        >{course.name}</Link>
                    </li>
                    )
                )}
            </h2>
        </div>
    );
};

export default Courses;