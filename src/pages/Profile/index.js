import { useState, useContext, useEffect } from "react";
import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";
import { FiSettings, FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import firebase from "../../services/firebaseConnection";
import { async } from "@firebase/util";
import SucessMessage from "../../components/ToastifyPopups/sucessMessage";

export default function Profile() {
  const { register, setValue, handleSubmit } = useForm();
  const { user, signOut, token } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const history = useNavigate();

  function handleFile(e) {}
  async function handleSave(e) {}
  async function handleUpload() {}

  async function handleSignOut(e) {
    signOut().then(() => {
      if (!token) {
        return history("/");
      }
    });
  }

  useEffect(() => {
    function loadUser() {
      // devo consumir do get que será feito para inserir valores antigos do usuário
      setValue("nome", "Manoel");
      setValue("imagem", "avatar");
      setValue("email", "Maneol@ifba.com");
      // setValue("imagem", "dados.avatarURL");
    }
    loadUser();
  }, []);

  useEffect(() => {
    const storagedUser = localStorage.getItem("usuarioLogado");
    if (storagedUser == null) {
      return history("/dashboard");
    }
  }, []);

  async function onSubmit(data) {}

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

              <input type="file" accept="image/*" />
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
            onClick={(e) => {
              handleSignOut(e);
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
