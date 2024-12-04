var empresaModel = require("../models/empresaModel");

// async function autenticarEmpresa(req, res) {
//     const { email, senha } = req.body;  // Pegando email e senha da empresa

//     console.log("Tentando autenticar como empresa...");

//     try {
//         // Tenta autenticar como empresa
//         let empresa = await autenticarEmpresa(email, senha);

//         if (empresa) {
//             // Se for uma empresa, retorna os dados da empresa
//             console.log("Empresa autenticada com sucesso");
//             return res.status(200).json(empresa);
//         }

//         // Se não encontrar a empresa
//         console.log("Falha na autenticação, credenciais inválidas");
//         return res.status(401).json({ message: "Credenciais inválidas" });

//     } catch (erro) {
//         console.error("Erro ao tentar autenticar: ", erro);
//         return res.status(500).json({ message: "Erro ao tentar autenticar", error: erro.message || erro });
//     }
// }

// const bcrypt = require("bcrypt");

function cadastrar(req, res) {
    var razaoSocial = req.body.razaoSocial;
    var cpf = req.body.cpf;
    var cnpj = req.body.cnpj;
    var nomeFantasia = req.body.nomeFantasia;
    var telefone = req.body.telefone;
    var representanteLegal = req.body.representanteLegal;
    var email = req.body.email;
    var senha = req.body.senha;
    var logradouro = req.body.logradouro;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;
    var cep = req.body.cep;


    console.log("== Dados Recebidos no EmpresaController ==")

    console.log({
        razaoSocial,
        nomeFantasia,
        cnpj,
        telefone,
        representanteLegal,
        email,
        cpf,
        senha,
        cep,
        logradouro,
        bairro,
        cidade,
        uf
    });

    // Validar CNPJ, CPF e email
    // if (!isValidCnpj(cnpj)) {
    //     return res.status(400).json({ mensagem: "CNPJ inválido! Deve conter 14 dígitos numéricos." });
    // }

    // if (!isValidCpf(cpf)) {
    //     return res.status(400).json({ mensagem: "CPF inválido! Deve conter 11 dígitos numéricos." });
    // }

    // if (!isValidEmail(email)) {
    //     return res.status(400).json({ mensagem: "Email inválido!" });
    // }

    // Verificar se os campos obrigatórios estão preenchidos
    if (!razaoSocial) {
        return res.status(400).send("Razão Social está undefined!");
    } else if (!nomeFantasia) {
        return res.status(400).send("Nome Fantasia está undefined!");
    } else if (!telefone) {
        return res.status(400).send("Telefone está undefined!");
    } else if (!representanteLegal) {
        return res.status(400).send("Representante Legal está undefined!");
    } else if (!email) {
        return res.status(400).send("Email está undefined!");
    } else if (!senha) {
        return res.status(400).send("Senha está undefined!");
    } else if (!logradouro) {
        return res.status(400).send("Logradouro está undefined!");
    } else if (!bairro) {
        return res.status(400).send("Bairro está undefined!");
    } else if (!cidade) {
        return res.status(400).send("Cidade está undefined!");
    } else if (!uf) {
        return res.status(400).send("UF está undefined!");
    } else if (!cep) {
        return res.status(400).send("CEP está undefined!");
    }

    // Aqui, você pode ajustar a inserção no banco de dados (modelo de cadastro)
    empresaModel.cadastrar(
        razaoSocial, nomeFantasia, cnpj, telefone, representanteLegal, email,
        cpf, senha, logradouro, bairro, cidade, uf, cep
    )
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao cadastrar:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}


// Outras funções do controlador
// function buscarPorCnpj(req, res) {
//     const cnpj = req.query.cnpj;

//     empresaModel
//         .buscarPorCnpj(cnpj)
//         .then((resultado) => {
//             res.status(200).json(resultado);
//         })
//         .catch((erro) => {
//             console.error("Erro ao buscar por CNPJ:", erro);
//             res.status(500).json({ mensagem: "Erro ao buscar empresa por CNPJ." });
//         });
// }

// function listar(req, res) {
//     empresaModel
//         .listar()
//         .then((resultado) => {
//             res.status(200).json(resultado);
//         })
//         .catch((erro) => {
//             console.error("Erro ao listar empresas:", erro);
//             res.status(500).json({ mensagem: "Erro ao listar empresas." });
//         });
// }

// function buscarPorId(req, res) {
//     const id = req.params.id;

//     empresaModel
//         .buscarPorId(id)
//         .then((resultado) => {
//             res.status(200).json(resultado);
//         })
//         .catch((erro) => {
//             console.error("Erro ao buscar por ID:", erro);
//             res.status(500).json({ mensagem: "Erro ao buscar empresa por ID." });
//         });
// }

// Exportar as funções
module.exports = {
    cadastrar,
    // buscarPorCnpj,
    // listar,
    // buscarPorId,
    // autenticarEmpresa,
};
