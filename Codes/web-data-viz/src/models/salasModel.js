var database = require("../database/config");

// Busca salas associadas a uma empresa
function buscarSalasPorEmpresa(idEmpresa) {
  const instrucao = `
    SELECT * FROM localMaturacao WHERE fkEmpresa = ${idEmpresa};
  `;
  return database.executar(instrucao);
}

// Cadastro de uma nova sala
function cadastrarSala(nomeLocal, descricaoLocal, capacidadeEstantes, areaSala, fkEmpresa) {
  const instrucao = `
    INSERT INTO localMaturacao (nomeLocal, descricaoLocal, capacidadeEstantes, areaSala, fkEmpresa)
    VALUES ('${nomeLocal}', '${descricaoLocal}', ${capacidadeEstantes || "NULL"}, '${areaSala}', ${fkEmpresa});
  `;
  return database.executar(instrucao);
}

module.exports = {
  buscarSalasPorEmpresa,
  cadastrarSala
};
