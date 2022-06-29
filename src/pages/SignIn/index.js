import "./signin.css";
import logo from "../../assets/login.png";
import { AuthContext } from "../../contexts/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

function SignIn() {
  const { register, handleSubmit } = useForm();
  const { signIn, loading } = useContext(AuthContext);
  const history = useNavigate();

  useEffect(() => {
    const storagedUser = localStorage.getItem("usuarioLogado");
    if (storagedUser != null) {
      return history("/dashboard");
    }
  }, []);

  async function onSubmit(data) {
    await signIn(data.email, data.senha);
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
            type="email"
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
