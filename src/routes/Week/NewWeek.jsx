import {useForm} from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const NewWeek = () => {
         
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {state} = useLocation();
    const [weeks, setWeeks] = useState([])

    
    const getAllWeeks = async() => {
        try {
            const response = await axios.post("http://localhost:8080/weeks", {"id": state.subject.id})
            const data = response.data;
            setWeeks(data);
        } catch (error) {
            console.log(error);
        }
    }


    
    const onSubmit = (data) => {
        registerWeek(data);
    };
    
    const registerWeek = async (data) => {
        try {
            const response =  await axios.post("http://localhost:8080/newweek", {"id": state.subject.id});
            let message = "Semana cadastrada com sucesso.";
            alert(message);
            data.week = { "id": response.data.id };
            registerTimeGoal(data)
        } catch (error) {
            let message = "Erro ao cadastrar semana."
            console.log(error.message);
            alert(message);
        }
    }
    const registerTimeGoal = async (timeGoal) => {
        
        try {
            await axios.post("http://localhost:8080/definetimegoal", timeGoal);
            let message = "Meta de tempo cadastrado com sucesso.";
            alert(message);
            alert(JSON.stringify(timeGoal));
            navigate("/weeks", { state: { "subject": state.subject } });
        } catch (error) {
            let message = "Erro ao cadastrar meta de tempo."
            console.log(error.message);
            alert(message);
        }
    }

    
    useEffect(()=>{getAllWeeks()},[])

    return (
       
        <div className="General"> 
        {(weeks.length != 0 && weeks[weeks.length -1].ended == false) || !state ? 
        <span>"Não é possível registrar nova semana"</span> : 
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Meta de Tempo Semanal de Estudo</h3>
                <div className="InputGroup">
                    <label >Horas</label>
                    <input type="number" maxLength={50} {...register("timeGoal", {required: true})}/>
                    {errors?.name?.type === "required" && (<p className="Error">Insira as horas</p>)}
                </div>
                <button type="submit" >Confirmar</button>
            </form>
        }
        </div>
    )


}
export default NewWeek;