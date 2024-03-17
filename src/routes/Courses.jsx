import {React, useState, useEffect } from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";

const Courses = () => {
   
    const [courses, setCourses] = useState([]);
    const {state} = useLocation();
    
    const getCourses = async() => {
        try {
            const response = await axios.post("http://localhost:8080/courses", {"id": state.id});
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
        <div>
            <h1>Courses</h1>
            <h2>
                {courses.length === 0? <a href="">cadastrar curso</a>:(
                    courses.map((course) => 
                    <li className="Courses" key={course.id}>
                        <Link 
                            to="/subjects" 
                            state={{"courseId": course.id, "courseName": course.name, "student": state}}
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