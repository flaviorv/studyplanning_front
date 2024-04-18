import {useState, useEffect, React} from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import Navbar from "../../components/Navbar";

const CurrentWeek = () => {
   
    const {state} = useLocation();
    const [goals, setGoals] = useState([]);
    const [week, setWeek] = useState([]);
    const [feedback, setFeedback] = useState([]);
    
    
    const checkEnded = async() => { 
        const response = await axios.post("http://localhost:8080/generatefeedback", state.week );
        const data = response.data;
        if(week.ended){
            setFeedback(data.split(","))
        }   
    }

    const {
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            "id": "",
            "done": "",
            "description": "",
            "week": ""
        }
    });
    
    const onSubmit = (data) => {
        let message = ""
        if(data.done){
            data.done = false;
            message = '"a concluir".';
        }else{
            data.done = true;
            message = '"conluída".';
        }
        data.week = {"id": data.week};
        updateGoal(data);
        alert("Meta alterada para " + message)
    }
 
    const getAllGoals = async() => {
        try {
            const response = await axios.post("http://localhost:8080/studygoals", {"id": state.week.id})
            const data = response;
            setGoals(data.data);
        } catch (error) {
          
        }
    }

    const updateGoal = async(studyGoal) => {
        try {
            await axios.put("http://localhost:8080/updatestudygoal", studyGoal)
        } catch (error) {
            console.log(error);
        }
    }

    const calculateStudyTime = async() => {    
            try {
                const response = axios.put("http://localhost:8080/calculatestudytime", state.week)
                const data = (await response).data;
                setWeek(data)
            } catch (error) {
                console.log(error);
            }  
    }

    const getWeek = async() => {
            const response = await axios.post("http://localhost:8080/weekbyid", state.week)
            const data = response.data;
            setWeek(data)
    }
  
    useEffect(() => {
        const interval = setInterval(() => {
            checkEnded()
            getWeek()
            getAllGoals() 
            
        }, 500);
        return () => clearInterval(interval);
    }, [week]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(week.ended === false){
                calculateStudyTime()
            }
            
        }, 60000);
        return () => clearInterval(interval);
    }, [week.ended, week.studyTime]);

    return (        
        
    <div className="General">
        <Navbar/>
        
        <h1>Semana {state.week.id}</h1>
        {week.ended === true
        ?
            <div className="Feedback">
               
               <p>Status: Encerrada</p> 
                <h1>Feedback:</h1>
                <h2>{feedback[0]}</h2>
                <h3>{feedback[1]}</h3>
                <h3>{feedback[2]}</h3>
                <p>{feedback[3]}</p>
               
            </div>   
        :   
            <div>
              
                <h3>Tempo de estudo: {week.studyTime} min</h3>
             
                <Link to="/newgoal" state={{"week": state.week, "student": state.student, "course": state.course, "subject": state.subject}}><button>Cadastrar Meta</button></Link>

                {goals.length === 0
                ?
                    <div>
                        <h2>Nenhuma meta por enquanto</h2> 
                    </div>
                :
                    goals?.map((goal) => (
                        <form key={goal.id} className="Goals"  onClick={handleSubmit(onSubmit)}>
                            <lu type="" onClick={() => {
                                setValue("id", goal.id)
                                setValue("description", goal.description)
                                setValue("done", goal.done)
                                setValue("week", goal.week.id)
                            }}>
                                {
                                !goal.done 
                                ? 
                                <h1 style={{textDecoration: "none", color: "blue"}}> {goal.description} </h1>
                                : 
                                <h1 style={{textDecoration: "line-through", color: "red"}}> {goal.description} </h1>
                                } 
                            </lu>                    
                            
                        </form> 
                    ))
                }
            </div>
        }    
    </div>
    )
}
export default CurrentWeek;