import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const NewGoal = () => {

         
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {state} = useLocation();
    
    const onSubmit = (data) => {
        data.id = 0;
        data.done = false;
        data.week = {"id": state.week.id};
        registerGoal(data);
    };
    
    const registerGoal = async (data) => {
        
        try {
            await axios.post("http://localhost:8080/savestudygoal", data);
            let message = "Meta cadastrada com sucesso.";
            alert(message);
            navigate("/currentweek", {state: {"week": state.week}});
        } catch (error) {
            let message = "Erro ao cadastrar meta."
            console.log(error.message);
            alert(message);
        }
    }

    return (
        <div className="General">
            <h3>Cadastrar Meta</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="InputGroup">
                    <label >Descrição</label>
                    <input type="text" maxLength={50} {...register("description", {required: true})}/>
                    {errors?.description?.type === "required" && (<p className="Error">Insira a descrição</p>)}
                </div>
                <button type="submit" >Confirmar</button>
            </form>
        </div>
    )

}
export default NewGoal;