var database = require("../database/config");

function cadastrar(nome, cpf, telefone, email, senha, fkEmpresa, tipoUsuario, cep, logradouro, bairro, cidade, uf) {
    console.log("Iniciando cadastro do usuário com endereço.");

    // Primeiro INSERT: Tabela endereco
    const instrucaoEndereco = `
        INSERT INTO endereco 
        VALUES (default, '${cep}', '${logradouro}', '${bairro}', '${cidade}', '${uf}');
    `;

    console.log("Executando a inserção do endereço: \n" + instrucaoEndereco);

    return database.executar(instrucaoEndereco).then((resultadoEndereco) => {
        var idEndereco = resultadoEndereco.insertId;

        console.log("Endereço cadastrado com ID:", idEndereco);

        // Segundo INSERT: Tabela usuario
        const instrucaoUsuario = `
            INSERT INTO usuario (nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco, tipoUsuario) 
            VALUES ('${nome}', '${cpf}', '${telefone}', '${email}', '${senha}', '${fkEmpresa}', '${idEndereco}', '${tipoUsuario}');
        `;

        console.log("Executando a inserção do usuário: \n" + instrucaoUsuario);

        return database.executar(instrucaoUsuario).then((resultadoUsuario) => {
            var idUsuario = resultadoUsuario.insertId;
            console.log("Usuário cadastrado com ID:", idUsuario);
            return { idUsuario, idEndereco };
        });
    });
}

// "AUTENTICAR USUÁRIO"
// NÃO ALTERE! ESTÁ FUNCIONAL!!!! A MENOS QUE ALTERE ALGUM CAMPO NO SCRIPT USUARIO, MODEL USUÁRIO, TABELA USUÁRIO NO BD!!
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL para autenticação.");

    const instrucaoSql = `
    SELECT usuario.idUsuario AS id, 
           usuario.nome, 
           usuario.email, 
           usuario.tipoUsuario, 
           empresa.nomeFantasia AS nomeFantasia, 
           empresa.idEmpresa AS idEmpresa  -- Incluído o ID da empresa
    FROM usuario
    LEFT JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
    WHERE usuario.email = '${email}' AND usuario.senha = '${senha}';
    `;

    console.log("Executando a instrução SQL de autenticação: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};
