var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel"); 

// Em usuarioController.js
function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nomeFantasia = req.body.empresaServer;

    if (!email) {
        res.status(400).send("Seu email está undefined!");
    }else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
        .then((resultadoAutenticar) => {
            if (resultadoAutenticar.length === 1) {
                const usuario = resultadoAutenticar[0];
                res.json({
                    id: usuario.id,
                    email: usuario.email,
                    nome: usuario.nome,
                    nomeFantasia: usuario.nomeFantasia || null,
                    tipo: usuario.tipo, // Inclua o tipo do usuário
                });
            } else if (resultadoAutenticar.length === 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(500).send("Mais de um usuário encontrado com o mesmo login e senha!");
            }
        })
        .catch((erro) => {
            console.error("Erro ao autenticar:", erro);
            res.status(500).json({ mensagem: "Erro interno no servidor", erro: erro.sqlMessage });
        });
    }
}



function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.codigoVinculoServer;
    var TipoUsuario = req.body.TipoUsuarioServer || "cliente";

    console.log("Dados recebidos no backend:", { nome, cpf, telefone, email, senha, fkEmpresa, TipoUsuario});

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
        usuarioModel.cadastrar(nome, cpf, telefone, email, senha, fkEmpresa, TipoUsuario)
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
