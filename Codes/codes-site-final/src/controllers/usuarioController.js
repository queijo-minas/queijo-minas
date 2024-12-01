var usuarioModel = require("../models/usuarioModel");


// AQUI É O CONTROLLER DO USUÁRIO!!!
function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nomeFantasia = req.body.empresaServer; // Não parece ser necessário aqui

    if (!email) {
        res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha, nomeFantasia)
            .then(resultadoAutenticar => {
                if (resultadoAutenticar.length === 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        fkEndereco: resultadoAutenticar[0].fkEndereco || null,
                        nome: resultadoAutenticar[0].nome,
                        nomeFantasia: resultadoAutenticar[0].nomeFantasia || null,
                        tipoUsuario: resultadoAutenticar[0].tipoUsuario || "cliente", // Incluído tipo do usuário
                    });
                } else if (resultadoAutenticar.length === 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(erro => {
                console.error("Erro ao autenticar:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


/*function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nomeFantasia = req.body.empresaServer;

    if (!email) {
        res.status(400).send("Seu email está undefined!");
    }else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(resultadoAutenticar => {
                if (resultadoAutenticar.length === 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        nomeFantasia: resultadoAutenticar[0].nomeFantasia,
                    });
                } else if (resultadoAutenticar.length === 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(erro => {
                console.error("Erro ao autenticar:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

*/

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.codigoVinculoServer;
    var fkEndereco = req.body.enderecoServer;
    var tipoUsuario = req.body.tipoUsuarioServer || "cliente";  // Padrão: cliente

    console.log("Dados recebidos no backend:", { nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco, tipoUsuario});

    if (!nome) {
        res.status(400).send("Seu nome está undefined!");
    } else if (!cpf) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (!telefone) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (!email) {
        res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        res.status(400).send("Sua senha está undefined!");
    } else if (!fkEmpresa) {
        res.status(400).send("Código de vínculo da empresa está undefined!");
    } else {
        usuarioModel.cadastrar(nome, cpf, telefone, email, senha, fkEmpresa,
            fkEndereco, tipoUsuario)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                console.error("Erro ao cadastrar:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
};
