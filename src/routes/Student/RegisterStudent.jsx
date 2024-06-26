import {useForm} from "react-hook-form";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterStudent = () => {        
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const watchPassword = watch("password");
    const navigate = useNavigate();
   
    const onSubmit = (data) => {
        registerStudent(data);
    };

    const registerStudent = async (data) => {
        try {
            await axios.post("http://localhost:8080/register", data);
            let message = "Estudante cadastrado com sucesso.";
            alert(message);
            navigate("/login");
        } catch (error) {
            let message = "Erro ao cadastrar estudante."
            console.log(error.message);
            alert(message);
        }
    }

    return (
        <div className="General">
            <h3>Registro de Estudante</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="InputGroup">
                    <label >Nome</label>
                    <input type="text" maxLength={50} {...register("name", {required: true})}/>
                    {errors?.name?.type === "required" && (<p className="Error">Insira um nome</p>)}
                </div>
                <div className="InputGroup">
                    <label >Email</label>
                    <input type="email" maxLength={50} {...register("email", {required: true, validate: (value) => validator.isEmail(value) })}/>
                    {errors?.email?.type === "required" && (<p className="Error">Insira um email</p>)}
                    {errors?.email?.type === "validate" && (<p className="Error">Formato inválido de email</p>)}
                </div>
                <div className="InputGroup">
                    <label >Senha</label>
                    <input type="password" maxLength={15} {...register("password", {required: true, minLength: 3})}/>
                    {errors?.password?.type === "minLength" && (<p className="Error">Senha deve ter 3 caracteres ou mais</p>)}
                    {errors?.password?.type === "required" && (<p className="Error">Insira uma senha</p>)}
                </div>
                <div className="InputGroup">
                    <label >Confirmar Senha</label>
                    <input type="password" maxLength={15} {...register("confirmPassword", {required: true, minLength: 3, validate: (value) => value === watchPassword, shouldUnregister: true })}/>
                    {errors?.confirmPassword?.type === "minLength" && (<p className="Error">Senha deve ter 3 caracteres ou mais</p>)}
                    {errors?.confirmPassword?.type === "required" && (<p className="Error">Insira a confirmação da senha</p>)}
                    {errors?.confirmPassword?.type === "validate" && (<p className="Error">Senhas não são iguais</p>)}

                </div>
                <button type="submit" >Confirmar</button>
            </form>
        </div>
    )   
}

export default RegisterStudent;