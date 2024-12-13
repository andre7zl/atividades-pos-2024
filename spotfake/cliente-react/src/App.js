import React, { useState, useEffect } from 'react';
import { getArtistas, createArtista } from './api/apiWrapper';

const App = () => {
  const [artistas, setArtistas] = useState([]);
  const [novoArtista, setNovoArtista] = useState({
    nome: '',
    local: '',
    ano_criacao: '',
  });

  // Função para buscar artistas
  const fetchArtistas = async () => {
    try {
      const data = await getArtistas();
      setArtistas(data);
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  // Função para lidar com alterações nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoArtista((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const artistaCriado = await createArtista(novoArtista);
      setArtistas((prev) => [...prev, artistaCriado]); // Adiciona o novo artista à lista
      setNovoArtista({ nome: '', local: '', ano_criacao: '' }); // Reseta o formulário
    } catch (error) {
      console.error('Erro ao criar artista:', error);
    }
  };

  // Carregar artistas ao montar o componente
  useEffect(() => {
    fetchArtistas();
  }, []);

  return (
    <div>
      <h1>Lista de Artistas</h1>
      <ul>
        {artistas.map((artista) => (
          <li key={artista.id}>{artista.nome} - {artista.local} - {artista.ano_criacao}</li>
        ))}
      </ul>

      <h2>Adicionar Novo Artista</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={novoArtista.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Local:</label>
          <input
            type="text"
            name="local"
            value={novoArtista.local}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ano de Criação:</label>
          <input
            type="number"
            name="ano_criacao"
            value={novoArtista.ano_criacao}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Adicionar Artista</button>
      </form>
    </div>
  );
};

export default App;
