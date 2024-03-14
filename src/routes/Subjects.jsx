import {React} from "react";

import {useLocation} from "react-router-dom";

const Subjects = () => {
    const {state} = useLocation();
    // const [subject, setSubject] = useState([]);
    // const getSubjects = async() => {
    //     const response = await axios.post("http://localhost:8080/subjects", 
    //         data={
    //             "id": state.courseId,
    //             "name": state.courseName
    //         }
    //     )
    //     const data = response.data;
    //     setSubject(data);
    // }

    // useEffect(() => { 
    //     getSubjects()
    // },[])
    
    
    return(
        <div>
            <h1>Curso</h1>
            
            <div>
                <p>{state.courseName}</p>
    
            </div>
            <h2>Matérias TODO</h2>
        </div>
    )
} 

export default Subjects;