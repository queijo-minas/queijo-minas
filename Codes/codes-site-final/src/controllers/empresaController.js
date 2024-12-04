var empresaModel = require("../models/empresaModel");

// Função para validar os dados obrigatórios
function validarDadosEmpresa(body) {
    const camposObrigatorios = [
        "cnpj",
        "razaoSocial",
        "nomeFantasia",
        "telefone",
        "representanteLegal",
        "email",
        "cpf",
        "senhaEmpresa",
        "cep",
        "logradouro",
        "bairro",
        "cidade",
        "uf",
    ];

    for (const campo of camposObrigatorios) {
        if (!body[campo]) {
            return `Campo obrigatório "${campo}" está faltando.`;
        }
    }
    return null;
}

// Função para validar o formato de CNPJ, CPF e email
function isValidCnpj(cnpj) {
    const regexCnpj = /^\d{14}$/; // Simplificação para validar 14 dígitos numéricos
    return regexCnpj.test(cnpj);
}

function isValidCpf(cpf) {
    const regexCpf = /^\d{11}$/; // Simplificação para validar 11 dígitos numéricos
    return regexCpf.test(cpf);
}

function isValidEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato de email
    return regexEmail.test(email);
}

// Função principal para cadastrar uma empresa
function cadastrar(req, res) {
    // Validar campos obrigatórios
    const erroValidacao = validarDadosEmpresa(req.body);
    if (erroValidacao) {
        return res.status(400).json({ mensagem: erroValidacao });
    }

    // Extrair os dados da requisição
    const {
        cnpj,
        razaoSocial,
        nomeFantasia,
        telefone,
        representanteLegal,
        email,
        cpf,
        senhaEmpresa,
        cep,
        logradouro,
        bairro,
        cidade,
        uf,
    } = req.body;

    // Validar CNPJ, CPF e email
    if (!isValidCnpj(cnpj)) {
        return res.status(400).json({ mensagem: "CNPJ inválido! Deve conter 14 dígitos numéricos." });
    }

    if (!isValidCpf(cpf)) {
        return res.status(400).json({ mensagem: "CPF inválido! Deve conter 11 dígitos numéricos." });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ mensagem: "Email inválido!" });
    }

    console.log("Dados recebidos no backend:", req.body);

    // Chamar o modelo para cadastrar a empresa
    empresaModel
        .cadastrar(
            razaoSocial,
            nomeFantasia,
            cnpj,
            telefone,
            representanteLegal,
            email,
            cpf,
            senhaEmpresa,
            cep,
            logradouro,
            bairro,
            cidade,
            uf
        )
        .then((resultado) => {
            res.status(201).json({ mensagem: "Empresa cadastrada com sucesso!", resultado });
        })
        .catch((erro) => {
            console.error("Erro ao cadastrar empresa:", erro);
            res.status(500).json({
                mensagem: "Erro ao cadastrar empresa",
                detalhes: erro.sqlMessage || "Erro interno no servidor",
            });
        });
}

// Outras funções do controlador
function buscarPorCnpj(req, res) {
    const cnpj = req.query.cnpj;

    empresaModel
        .buscarPorCnpj(cnpj)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar por CNPJ:", erro);
            res.status(500).json({ mensagem: "Erro ao buscar empresa por CNPJ." });
        });
}

function listar(req, res) {
    empresaModel
        .listar()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao listar empresas:", erro);
            res.status(500).json({ mensagem: "Erro ao listar empresas." });
        });
}

function buscarPorId(req, res) {
    const id = req.params.id;

    empresaModel
        .buscarPorId(id)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar por ID:", erro);
            res.status(500).json({ mensagem: "Erro ao buscar empresa por ID." });
        });
}

// Exportar as funções
module.exports = {
    cadastrar,
    buscarPorCnpj,
    listar,
    buscarPorId,
};
