import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getArtistas = async () => {
  try {
    const response = await axios.get(`${API_URL}/artistas/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar artistas:', error);
    throw error;
  }
};

export const createArtista = async (artistaData) => {
  try {
    const response = await axios.post(`${API_URL}/artistas/`, artistaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar artista:', error);
    throw error;
  }
};

// Funções para Álbuns
export const getAlbuns = async () => {
  try {
    const response = await axios.get(`${API_URL}/albuns/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar álbuns:', error);
    throw error;
  }
};

export const createAlbum = async (albumData) => {
  try {
    const response = await axios.post(`${API_URL}/albuns/`, albumData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar álbum:', error);
    throw error;
  }
};

// Funções para Músicas
export const getMusicas = async () => {
  try {
    const response = await axios.get(`${API_URL}/musicas/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    throw error;
  }
};

export const createMusica = async (musicaData) => {
  try {
    const response = await axios.post(`${API_URL}/musicas/`, musicaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar música:', error);
    throw error;
  }
};
