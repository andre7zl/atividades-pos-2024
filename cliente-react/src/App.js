import React, { useState, useEffect } from 'react';
import { fetchMarcas, fetchModelos, fetchAnos, fetchPreco } from './api';

const App = () => {
  const [tipo, setTipo] = useState('carros'); // carros, motos, caminhões
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [preco, setPreco] = useState('');
  const [selections, setSelections] = useState({
    marca: '',
    modelo: '',
    ano: '',
  });

  useEffect(() => {
    const loadMarcas = async () => {
      const data = await fetchMarcas(tipo);
      setMarcas(data);
    };
    loadMarcas();
  }, [tipo]);

  const handleMarcaChange = async (codigoMarca) => {
    setSelections((prev) => ({ ...prev, marca: codigoMarca, modelo: '', ano: '' }));
    const data = await fetchModelos(tipo, codigoMarca);
    setModelos(data);
    setAnos([]);
    setPreco('');
  };

  const handleModeloChange = async (codigoModelo) => {
    setSelections((prev) => ({ ...prev, modelo: codigoModelo, ano: '' }));
    const data = await fetchAnos(tipo, selections.marca, codigoModelo);
    setAnos(data);
    setPreco('');
  };

  const handleAnoChange = async (codigoAno) => {
    setSelections((prev) => ({ ...prev, ano: codigoAno }));
    const valor = await fetchPreco(tipo, selections.marca, selections.modelo, codigoAno);
    setPreco(valor);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Consulta FIPE</h1>

      <div className="mb-3">
        <label className="form-label">Tipo de Veículo:</label>
        <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="carros">Carros</option>
          <option value="motos">Motos</option>
          <option value="caminhoes">Caminhões</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Marca:</label>
        <select
          className="form-select"
          onChange={(e) => handleMarcaChange(e.target.value)}
        >
          <option value="">Selecione</option>
          {marcas.map((marca) => (
            <option key={marca.codigo} value={marca.codigo}>
              {marca.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Modelo:</label>
        <select
          className="form-select"
          onChange={(e) => handleModeloChange(e.target.value)}
          disabled={!selections.marca}
        >
          <option value="">Selecione</option>
          {modelos.map((modelo) => (
            <option key={modelo.codigo} value={modelo.codigo}>
              {modelo.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Ano:</label>
        <select
          className="form-select"
          onChange={(e) => handleAnoChange(e.target.value)}
          disabled={!selections.modelo}
        >
          <option value="">Selecione</option>
          {anos.map((ano) => (
            <option key={ano.codigo} value={ano.codigo}>
              {ano.nome}
            </option>
          ))}
        </select>
      </div>

      {preco && (
        <div className="alert alert-info">
          <h4 className="alert-heading">Preço:</h4>
          <p>{preco}</p>
        </div>
      )}
    </div>
  );
};

export default App;
