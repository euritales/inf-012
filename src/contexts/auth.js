import { useState, createContext } from "react";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";
import ErrorMessage from "../components/ToastifyPopups/erroMessage";
import auth from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logOut,
} from "firebase/auth";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const storagedUser = localStorage.getItem("usuarioLogado");
  const [token, setToken] = useState(storagedUser ? storagedUser : "");
  const [loading, setLoading] = useState(false);

  async function signUp(email, password, nome) {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const responseSpring = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
          "Access-Control-Expose-Headers":
            "Access-Control-Allow-Origin, Access-Control-Allow-Credentials",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ nome: nome, email: email }),
      });
      const dados = await responseSpring.json();
      setLoading(true);
      setLocalUser(response);
      return dados;
    } catch (error) {
      ErrorMessage("Erro na matricula");
    }
  }

  async function signIn(email, senha) {
    //Fazer Login no firebase
    try {
      const response = await signInWithEmailAndPassword(auth, email, senha);
      console.log(response.user.uid);
      setLocalUser(response);
      console.log(response._tokenResponse.email);
      setToken(response.user.uid);
      setLoading(true);
      return SucessMessage("Usuario Logado!");
    } catch (error) {
      return ErrorMessage("Email ou senha invalida!");
    }
  }

  async function signOut() {
    //Fazer logout no firebase
    await logOut(auth).then(() => {
      setToken("");
      localStorage.removeItem("usuarioLogado");
      setLoading(false);
      SucessMessage("Usuário deslogado!");
    });
  }

  function setLocalUser(data) {
    localStorage.setItem("usuarioLogado", JSON.stringify(data));
  }

  async function createCliente() {}
  async function editCliente() {
    async function editCliente() {}
  }
  async function createCliente() {}

  return (
    <AuthContext.Provider
      value={{
        token,
        signUp,
        signOut,
        signIn,
        loading,
        setToken,
        setLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
