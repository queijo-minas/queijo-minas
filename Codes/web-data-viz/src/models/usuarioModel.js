const database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL para autenticação.");

    const instrucaoSql = `
    SELECT usuario.idUsuario AS id, usuario.nome, usuario.tipo as tipo, usuario.email, empresa.nomeFantasia AS nomeFantasia
    FROM usuario
    LEFT JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
    WHERE usuario.email = '${email}' AND usuario.senha = '${senha}';
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
