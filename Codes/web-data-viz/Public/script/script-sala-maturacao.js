const container = document.getElementById('sala-container');
const idEmpresa = 101; // Substitua pelo ID dinâmico da empresa (sessão, etc.)

// Função para carregar salas
async function carregarSalas() {
  try {
    const response = await fetch(`/salas/empresa/${idEmpresa}`); // Ajuste para sua rota
    const salas = await response.json();

    container.innerHTML = '';

    if (salas.length === 0) {
      container.innerHTML = '<p>Nenhuma sala cadastrada.</p>';
    } else {
      salas.forEach(sala => {
        const divSala = document.createElement('div');
        divSala.classList.add('kpi');
        divSala.innerHTML = `
          <h1>${sala.nomeLocal}</h1>
          <p>${sala.descricaoLocal || 'Sem descrição'}</p>
          <img src="./imgs/salaMaturacao.png" alt="Sala de Maturação">
        `;
        container.appendChild(divSala);
      });
    }

    // Adicionar botão para cadastrar nova sala
    const adicionarDiv = document.createElement('div');
    adicionarDiv.classList.add('kpi2');
    adicionarDiv.innerHTML = `
      <h1>Adicionar Sala</h1>
      <img src="./imgs/adicionar (2).png">
    `;
    adicionarDiv.onclick = abrirFormularioCadastro;
    container.appendChild(adicionarDiv);
  } catch (error) {
    console.error('Erro ao carregar salas:', error);
  }
}

// Função para abrir o formulário de cadastro
function abrirFormularioCadastro() {
  const nome = prompt('Digite o nome da sala:');
  const descricao = prompt('Digite uma descrição para a sala:');
  const capacidade = prompt('Digite a capacidade das estantes:');
  const area = prompt('Digite a área da sala:');

  fetch('/salas/cadastrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nomeLocal: nome,
      descricaoLocal: descricao,
      capacidadeEstantes: capacidade,
      areaSala: area,
      fkEmpresa: idEmpresa
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      carregarSalas(); // Recarregar salas
    })
    .catch(error => console.error('Erro ao cadastrar sala:', error));
}

// Inicializar
carregarSalas();