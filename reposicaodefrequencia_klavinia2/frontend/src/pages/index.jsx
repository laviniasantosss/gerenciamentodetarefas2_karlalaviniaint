import { useEffect, useState } from "react";
import api from "../api.js";
import "./style.css";

export default function Index() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataPrazo, setDataPrazo] = useState("");
  const [status, setStatus] = useState("pendente");
  const [editandoId, setEditandoId] = useState(null);

  // Carregar as tarefsas
  async function carregarTarefas() {
    try {
      const { data } = await api.get("/tarefas");
      setTarefas(data.tarefas );
    } catch {
      alert("Erro ao carregar tarefas || []");
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  // Criar ou editar tarefa
  async function salvarTarefa(e) {
    e.preventDefault();
    const tarefa = { titulo, descricao, data_prazo: dataPrazo, status };

    try {
      if (editandoId) {
        await api.put(`/tarefas/${editandoId}`, tarefa);
      } else {
        await api.post("/tarefas", tarefa);
      }
      carregarTarefas();
      limparFormulario();
    } catch {
      alert("Erro ao salvar tarefa");
    }
  }

  // Deletar 
  async function deletarTarefa(id) {
    if (confirm("Tem certeza que deseja excluir?")) {
      await api.delete(`/tarefas/${id}`);
      carregarTarefas();
    }
  }

  // Editar tarefa
  function editarTarefa(t) {
    setTitulo(t.titulo);
    setDescricao(t.descricao);
    setDataPrazo(t.data_prazo);
    setStatus(t.status);
    setEditandoId(t.id);
  }

  // Limpar formulário
  function limparFormulario() {
    setTitulo("");
    setDescricao("");
    setDataPrazo("");
    setStatus("pendente");
    setEditandoId(null);
  }

  return (
    <div className="background">
      <div className="container">
        <h1>Gerenciador de Tarefas</h1>

        <form onSubmit={salvarTarefa} className="task-form">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input
            type="date"
            value={dataPrazo}
            onChange={(e) => setDataPrazo(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluída</option>
          </select>

          <button type="submit">
            {editandoId ? "Atualizar Tarefa" : "Adicionar Tarefa"}
          </button>
        </form>

        <div className="task-list">
          {tarefas.map((t) => (
            <div key={t.id} className="card">
              <h3>{t.titulo}</h3>
              <p>{t.descricao}</p>
              <p>Prazo: {t.data_prazo}</p>
              <p>Status: {t.status}</p>

              <div className="buttons">
                <button className="edit" onClick={() => editarTarefa(t)}>
                  Editar
                </button>
                <button className="delete" onClick={() => deletarTarefa(t.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
