import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const CurrentWeek = () => {
    const {state} = useLocation();
    const [goals, setGoals] = useState([]);
    const navigate = useNavigate();
  
 
    const checkEnded = async() => { 

        console.log(state.week)
        const response = await axios.post("http://localhost:8080/currentweek", state.week)
        const data = response.data;
        console.log(data)
        if(data.length > 3){
            navigate("/subjects")
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
        console.log(data.done)
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
        // window.location.reload()
       
    }

    const getAllGoals = async() => {
        try {
            const response = await axios.post("http://localhost:8080/studygoals", {"id": state.week.id})
            const data = response.data;
            setGoals(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateGoal = async(studyGoal) => {
        try {
            const response = await axios.put("http://localhost:8080/updatestudygoal", studyGoal)
            const data = response.data;
            setGoals(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getAllGoals();
    //    checkEnded();
         
    },[])

    return (        

    <div className="General">
        current week - {state.week.id}
        <h1>Metas da semana {state.week.id}</h1>
        <Link to="/newgoal" state={{"week": state.week}}><button>Cadastrar Meta</button></Link>
        {goals.length === 0 ? 
        <div>
            <p>Não há nenhuma meta por enquanto.</p> 
        </div>:

        goals.map((goal) => 
                <div className="Goals" >
                    <form  key={goal.id} onClick={handleSubmit(onSubmit)}>
                        <label htmlFor="done">{goal.done === true ? 
                            <input id="done" type="checkbox" readOnly checked={true}  />: 
                                <input id="done" type="checkbox"  readOnly checked={false}  />
                        }
                        <button type="button" onClick={() => {
                            setValue("id", goal.id)
                            setValue("description", goal.description)
                            setValue("done", goal.done)
                            setValue("week", goal.week.id)
                        }}>{goal.description}</button>
                        </label>
                    </form> 
                </div>       
        )}
        
    </div>
    )
}

export default CurrentWeek;