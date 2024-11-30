// "SCRIPT DO USUÁRIO"

// AQUI COLOCAMOS VALIDAÇÕES DO FORMULÁRIO APENAS DO USUÁRIO,
// O FETCH DO USUÁRIO, AS VARIÁVEIS QUE USAREMOS PRA API INTEIRA EM RELAÇÃO APENAS AO USUÁRIO; 
// NÃO ALTERE POIS ESTÁ FUNCIONAL!!!
//SE ADICIONAR/DELETAR/ALTERAR ALGUM CAMPO FAÇA ISSO NO USUÁRIO CONTROLLER, USUÁRIO MODEL, TABELA USUÁRIO DO BD



// "CADASTRAR EMPRESA" DO SCRIPT, ESTÁ FUNCIONAL!
//SE ADICIONAR/DELETAR/ALTERAR ALGUM CAMPO FAÇA ISSO NO USUÁRIO CONTROLLER, USUÁRIO MODEL, TABELA USUÁRIO DO BD

// o trim tira os espaços em branco
function cadastrarUsuario() {
    const nomeVar = document.querySelector(".signup-form .input-box input[placeholder='Digite seu nome']").value.trim();
    const cpfVar = cpfFinal;
    const emailVar = email_input.value.trim();
    const telefoneVar = telefone_input.value.trim();
    const senhaVar = senha_input.value.trim();
    const confirmacaoSenhaVar = confirmacao_senha_input.value.trim();
    const codigoVinculoVar = codigo_input.value.trim();
    const tipoUsuarioVar = input_tipo.value
    if (!nomeVar || !cpfVar || !emailVar || !telefoneVar || !senhaVar || !confirmacaoSenhaVar || !codigoVinculoVar || !tipoUsuarioVar) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    //validarCPF(); 


    if (senhaVar !== confirmacaoSenhaVar) {
        alert("As senhas não coincidem.");
        return false;
    }

    console.log({
        nomeServer: nomeVar,
        cpfServer: cpfVar,
        emailServer: emailVar,
        telefoneServer: telefoneVar,
        senhaServer: senhaVar,
        codigoVinculoServer: codigoVinculoVar,
        tipoUsuarioServer: tipoUsuarioVar,
    });


    // ENVIA OS DADOS USANDO O FETCH

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            cpfServer: cpfVar,
            emailServer: emailVar,
            telefoneServer: telefoneVar,
            senhaServer: senhaVar,
            codigoVinculoServer: codigoVinculoVar,
            tipoUsuarioServer: tipoUsuarioVar,
        }),
    })
        .then((resposta) => {
            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando para o login...");
                setTimeout(() => (
                    sessionStorage.setItem("NOME_USUARIO", json.nome),
                    window.location = "login.html"), 2000);
            } else {
                alert("Houve um erro ao tentar realizar o cadastro.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao cadastrar usuário:", erro);
            alert("Erro ao realizar o cadastro.");
        });

    return false;
}



// USUÁRIO AUTENTICAR, NÃO ALTERE, ESTÁ FUNCIONAL!!!
//SE ADICIONAR/DELETAR/ALTERAR ALGUM CAMPO FAÇA ISSO NO USUÁRIO CONTROLLER, USUÁRIO MODEL, TABELA USUÁRIO DO BD

function entrar() {
    const emailVar = login_email.value;
    const senhaVar = login_senha.value;

    if (emailVar === "" || senhaVar === "") {
        alert("Preencha todos os campos.");
        return false;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
        }),
    })
        .then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((json) => {
                    sessionStorage.setItem("NOME_USUARIO", json.nome);

                    if (json.nomeFantasia) {
                        sessionStorage.setItem("NOME_EMPRESA", json.nomeFantasia);
                    } else {
                        sessionStorage.removeItem("NOME_EMPRESA");
                    }

                    window.location = "/sala-de-maturacao.html";
                });
            } else {
                resposta.text().then((texto) => {
                    alert("Erro ao tentar realizar o login: " + texto);
                });
            }
        })
        .catch((erro) => {
            console.error("Erro ao realizar o login:", erro);
            alert("Erro ao realizar o login.");
        });

    return false;
}



let cpfFinal;

function validarSenha() {
    const senha = senha_input.value;

    if (senha.length >= 7) {
        validacaoSenha.innerHTML = `<div style="color: green;">Senha Válida</div><br>`;
    } else {
        validacaoSenha.innerHTML = `<div style="color: red;">Sua senha está fraca</div><br>`;
    }
}


function confirmacaoSenha() {
    const senha = senha_input.value;
    const confirmacaoSenha = senha_confirmacao_input.value;

    if (senha == confirmacaoSenha) {
        validacaoConfirmacao.innerHTML = `<div style="color: green;">Senha Válida</div><br>`;
    } else {
        validacaoConfirmacao.innerHTML = `<div style="color: red;">As senhas devem ser a mesma</div><br>`;
    }
}


function gerarSenha() {
    var senhaAutoGerada = ``;
    var Catalogo = `aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPrRsStTuUvVwWxXyYzZ0123456789`
    var caractereEspecial = ``

    for (i = 0; i < 6; i++) {
        senhaAutoGerada += Catalogo[parseInt(Math.random() * 60)];
    }

    for (i = 0; i < 1; i++) {
        senhaAutoGerada += Catalogo[parseInt(Math.random() * 11)];
    }
    var novaSenha = ``

    for (posicao = 7; posicao = 0; posicao--) {
        var caractere = ``
        caractere = senhaAutoGerada[parseInt(Math.random() * posicao)]
        senhaAutoGerada = senhaAutoGerada.replaceAll(caractere, "")
        novaSenha += caractere

    }

    senha_input.value = novaSenha;
    senha_input.type = "text";
    senha_confirmacao_input.value = novaSenha;
    senha_confirmacao_input.type = "text";

    validarSenha();
    confirmacaoSenha();
}

function tirarPontuacao(texto = '') {
    var textoFinal = ``
    for (posicao = 0; posicao < texto.length; posicao++) {
        if (texto[posicao] == Number(texto[posicao])) {
            textoFinal += texto[posicao]
        }
    }
    return textoFinal
}


function validarCPF() {
    var cpf = cpf_input.value;
    var cpfSemantico = ``;
    cpf = tirarPontuacao(cpf)

    for (var posição = 0; posição < cpf.length; posição++) {
        if (posição == 3 || posição == 6) cpfSemantico += `.`;
        if (posição == 9) cpfSemantico += `-`;
        cpfSemantico += cpf[posição];
    }

    if (cpf.length == 11) {
        validacaoCPF.innerHTML = `<div style="color: green;">Seu CPF está válido ${cpfSemantico}</div><br>`;
        cpf_input.value = cpfSemantico;
        cpfFinal = cpf
    } else {
        validacaoCPF.innerHTML = `<div style="color: red;">CPF inválido, insira apenas a quantidade correta de números (11)</div><br>`;
        cpf_input.value = cpfSemantico;
        cpfFinal = null
    }
}


// Estrutura do CNPJ 99.999.999/9999-99

function validarCNPJ() {
    var cnpj = cnpj_input.value;
    var cnpjSemantico = ``;
    cnpj = tirarPontuacao(cnpj)

    for (var posição = 0; posição < cnpj.length; posição++) {
        if (posição == 2 || posição == 5) cnpjSemantico += `.`;
        if (posição == 8) cnpjSemantico += `/`;
        if (posição == 12) cnpjSemantico += `-`;
        cnpjSemantico += cnpj[posição];
    }

    if (cnpj.length == 14) {


        validacaoCNPJ.innerHTML = `<div style="color: green;">Seu CNPJ está válido ${cnpjSemantico}</div><br>`;
        cnpjFinal = cnpj
        cnpj_input.value = cnpjSemantico;
    } else {
        validacaoCNPJ.innerHTML = `<div style="color: red;">CNPJ inválido, insira apenas a quantidade correta de números (14)</div><br>`;
        cnpj_input.value = cnpjSemantico;
        cnpjFinal = null

    }
}