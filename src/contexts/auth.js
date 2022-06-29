import { useState, createContext, useEffect } from "react";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";
import ErrorMessage from "../components/ToastifyPopups/erroMessage";
import auth from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logOut,
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function loadUser() {
      const storagedUser = localStorage.getItem("usuarioLogado");
      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
        //setLoading(true);
      }
      //setLoading(false);
    }
    loadUser();
  }, []);

  async function signUp({ email, password, nome }) {
    await createUserWithEmailAndPassword(auth, email, password, nome)
      .then((value) => {
        setLocalUser(value);
        setLoading(true);
        SucessMessage("Usuário Criado");
        // history("/");
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          ErrorMessage("Senha Fraca!");
        } else if (error.code === "auth/email-already-in-use") {
          ErrorMessage("Email Existente!");
        } else if (error.code === "auth/invalid-email") {
          ErrorMessage("Email Inválido!");
        }
      });
  }

  async function signIn(email, password) {
    //Fazer Login no firebase
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(true);
        SucessMessage("Bem-vindo de volta!!");
        // history("/");
      })
      .catch(() => {
        ErrorMessage("Email/Senha invalidos");
      });
  }

  async function signOut() {
    //Fazer logout no firebase
    await logOut(auth).then(() => {
      // setUser(false);
      SucessMessage("Usuário deslogado!");
      // history("/");
    });
  }

  function setLocalUser(data) {
    localStorage.setItem("usuarioLogado", JSON.stringify(data));
  }

  async function carregarDados(data) {
    const response = await fetch("http://desafio-m03.herokuapp.com/login", {});
    const dados = await response.json();
    console.log(dados);
  }

  return (
    <AuthContext.Provider
      value={{
        carregarDados,
        signed: !!user,
        user,
        signUp,
        signOut,
        signIn,
        loading,
        setUser,
        setLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
