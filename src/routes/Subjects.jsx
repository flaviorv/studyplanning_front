import {React, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const Subjects = () => {
    
    const {id} = useParams();
    
    const [subject, setSubject] = useState([]);
    
    const getSubjects = async(courseId) => {
        const response = await axios({
            method: "post",
            url: "http://localhost:8080/course",
            data: {courseId}
        })
        const data = response.data;
        setSubject(data);
    }

    useEffect(() => { 
        getSubjects(1)
    },[])
    
    
    return(
        <div>
            <h1>Curso</h1>
            <h2>Matérias</h2>
            <div>
                {subject.map((subject)=>
                <li className="subject" key={subject.id}>
                    {subject.name}
                </li>)
                }
                
                

            </div>
        </div>
    )
} 

export default Subjects;