const BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

export const fetchMarcas = async (tipo) => {
  const response = await fetch(`${BASE_URL}/${tipo}/marcas`);
  return await response.json();
};

export const fetchModelos = async (tipo, codigoMarca) => {
  const response = await fetch(`${BASE_URL}/${tipo}/marcas/${codigoMarca}/modelos`);
  const data = await response.json();
  return data.modelos;
};

export const fetchAnos = async (tipo, codigoMarca, codigoModelo) => {
  const response = await fetch(`${BASE_URL}/${tipo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`);
  return await response.json();
};

export const fetchPreco = async (tipo, codigoMarca, codigoModelo, codigoAno) => {
  const response = await fetch(`${BASE_URL}/${tipo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`);
  const data = await response.json();
  return data.Valor;
};
