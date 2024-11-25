/*var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };  */

var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE idEmpresa = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razaoSocial, nomeFantasia, cnpj, representanteLegal, email, telefone FROM empresa`;
  return database.executar(instrucaoSql);
}


function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}
function cadastrar(razaoSocial, nomeFantasia, cnpj, telefone, representanteLegal, email, cpf, senhaEmpresa) {
  var instrucaoSql = `
      INSERT INTO empresa 
      (razaoSocial, nomeFantasia, cnpj, telefone, representanteLegal, email, cpf, senhaEmpresa) 
      VALUES 
      ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${telefone}', '${representanteLegal}', '${email}', '${cpf}', '${senhaEmpresa}')
  `;
  console.log("SQL gerado:", instrucaoSql); 
  return database.executar(instrucaoSql);
}



module.exports = { 
  buscarPorCnpj, 
  buscarPorId, 
  cadastrar, 
  listar 
};
