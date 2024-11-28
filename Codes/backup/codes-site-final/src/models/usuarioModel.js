
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



/* POR FAVOR NÃO MEXER Nesses codigos, pois estou ajustando!!!! */

/*


COMENTANDO POIS COMO FOI ALTERADO OS CAMPOS PRECISA DE AJUSTES AQUI 
function cadastrar( idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    email VARCHAR(45),
    senha VARCHAR(10),
    fkEmpresa INT,
    fkEndereco INT UNIQUE,
    tipo varchar(45),) {
    console.log("Iniciando cadastro do usuário.");


    
    const instrucaoLogin = `
        INSERT INTO login () VALUES ('${email}', '${senha}');
    `;

    console.log("Executando a inserção no login: \n" + instrucaoLogin);
    
    return database.executar(instrucaoLogin)
    .then(result => {
        const fkLogin = result.insertId; 
        
        
        const instrucaoUsuario = `
         INSERT INTO usuario (nome, cpf, email, senha, telefone, fkEmpresa, tipo) 
                VALUES ('${nome}', '${cpf}', '${email}', '${senha}','${telefone}', '${fkEmpresa}','${TipoUsuario}');
            `;


            console.log("Executando a inserção do usuário: \n" + instrucaoUsuario);
            console.log("Valores para cadastro:", { nome, cpf, telefone, email, senha, fkEmpresa, TipoUsuario });
        
        return database.executar(instrucaoUsuario);
    })
    // .catch (erro => {
        //     console.error("Erro ao cadastrar usuário:", erro);
        //     throw erro;
        // });
    }
    module.exports = {
        autenticar,
        cadastrar
    };


module.exports = {
    autenticar,
    cadastrar
};





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