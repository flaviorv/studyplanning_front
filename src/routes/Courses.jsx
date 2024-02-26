import {React, useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Courses = () => {
   
    const [courses, setCourses] = useState([]);

    const getCourses = async() => {
        try {
            const response = await axios({method: "post", 
                url: "http://localhost:8080/courses",
                data: { 
                    "id": 2,
                    "name": "Glennasdfa Reichert",
                    "email": "Chaim_McDermott@dana.io",
                    "password": ".........."
            
                }
            });
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
                        <Link to= "/Subjects" > {course.name}</Link>
                    </li>
                    )
                )}
            </h2>
        </div>
    );
};

export default Courses;