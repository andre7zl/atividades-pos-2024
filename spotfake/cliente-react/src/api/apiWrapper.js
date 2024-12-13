import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Função para obter artistas
export const getArtistas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/artistas/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar artistas:', error);
    throw error;
  }
};

// Função para criar um novo artista
export const createArtista = async (artistaData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/artistas/`, artistaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar artista:', error);
    throw error;
  }
};
