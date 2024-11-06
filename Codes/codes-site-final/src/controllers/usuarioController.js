var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel"); // Removido se não for necessário

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email === undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha === undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(resultadoAutenticar => {
                if (resultadoAutenticar.length === 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome
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

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.codigoVinculoServer;

    console.log("Dados recebidos no backend:", { nome, cpf, telefone, email, senha, fkEmpresa });

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
        usuarioModel.cadastrar(nome, cpf, telefone, email, senha, fkEmpresa)
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
