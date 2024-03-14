import {useForm} from "react-hook-form";
import validator from "validator";

const LoginForm = ()=> {
    const {register, handleSubmit, formState: {errors}} = useForm();
    
    const onSubmit = (data) => {
        alert(data.email + data.password);
        console.log(JSON.stringify(data));
    };
    
    return (
        <div className="Form">
            <a href="/register">Registrar</a>
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

export default LoginForm;