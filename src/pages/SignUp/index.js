import logo from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { useForm } from "react-hook-form";

function SignUp() {
  const { signUp } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const history = useNavigate();

  async function onSubmit(data) {
    history("/");
    await signUp(data.email, data.senha, data.nome);
  }
  return (
    <div className="conteiner-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do Sistema" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <h1>Nova Conta</h1>
          <input
            type="text"
            placeholder="Seu nome"
            {...register("nome", { required: true })}
          />
          <input
            type="text"
            placeholder="email@email.com"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="*****"
            {...register("senha", { required: true })}
          />
          <button type="submit">Cadastrar</button>
        </form>

        <Link to="/">Já possui uma conta? Entre aqui!</Link>
      </div>
    </div>
  );
}

export default SignUp;
