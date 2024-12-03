var database = require("../database/config");

// "CADASTRAR EMPRESA" 

//NÃO ALTERE! ESTÁ FUNCIONAL!!!! A MENOS QUE ALTERE ALGUM CAMPO NO SCRIPT EMPRESA, MODEL EMPRESA, TABELA EMPRESA NO BD!!

function cadastrar(razaoSocial, nomeFantasia, cnpj, telefone, representanteLegal, email, cpf, senhaEmpresa, cep, logradouro, bairro, localidade, uf) {
  console.log("Iniciando cadastro da empresa com endereço.");

  // Primeiro INSERT: Tabela endereco
  const instrucaoEndereco = `
      INSERT INTO endereco (cep, logradouro, bairro, localidade, uf) 
      VALUES ('${cep}', '${logradouro}', '${bairro}', '${localidade}', '${uf}');
  `;
  console.log("Executando a inserção do endereço: \n" + instrucaoEndereco);

  return database.executar(instrucaoEndereco).then((resultadoEndereco) => {
      var idEndereco = resultadoEndereco.insertId;
      console.log("Endereço cadastrado com ID:", idEndereco);

      // Segundo INSERT: Tabela empresa
      const instrucaoEmpresa = `
          INSERT INTO empresa 
          (razaoSocial, nomeFantasia, cnpj, telefone, representanteLegal, email, cpf, senhaEmpresa, fkEndereco) 
          VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${telefone}', '${representanteLegal}', '${email}', 
                  '${cpf}', '${senhaEmpresa}', '${idEndereco}');
      `;
      console.log("Executando a inserção da empresa: \n" + instrucaoEmpresa);

      return database.executar(instrucaoEmpresa).then((resultadoEmpresa) => {
          var idEmpresa = resultadoEmpresa.insertId;
          console.log("Empresa cadastrada com ID:", idEmpresa);
          return { idEmpresa, idEndereco };
      });
  }).catch((erro) => {
      console.error("Erro ao cadastrar empresa:", erro);
      throw erro;
  });
}



// AUTENTICAR EMPRESA, MAS NÃO ACHO QUE ESTÁ FUNCIONAL AINDA, MAS O AUTENTICAR USUÁRIO ESTÁ!!!!

function autenticar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
  
 
  var instrucaoSql = `
      SELECT idEmpresa, nomeFantasia, email FROM empresa WHERE email = '${email}' AND senha = '${senhaEmpresa}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


// OUTRAS FUNÇÕES PARA A EMPRESA, MAS NÃO UTILIZAMOS ELAS, ERA DA AQUATECH, MAS CASO PRECISEMOS DELAS!

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

// MODULOS EXPORTAR, IMPORTANTE, NÃO APAGUE!

module.exports = { 
  buscarPorCnpj, 
  buscarPorId, 
  autenticar,
  cadastrar, 
  listar 
};
