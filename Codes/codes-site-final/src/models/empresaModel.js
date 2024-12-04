var database = require("../database/config");

// "CADASTRAR EMPRESA" 

//NÃO ALTERE! ESTÁ FUNCIONAL!!!! A MENOS QUE ALTERE ALGUM CAMPO NO SCRIPT EMPRESA, MODEL EMPRESA, TABELA EMPRESA NO BD!!
async function cadastrar(
  razaoSocial,
  nomeFantasia,
  cnpj,
  telefone,
  representanteLegal,
  email,
  cpf,
  senha,
  cep,
  logradouro,
  bairro,
  cidade,
  uf
) {
  console.log("== Dados Recebidos no Model =="); // Log inicial
  console.log({
      razaoSocial,
      nomeFantasia,
      cnpj,
      telefone,
      representanteLegal,
      email,
      cpf,
      senha,
      cep,
      logradouro,
      bairro,
      cidade,
      uf
  });

  console.log("Iniciando cadastro da empresa com endereço.");

  try {
      // Inserir endereço
      const instrucaoEndereco = `
          INSERT INTO endereco 
          VALUES (default, '${cep}', '${logradouro}', '${bairro}', '${cidade}', '${uf}');
      `;
      console.log("Executando a inserção do endereço:\n", instrucaoEndereco);

      const resultadoEndereco = await database.executar(instrucaoEndereco);
      const idEndereco = resultadoEndereco.insertId;
      console.log("Endereço cadastrado com ID:", idEndereco);

      // Inserir empresa
      const instrucaoEmpresa = `
          INSERT INTO empresa 
          (razaoSocial, nomeFantasia, cnpj, telefone, representanteLegal, cpf, fkEndereco) 
          VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${telefone}', '${representanteLegal}', '${cpf}', ${idEndereco});
      `;
      console.log("Executando a inserção da empresa:\n", instrucaoEmpresa);

      const resultadoEmpresa = await database.executar(instrucaoEmpresa);
      const idEmpresa = resultadoEmpresa.insertId;
      console.log("Empresa cadastrada com ID:", idEmpresa);

      // Inserir usuário
      const instrucaoUsuario = `
          INSERT INTO usuario 
          (email, senha, fkEmpresa) 
          VALUES ('${email}', '${senha}', ${idEmpresa});
      `;
      console.log("Executando a inserção do usuário:\n", instrucaoUsuario);

      const resultadoUsuario = await database.executar(instrucaoUsuario);
      const idUsuario = resultadoUsuario.insertId;
      console.log("Usuário cadastrado com ID:", idUsuario);

      console.log("Cadastro concluído com sucesso.");
      return { idEmpresa, idEndereco, idUsuario };
  } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      throw new Error("Falha no cadastro. Detalhes: " + erro.message);
  }
}





// AUTENTICAR EMPRESA, MAS NÃO ACHO QUE ESTÁ FUNCIONAL AINDA, MAS O AUTENTICAR USUÁRIO ESTÁ!!!!

// function autenticar(email, senha) {
//   console.log("ACESSEI O empresa MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);


//   var instrucaoSql = `
//       SELECT idEmpresa, nomeFantasia, email FROM empresa WHERE email = '${email}' AND senha = '${senha}';
//   `;
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }


// OUTRAS FUNÇÕES PARA A EMPRESA, MAS NÃO UTILIZAMOS ELAS, ERA DA AQUATECH, MAS CASO PRECISEMOS DELAS!

// function buscarPorId(id) {
//   var instrucaoSql = `SELECT * FROM empresa WHERE idEmpresa = '${id}'`;

//   return database.executar(instrucaoSql);
// }

// function listar() {
//   var instrucaoSql = `SELECT id, razaoSocial, nomeFantasia, cnpj, representanteLegal, email, telefone FROM empresa`;
//   return database.executar(instrucaoSql);
// }


// function buscarPorCnpj(cnpj) {
//   var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

//   return database.executar(instrucaoSql);
// }


// function autenticarEmpresa(email, senha) {
//   console.log("ACESSEI O USUARIO MODEL para autenticação.");

//   const instrucaoSql = `
//   SELECT * 
//   FROM empresa
//   WHERE empresa.email = '${email}' AND empresa.senha = '${senha}';
//   `;

//   console.log("Executando a instrução SQL de autenticação: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }



// MODULOS EXPORTAR, IMPORTANTE, NÃO APAGUE!

module.exports = {
  // buscarPorCnpj,
  // buscarPorId,
  cadastrar,
  // listar,
  // autenticarEmpresa
};
