import { useState, createContext, useEffect } from "react";
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   function loadUser() {
  //     const storagedUser = localStorage.getItem("usuarioLogado");
  //     if (storagedUser) {
  //       setUser(JSON.parse(storagedUser));
  //       setLoading(true);
  //     }
  //     // setLoading(false);
  //   }
  //   loadUser();
  // }, []);

  async function signUp(email, password, nome) {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setLocalUser(response);
    // .then((value) => {
    //   setLocalUser(value);
    //   setLoading(true);
    //   SucessMessage("Usuário Criado");
    //   // history("/");
    // })
    // .catch((error) => {
    //   if (error.code === "auth/weak-password") {
    //     ErrorMessage("Senha Fraca!");
    //   } else if (error.code === "auth/email-already-in-use") {
    //     ErrorMessage("Email Existente!");
    //   } else if (error.code === "auth/invalid-email") {
    //     ErrorMessage("Email Inválido!");
    //   }
    // });
  }

  async function signIn(email, senha) {
    //Fazer Login no firebase

    try {
      const response = await signInWithEmailAndPassword(auth, email, senha);
      setLocalUser(response);
      setLoading(true);
      setUser(true);
      return SucessMessage("Usuario Logado!");
    } catch (error) {
      return ErrorMessage("Email ou senha invalida!");
    }
  }

  async function signOut() {
    //Fazer logout no firebase
    await logOut(auth).then(() => {
      localStorage.removeItem("usuarioLogado");
      setUser(false);
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
// await fetch("http://desafio-m03.herokuapp.com/perfil", {
//   method: "PUT",
//   body: JSON.stringify(data),
//   headers: {
//     "Content-type": "application/json",
//   },
// });
