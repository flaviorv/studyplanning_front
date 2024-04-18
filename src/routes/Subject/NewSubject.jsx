import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

const NewSubject = () => {
    
         
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {state} = useLocation();
    
    const onSubmit = (data) => {
        registerSubject(data);
    };
    
    const registerSubject = async (data) => {
        data.course = {"id": state.course.id};
        try {
            await axios.post("http://localhost:8080/savesubject", data);
            let message = "Matéria cadastrada com sucesso.";
            alert(message);
            navigate("/subjects", {state: {"course": state.course, "student": state.student}});
        } catch (error) {
            let message = "Erro ao cadastrar matéria."
            console.log(error.message);
            alert(message);
        }
    }

    return (
        <div className="General">
            <Navbar/>
            <h3>Cadastro de Matéria</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="InputGroup">
                    <label >Nome</label>
                    <input type="text" maxLength={50} {...register("name", {required: true})}/>
                    {errors?.name?.type === "required" && (<p className="Error">Insira um nome</p>)}
                </div>
                <button type="submit" >Confirmar</button>
            </form>
        </div>
    )

}
export default NewSubject;