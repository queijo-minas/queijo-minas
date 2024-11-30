//const database = require("../database/config");
var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL para autenticação.");

    const instrucaoSql = `
    SELECT usuario.idUsuario AS id, usuario.nome, usuario.email, empresa.nomeFantasia AS nomeFantasia
    FROM usuario
    LEFT JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
    WHERE usuario.email = '${email}' AND usuario.senhaUsuario = '${senha}';
`;


    console.log("Executando a instrução SQL de autenticação: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



/* POR FAVOR NÃO MEXER Nesses codigos, pois estou ajustando!!!! */


function cadastrar(nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco, tipoUsuario) {
    console.log("Iniciando cadastro do usuário.");


   /* 
    const instrucaoLogin = `
        INSERT INTO login () VALUES ('${email}', '${senha}');
    `;

    console.log("Executando a inserção no login: \n" + instrucaoLogin);
    
    return database.executar(instrucaoLogin)
    .then(result => {
        const fkLogin = result.insertId; */
        
        
        const instrucaoUsuario = `
         INSERT INTO usuario (nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco, tipoUsuario) 
                VALUES ('${nome}', '${cpf}', '${telefone}', '${email}', '${senha}', '${fkEmpresa}', '${fkEndereco}','${tipoUsuario}');
            `;


            console.log("Executando a inserção do usuário: \n" + instrucaoUsuario);
            console.log("Valores para cadastro:", { nome, cpf, telefone, email, senha, fkEmpresa, TipoUsuario });
        
        return database.executar(instrucaoUsuario)
       
    .then(result => {
        const idUsuario = result.insertId;
});

}
    // .catch (erro => {
      //      console.error("Erro ao cadastrar usuário:", erro);
        //     throw erro;
        //});
    //}
   

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    
   
    var instrucaoSql = `
        SELECT idUsusuario, representantelegal AS nome, email FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, nomeFantasia, email, senha, representante, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocial, nomeFantasia, email, senha, representante, cnpj);


    var instrucaoSql = `
        INSERT INTO empresa (razaosocial, nomefantasia, email, senha, representantelegal, cnpj) 
        VALUES ('${razaoSocial}', '${nomeFantasia}', '${email}', '${senha}', '${representante}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};
