import logo from "../../assets/login.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { useForm } from "react-hook-form";

function SignUp() {
  const { signUp, loading } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    console.log(data);
    // const response = await fetch("http://desafio-m03.herokuapp.com/login", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // });
    // const dados = await response.json();
    // console.log(dados);
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
