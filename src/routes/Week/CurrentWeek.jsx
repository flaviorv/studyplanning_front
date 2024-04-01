import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const CurrentWeek = () => {
    const navigate = useNavigate(); 
    const {state} = useLocation();
    const [goals, setGoals] = useState([]);
    const [week, setWeek] = useState([]);
    const [feedback, setFeedback] = useState([]);
    // console.log(goals)
    const checkEnded = async() => { 
        const response = await axios.post("http://localhost:8080/generatefeedback", state.week)
        const data = response;
        setFeedback(data.data)
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
        getAllGoals();
        alert("Meta alterada para " + message)
        // document.location.reload()
    }

 
    const getAllGoals = async() => {
        try {
            const response = await axios.post("http://localhost:8080/studygoals", {"id": state.week.id})
            const data = response;
            // console.log("==================", JSON.stringify(data))
            setGoals(data.data);
        } catch (error) {
            // console.log(error);
        }
    }

    const updateGoal = async(studyGoal) => {
        try {
            const response = await axios.put("http://localhost:8080/updatestudygoal", studyGoal)
            const data = response.data;
            
            
        } catch (error) {
            // console.log(error);
        }
    }

    const calculateStudyTime = async() => {
        
        try {
            const response = await axios.put("http://localhost:8080/calculatestudytime", week)
            const data = response.data;
            // console.log(JSON.stringify(data));
            setWeek(data);
        } catch (error) {
            // console.log(error);
        }
    }

    

    const getWeek = async() => {
        try {
            const response = await axios.post("http://localhost:8080/weekbyid", {"id": state.week.id})
            const data = response.data;
            setWeek(data);
        } catch (error) {
            // console.log(error);
        }
    }
    
    useEffect(() => {
        checkEnded()
        getWeek()
        getAllGoals()
       
    },[goals])
   
    //  setInterval(() => {
    //         if(week.ended == false){
                
    //             // calculateStudyTime();
    //             console.log(week.ended)
    //             console.log("faslkdfkasdj")
    //     }}, 1000);   

    return (        

    <div className="General">
        current week - {state.week.id}
        <h1>Metas da semana {state.week.id} - ended = {JSON.stringify(week.ended)}</h1>
        {week.ended === true
        ?
            <div>
                
                Semana encerrada
                <h3>{feedback}</h3>

            </div>
            
        
           
        : 
            <Link to="/newgoal" state={{"week": state.week}}><button>Cadastrar Meta</button></Link>
        }
        {goals.length === 0 
        ? 
        week.ended?
            <div>
                <p>Semana Encerrada</p> 
            </div>:
            <div>
                <p>Nenhuma meta por enquanto</p> 
            </div>
        :  
            goals?.map((goal) => 
               {return(<td key={goal.id} className="Goals" >
                    <form   onClick={handleSubmit(onSubmit)}>
                        <button type="button" onClick={() => {
                            setValue("id", goal.id)
                            setValue("description", goal.description)
                            setValue("done", goal.done)
                            setValue("week", goal.week.id)
                        }}>{
                            goal.done === true 
                            ? 
                                <input id="done" type="checkbox"
                                checked={true}  />
                            : 
                                <input id="done" type="checkbox"    checked={false}  />
                            }{goal.description}
                        </button>
                    </form> 
                </td>    )}   
            )
        }
            
          
    </div>
    )

}
export default CurrentWeek;