import { fetchMarcas, fetchModelos, fetchAnos, fetchPreco } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const tipoVeiculo = document.getElementById('tipoVeiculo');
  const marcaVeiculo = document.getElementById('marcaVeiculo');
  const modeloVeiculo = document.getElementById('modeloVeiculo');
  const anoVeiculo = document.getElementById('anoVeiculo');
  const precoVeiculo = document.getElementById('precoVeiculo');
  const btnConsultarPreco = document.getElementById('btnConsultarPreco');

  const updateMarcas = async () => {
    const marcas = await fetchMarcas(tipoVeiculo.value);
    marcaVeiculo.innerHTML = '<option selected>Selecione a marca</option>';
    marcas.forEach(marca => {
      marcaVeiculo.innerHTML += `<option value="${marca.codigo}">${marca.nome}</option>`;
    });
  };

  const updateModelos = async () => {
    const modelos = await fetchModelos(tipoVeiculo.value, marcaVeiculo.value);
    modeloVeiculo.innerHTML = '<option selected>Selecione o modelo</option>';
    modelos.forEach(modelo => {
      modeloVeiculo.innerHTML += `<option value="${modelo.codigo}">${modelo.nome}</option>`;
    });
  };

  const updateAnos = async () => {
    const anos = await fetchAnos(tipoVeiculo.value, marcaVeiculo.value, modeloVeiculo.value);
    anoVeiculo.innerHTML = '<option selected>Selecione o ano</option>';
    anos.forEach(ano => {
      anoVeiculo.innerHTML += `<option value="${ano.codigo}">${ano.nome}</option>`;
    });
  };

  const showPreco = async () => {
    const preco = await fetchPreco(tipoVeiculo.value, marcaVeiculo.value, modeloVeiculo.value, anoVeiculo.value);
    precoVeiculo.value = preco;
  };

  tipoVeiculo.addEventListener('change', updateMarcas);
  marcaVeiculo.addEventListener('change', updateModelos);
  modeloVeiculo.addEventListener('change', updateAnos);
  btnConsultarPreco.addEventListener('click', showPreco);

  updateMarcas();
});
