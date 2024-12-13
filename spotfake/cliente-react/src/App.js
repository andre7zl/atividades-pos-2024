import React, { useState, useEffect } from 'react';
import { getArtistas, getAlbuns, getMusicas, createArtista, createAlbum, createMusica } from './api/apiWrapper';

const App = () => {
  const [artistas, setArtistas] = useState([]);
  const [albuns, setAlbuns] = useState([]);
  const [musicas, setMusicas] = useState([]);

  const [novoArtista, setNovoArtista] = useState({
    nome: '',
    local: '',
    ano_criacao: '',
  });

  const [novoAlbum, setNovoAlbum] = useState({
    artista: '',
    nome: '',
    ano: '',
  });

  const [novaMusica, setNovaMusica] = useState({
    album: '',
    nome: '',
    segundos: '',
  });

  const fetchArtistas = async () => {
    try {
      const data = await getArtistas();
      setArtistas(data);
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  const fetchAlbuns = async () => {
    try {
      const data = await getAlbuns();
      setAlbuns(data);
    } catch (error) {
      console.error('Erro ao buscar álbuns:', error);
    }
  };

  const fetchMusicas = async () => {
    try {
      const data = await getMusicas();
      setMusicas(data);
    } catch (error) {
      console.error('Erro ao buscar músicas:', error);
    }
  };

  const handleChangeArtista = (e) => {
    const { name, value } = e.target;
    setNovoArtista((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeAlbum = (e) => {
    const { name, value } = e.target;
    setNovoAlbum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeMusica = (e) => {
    const { name, value } = e.target;
    setNovaMusica((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitArtista = async (e) => {
    e.preventDefault();
    try {
      const artistaCriado = await createArtista(novoArtista);
      setArtistas((prev) => [...prev, artistaCriado]);
      setNovoArtista({ nome: '', local: '', ano_criacao: '' });
    } catch (error) {
      console.error('Erro ao criar artista:', error);
    }
  };

  const handleSubmitAlbum = async (e) => {
    e.preventDefault();
    try {
      const albumCriado = await createAlbum(novoAlbum);
      setAlbuns((prev) => [...prev, albumCriado]);
      setNovoAlbum({ artista: '', nome: '', ano: '' });
    } catch (error) {
      console.error('Erro ao criar álbum:', error);
    }
  };

  const handleSubmitMusica = async (e) => {
    e.preventDefault();
    try {
      const musicaCriada = await createMusica(novaMusica);
      setMusicas((prev) => [...prev, musicaCriada]);
      setNovaMusica({ album: '', nome: '', segundos: '' });
    } catch (error) {
      console.error('Erro ao criar música:', error);
    }
  };

  useEffect(() => {
    fetchArtistas();
    fetchAlbuns();
    fetchMusicas();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4 text-center">Cadastro de Artistas, Álbuns e Músicas</h1>

      <div className="card mb-4">
        <div className="card-header">
          <h2>Artistas</h2>
        </div>
        <ul className="list-group list-group-flush">
          {artistas.map((artista) => (
            <li key={artista.id} className="list-group-item">
              {artista.nome} - {artista.local} - {artista.ano_criacao}
            </li>
          ))}
        </ul>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h3>Adicionar Artista</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmitArtista}>
            <div className="mb-3">
              <input
                type="text"
                name="nome"
                value={novoArtista.nome}
                onChange={handleChangeArtista}
                className="form-control"
                placeholder="Nome"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="local"
                value={novoArtista.local}
                onChange={handleChangeArtista}
                className="form-control"
                placeholder="Local"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="ano_criacao"
                value={novoArtista.ano_criacao}
                onChange={handleChangeArtista}
                className="form-control"
                placeholder="Ano de Criação"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Adicionar Artista</button>
          </form>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h2>Álbuns</h2>
        </div>
        <ul className="list-group list-group-flush">
          {albuns.map((album) => (
            <li key={album.id} className="list-group-item">
              {album.nome} - {album.artista.nome} - {album.ano}
            </li>
          ))}
        </ul>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h3>Adicionar Álbum</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmitAlbum}>
            <div className="mb-3">
              <select
                name="artista"
                value={novoAlbum.artista}
                onChange={handleChangeAlbum}
                className="form-select"
                required
              >
                <option value="">Selecione um Artista</option>
                {artistas.map((artista) => (
                  <option key={artista.id} value={artista.id}>{artista.nome}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="nome"
                value={novoAlbum.nome}
                onChange={handleChangeAlbum}
                className="form-control"
                placeholder="Nome do Álbum"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="ano"
                value={novoAlbum.ano}
                onChange={handleChangeAlbum}
                className="form-control"
                placeholder="Ano"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Adicionar Álbum</button>
          </form>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h2>Músicas</h2>
        </div>
        <ul className="list-group list-group-flush">
          {musicas.map((musica) => (
            <li key={musica.id} className="list-group-item">
              {musica.nome} - {musica.album.nome} - {musica.segundos}s
            </li>
          ))}
        </ul>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h3>Adicionar Música</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmitMusica}>
            <div className="mb-3">
              <select
                name="album"
                value={novaMusica.album}
                onChange={handleChangeMusica}
                className="form-select"
                required
              >
                <option value="">Selecione um Álbum</option>
                {albuns.map((album) => (
                  <option key={album.id} value={album.id}>{album.nome}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="nome"
                value={novaMusica.nome}
                onChange={handleChangeMusica}
                className="form-control"
                placeholder="Nome da Música"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="segundos"
                value={novaMusica.segundos}
                onChange={handleChangeMusica}
                className="form-control"
                placeholder="Duração em segundos"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Adicionar Música</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
