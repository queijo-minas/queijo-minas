var usuarioModel = require("../models/usuarioModel");

// AQUI É O CONTROLLER DO USUÁRIO!!!
function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email) {
        res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(resultadoAutenticar => {
                if (resultadoAutenticar.length === 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        nomeFantasia: resultadoAutenticar[0].nomeFantasia || null,
                        tipoUsuario: resultadoAutenticar[0].tipoUsuario || "cliente", // Incluído tipo do usuário
                        idEmpresa: resultadoAutenticar[0].idEmpresa || null, // Adicionado idEmpresa
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
    var cnpj = req.body.cnpj;
    var razaoSocial = req.body.razaoSocial;
    var nomeFantasia = req.body.nomeFantasia;
    var telefone = req.body.telefone;
    var representanteLegal = req.body.representanteLegal;
    var email = req.body.email;
    var cpf = req.body.cpf;
    var senhaEmpresa = req.body.senhaEmpresa;
  
    // Validações dos campos obrigatórios
    if (!cnpj || !razaoSocial || !nomeFantasia || !telefone || !representanteLegal || !email || !cpf || !senhaEmpresa) {
        return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios para a empresa!" });
    }
  
    // Dados do endereço
    var cep = req.body.cep;
    var logradouro = req.body.logradouro;
    var bairro = req.body.bairro;
    var localidade = req.body.localidade;
    var uf = req.body.uf;
  
    // Validações do endereço
    if (!cep || !logradouro || !bairro || !localidade || !uf) {
        return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios do endereço!" });
    }
  
    console.log("Dados recebidos no backend:", { cnpj, razaoSocial, nomeFantasia, telefone, representanteLegal, email, cpf, senhaEmpresa, cep, logradouro, bairro, localidade, uf });
  
    // Chama o modelo para cadastrar a empresa com o endereço
    empresaModel.cadastrar(razaoSocial, nomeFantasia, cnpj, telefone, representanteLegal, email, cpf, senhaEmpresa, cep, logradouro, bairro, localidade, uf)
        .then((resultado) => {
            res.status(201).json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao cadastrar empresa:", erro);
            res.status(500).json({ mensagem: "Erro ao cadastrar empresa", erro: erro.sqlMessage });
        });
  }
  
  

module.exports = {
    autenticar,
    cadastrar
};
