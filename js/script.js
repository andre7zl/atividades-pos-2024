document.addEventListener('DOMContentLoaded', function () {
    const tipoVeiculo = document.getElementById('tipoVeiculo');
    const marcaVeiculo = document.getElementById('marcaVeiculo');
    const modeloVeiculo = document.getElementById('modeloVeiculo');
    const anoVeiculo = document.getElementById('anoVeiculo');
    const precoVeiculo = document.getElementById('precoVeiculo');
    const btnConsultarPreco = document.getElementById('btnConsultarPreco');
  
    const fetchMarcas = async (tipo) => {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`);
      const marcas = await response.json();
      marcaVeiculo.innerHTML = '<option selected>Selecione a marca</option>';
      marcas.forEach(marca => {
        marcaVeiculo.innerHTML += `<option value="${marca.codigo}">${marca.nome}</option>`;
      });
    };
  
    const fetchModelos = async (tipo, codigoMarca) => {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${codigoMarca}/modelos`);
      const modelos = await response.json();
      modeloVeiculo.innerHTML = '<option selected>Selecione o modelo</option>';
      modelos.modelos.forEach(modelo => {
        modeloVeiculo.innerHTML += `<option value="${modelo.codigo}">${modelo.nome}</option>`;
      });
    };
  
    const fetchAnos = async (tipo, codigoMarca, codigoModelo) => {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`);
      const anos = await response.json();
      anoVeiculo.innerHTML = '<option selected>Selecione o ano</option>';
      anos.forEach(ano => {
        anoVeiculo.innerHTML += `<option value="${ano.codigo}">${ano.nome}</option>`;
      });
    };
  
    const fetchPreco = async (tipo, codigoMarca, codigoModelo, codigoAno) => {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`);
      const data = await response.json();
      precoVeiculo.value = data.Valor;
    };
  
    tipoVeiculo.addEventListener('change', () => {
      fetchMarcas(tipoVeiculo.value);
    });
  
    marcaVeiculo.addEventListener('change', () => {
      fetchModelos(tipoVeiculo.value, marcaVeiculo.value);
    });
  
    modeloVeiculo.addEventListener('change', () => {
      fetchAnos(tipoVeiculo.value, marcaVeiculo.value, modeloVeiculo.value);
    });
  
    btnConsultarPreco.addEventListener('click', () => {
      fetchPreco(tipoVeiculo.value, marcaVeiculo.value, modeloVeiculo.value, anoVeiculo.value);
    });
  
    fetchMarcas('carros');
  });
  