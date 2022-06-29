import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlusCircle } from "react-icons/fi";
import "./new.css";
import firebase from "../../services/firebaseConnection";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ToastifyPopups/erroMessage";

export default function New() {
  const { register, setValue, handleSubmit } = useForm();
  const [clientes, setClientes] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complemento, setComplemento] = useState("");

  setValue("clientes", "Betinho");
  setValue("imagem", "dados.avatarUrl");
  setValue("email", "dados.email");

  useEffect(() => {
    async function loadClientes() {
      try {
        const response = await fetch(
          "http://desafio-m03.herokuapp.com/clientes",
          {
            method: "GET",
          }
        );
        const dados = await response.json();
        if (response.ok) {
          return setClientes(dados);
        }
      } catch (error) {
        return ErrorMessage(error.ErrorMessage);
      }
    }
    loadClientes();
  }, []);

  async function onSubmit(data) {
    // const body = {};
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title nome="Novo chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="form-profile">
            <label>Cliente</label>
            {loadingClientes ? (
              <input type="text" value="Carregando..." />
            ) : (
              <select
                // value={clienteSelecionado}
                // onChange={(e) => setClienteSelecionado(e.target.value)}
                id="clientes.id"
                {...register("cliente", { required: true })}
              >
                {clientes.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nome}
                    </option>
                  );
                })}
              </select>
            )}
            <label>Assunto</label>
            <select {...register("assunto", { required: true })}>
              <option value="" disabled selected hidden>
                Selecione um assunto
              </option>
              <option value="Suporte">Suporte</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Visita">Visita</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "Aberto"}
              />
              <span>Em Aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "Progresso"}
              />
              <span>Em Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>
            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema aqui"
              {...register("complemento")}
            />
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
