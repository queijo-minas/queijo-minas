
/*var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    
   
    var instrucaoSql = `
        SELECT id, representantelegal AS nome, email FROM empresa WHERE email = '${email}' AND senha = '${senha}';
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
*/

const database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL para autenticação.");

    const instrucaoSql = `
    SELECT usuario.idUsuario AS id, usuario.nome, login.email, empresa.nomeFantasia AS nomeFantasia
    FROM usuario
    INNER JOIN login ON usuario.fkLogin = login.idLogin
    LEFT JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
    WHERE login.email = '${email}' AND login.senhaUsuario = '${senha}';
`;


    console.log("Executando a instrução SQL de autenticação: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(nome, cpf, telefone, email, senha, fkEmpresa, TipoUsuario) {
    console.log("Iniciando cadastro do usuário.");

    const instrucaoUsuario = `
                INSERT INTO usuario (nome, cpf, email, senha, telefone, fkEmpresa, tipo) 
                VALUES ('${nome}', '${cpf}', '${email}', '${senha}','${telefone}', '${fkEmpresa}','${TipoUsuario}');
            `;

    console.log("Executando a inserção do usuário: \n" + instrucaoUsuario);
    console.log("Valores para cadastro:", { nome, cpf, telefone, email, senha, fkEmpresa, TipoUsuario });

    
        // .catch (erro => {
        //     console.error("Erro ao cadastrar usuário:", erro);
        //     throw erro;
        // });
        return database.executar(instrucaoUsuario);

}
module.exports = {
    autenticar,
    cadastrar
};
