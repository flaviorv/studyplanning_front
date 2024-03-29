import {useForm} from "react-hook-form";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = (studentInput) => {
        login(studentInput);
    };

    const login = async (student) => {
        try {
            const response = await axios.post("http://localhost:8080/authenticate", student);
            const studentData = await response.data;
            if(studentData.name){
                let message = "Olá " + studentData.name;
                alert(message);
                navigate("/courses", {state: {"student": studentData}} );
            }else{
                let message = "Conta de estudante não existente."
                alert(message);
            }
        }
        catch (error) {
            let message = "Erro ao logar no sistema."
            console.log(error.message);
            alert(message);
        }
    }
    
    return (
        <div className="General">
            <a href="/registerstudent">Registrar</a>
            <h3>Acessar Conta</h3>
            <form>
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
                <button onClick={(e) => handleSubmit(onSubmit, e.preventDefault())()}>Entrar</button>
            </form>
        </div>
    )
}

export default Login;