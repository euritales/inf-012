import "./signin.css";
import logo from "../../assets/login.png";
import { AuthContext } from "../../contexts/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

function SignIn() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const history = useNavigate();

  async function onSubmit(data) {
    console.log(data);
    await signIn(data.email, data.senha);
    // const response = await fetch("http://desafio-m03.herokuapp.com/login", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // });
    // const dados = await response.json();
    // console.log(dados);
    history("/dashboard");
  }

  return (
    <div className="conteiner-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do Sistema" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Entrar</h1>
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
          <button type="submit">Acessar</button>
        </form>

        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
