import { useState, useContext, useEffect } from "react";
import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";
import { FiSettings, FiUpload } from "react-icons/fi";
import firebase from "../../services/firebaseConnection";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

export default function Profile() {
  const { register, setValue, handleSubmit } = useForm();
  const { user, signOut, setUser, setLocalUser } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const history = useNavigate();

  function handleFile(e) {}
  async function handleSave(e) {}
  async function handleUpload() {}

  useEffect(() => {
    async function carregarDado() {
      const response = await fetch("http://desafio-m03.herokuapp.com/perfil", {
        method: "GET",
      });
      const dados = await response.json();
      // setValue("nome", dados.nome);
      // setValue("imagem", dados.avatarUrl);
      // setValue("email", dados.email);
      console.log(dados);
    }
    carregarDado();
  }, []);

  useEffect(() => {
    async function loadUser() {
      // devo consumir do get que será feito para inserir valores antigos do usuário
      setValue("nome", "Manuel");
      setValue("imagem", "avatar");
      setValue("email", "Manel@ifba.com");
      // setValue("imagem", "dados.avatarURL");
    }
    loadUser();
  });

  async function onSubmit(data) {
    // const dadosAtualizados = Object.fromEntries(
    //   Object.entries(data).filter(([, value]) => value)
    // ); --  APAGAR --

    //requisição
    await fetch("http://desafio-m03.herokuapp.com/perfil", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title nome="Meu perfil">
          <FiSettings size={25} />
        </Title>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#000" size={25} />
              </span>

              <input
                type="file"
                accept="image/*"
                // onChange={handleFile}
              />
              <br />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  width="250"
                  height="250"
                  alt="Foto de perfil do usuario"
                />
              ) : (
                <img
                  src={avatarUrl}
                  width="250"
                  height="250"
                  alt="Foto de perfil do usuario"
                />
              )}
            </label>

            <label>Nome</label>
            <input type="text" {...register("nome")} />

            <label>Email</label>
            <input type="text" {...register("email")} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button
            className="logout-btn"
            onClick={() => {
              signOut();
              history("/");
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
