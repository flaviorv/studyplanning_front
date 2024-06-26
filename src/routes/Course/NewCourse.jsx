import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

const NewCourse = () => {
    
         
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {state} = useLocation();
    
    const onSubmit = (data) => {
        registerCourse(data);
    };
    
    const registerCourse = async (data) => {
        data.student = {"id": state.student.id};
        try {
            await axios.post("http://localhost:8080/savecourse", data);
            let message = "Curso cadastrado com sucesso.";
            alert(message);
            navigate("/courses", {state: {"student": state.student}});
        } catch (error) {
            let message = "Erro ao cadastrar curso."
            console.log(error.message);
            alert(message);
        }
    }

    return (
        <div className="General">
            <Navbar/>
            <h3>Cadastro de Curso</h3>
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
export default NewCourse;