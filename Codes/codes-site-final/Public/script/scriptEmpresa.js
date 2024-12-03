// "SCRIPT DA EMPRESA"

// AQUI COLOCAMOS VALIDAÇÕES DO FORMULÁRIO APENAS DA EMPRESA,
// O FETCH DA EMPRESA, AS VARIÁVEIS QUE USAREMOS PRA API INTEIRA EM RELAÇÃO A EMPRESA; 
// NÃO ALTERE POIS ESTÁ FUNCIONAL!!!
// SE ADICIONAR/DELETAR/ALTERAR ALGUM CAMPO FAÇA ISSO NO EMPRESA CONTROLLER, EMPRESA MODEL, TABELA EMPRESA DO BD



// "CADASTRAR EMPRESA" DO SCRIPT, ESTÁ FUNCIONAL!
//SE ADICIONAR/DELETAR/ALTERAR ALGUM CAMPO FAÇA ISSO NO EMPRESA CONTROLLER, EMPRESA MODEL, TABELA EMPRESA DO BD


// Variáveis auxiliares

let cnpjFinal = "";
let cpfFinal = "";

// Função para cadastrar empresa
function cadastrarEmpresa() {
    const razaoSocial = razao_input.value.trim();
    const nomeFantasia = nomeFantasia_input.value.trim();
    const telefone = telefone_input.value.trim();
    const representanteLegal = representante_input.value.trim();
    const email = email_input.value.trim();
    const senhaEmpresa = senha_input.value.trim();

    const CepVar = cep_input.value;
    const logradouroVar = logradouro_input.value;
    const bairroVar = bairro_input.value;
    const cidadeVar = cidade_input.value;
    const ufVar = uf_input.value;

    // Validações adicionais de campos obrigatórios
    if (!razaoSocial || !nomeFantasia || !cnpjFinal || !telefone || !representanteLegal || !email  || !senhaEmpresa  || !CepVar  || !logradouroVar || !bairroVar || !cidadeVar || !ufVar) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    fetch("/empresas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            razaoSocial,
            nomeFantasia,
            cnpj: cnpjFinal,
            telefone,
            representanteLegal,
            email,
            cpf: cpfFinal,
            senhaEmpresa,
        }),
    })
        .then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((json) => {
                    sessionStorage.setItem("NOME_EMPRESA", json.nomeFantasia);
                    alert("Cadastro de empresa realizado com sucesso!");
                    window.location = "entrar.html";
                });
            } else {
                alert("Houve um erro ao tentar realizar o cadastro.");
            }
        })
        .catch((erro) => {
            console.error("Erro:", erro);
            alert("Erro ao realizar o cadastro da empresa.");
        });

    return false;
}


function validarCNPJ() {
    const cnpj = cnpj_input.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cnpj.length === 14) {
        cnpjFinal = cnpj; // Armazena o CNPJ válido
        validacaoCNPJ.innerHTML = `<span style="color: green;">CNPJ válido</span>`;
    } else {
        cnpjFinal = null;
        validacaoCNPJ.innerHTML = `<span style="color: red;">CNPJ inválido. Insira 14 números.</span>`;
    }
}


function validarCPF() {
    const cpf = cpf_input.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cpf.length === 11) {
        cpfFinal = cpf; // Armazena o CPF válido
        validacaoCPF.innerHTML = `<span style="color: green;">CPF válido</span>`;
    } else {
        cpfFinal = null;
        validacaoCPF.innerHTML = `<span style="color: red;">CPF inválido. Insira 11 números.</span>`;
    }
}


function validarSenha() {
    const senha = senha_input.value.trim();
    if (senha.length >= 7) {
        validacaoSenha.innerHTML = `<span style="color: green;">Senha válida</span>`;
    } else {
        validacaoSenha.innerHTML = `<span style="color: red;">Senha deve ter no mínimo 7 caracteres.</span>`;
    }
}


function confirmacaoSenha() {
    const senha = senha_input.value.trim();
    const confirmacaoSenha = senha_confirmacao_input.value.trim();
    if (senha === confirmacaoSenha) {
        validacaoConfirmacao.innerHTML = `<span style="color: green;">Senhas coincidem</span>`;
    } else {
        validacaoConfirmacao.innerHTML = `<span style="color: red;">As senhas não coincidem</span>`;
    }
}

// Função para tirar pontuação (genérica para CNPJ e CPF)
function tirarPontuacao(texto = "") {
    return texto.replace(/\D/g, "");
}



   // aqui recupera o nome do usuario e da empresa que estão no session
   document.addEventListener("DOMContentLoaded", () => {
    // Recupera os dados do sessionStorage
    const nome = sessionStorage.getItem("NOME_USUARIO");
    const nomeFantasia = sessionStorage.getItem("NOME_EMPRESA");

    document.getElementById("nome").textContent = nome;
    document.getElementById("nomeFantasia").textContent = nomeFantasia || "Empresa não informada";
});