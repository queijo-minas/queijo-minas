var database = require("../database/config");

// "CADASTRAR USUÁRIO" 

//NÃO ALTERE! ESTÁ FUNCIONAL!!!! A MENOS QUE ALTERE ALGUM CAMPO NO SCRIPT USUARIO, MODEL USUÁRIO, TABELA USUÁRIO NO BD!!

function cadastrar(nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco, tipoUsuario) {
    console.log("Iniciando cadastro do usuário.");

        
        const instrucaoUsuario = `
         INSERT INTO usuario (nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco, tipoUsuario) 
                VALUES ('${nome}', '${cpf}', '${telefone}', '${email}', '${senha}', '${fkEmpresa}', '${fkEndereco}','${tipoUsuario}');
            `;


            console.log("Executando a inserção do usuário: \n" + instrucaoUsuario);
            console.log("Valores para cadastro:", { nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco, tipoUsuario });
        
        return database.executar(instrucaoUsuario)
       
    .then(result => {
        var idUsuario = result.insertId;
});

}

// "AUTENTICAR USUÁRIO" 

//NÃO ALTERE! ESTÁ FUNCIONAL!!!! A MENOS QUE ALTERE ALGUM CAMPO NO SCRIPTUSUARIO, MODELUSUÁRIO, TABELA USUÁRIO NO BD!!

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL para autenticação.");

    const instrucaoSql = `
    SELECT usuario.idUsuario AS id, 
           usuario.nome, 
           usuario.email, 
           usuario.tipoUsuario, 
           empresa.nomeFantasia AS nomeFantasia
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
