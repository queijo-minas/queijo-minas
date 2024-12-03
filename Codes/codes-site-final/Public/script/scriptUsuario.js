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
    const cepVar = document.querySelector(".signup-form .input-box input[placeholder='Digite seu CEP']").value.trim();
    const emailVar = email_input.value.trim();
    const telefoneVar = telefone_input.value.trim();
    const senhaVar = senha_input.value.trim();
    const confirmacaoSenhaVar = confirmacao_senha_input.value.trim();
    const codigoVinculoVar = codigo_input.value.trim();
    const tipoUsuarioVar = input_tipo.value;

    if (!nomeVar || !cpfVar || !cepVar || !emailVar || !telefoneVar || !senhaVar || !confirmacaoSenhaVar || !codigoVinculoVar || !tipoUsuarioVar) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    if (senhaVar !== confirmacaoSenhaVar) {
        alert("As senhas não coincidem.");
        return false;
    }

    // Busca do endereço com base no CEP
    fetch(`https://viacep.com.br/ws/${cepVar.replace("-", "")}/json/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao consultar o CEP.");
            }
            return response.json();
        })
        .then((data) => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            
            const logradouroCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            document.querySelector(".signup-form .input-box input[placeholder='Digite seu endereço']").value = logradouroCompleto;


             // Log no console para verificar o logradouro
             console.log("Logradouro recebido da API ViaCEP:", logradouroCompleto);
             
            // Após obter o endereço, realiza o cadastro
            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeServer: nomeVar,
                    cpfServer: cpfVar,
                    enderecoServer: logradouroCompleto,
                    emailServer: emailVar,
                    telefoneServer: telefoneVar,
                    senhaServer: senhaVar,
                    codigoVinculoServer: codigoVinculoVar,
                    tipoUsuarioServer: tipoUsuarioVar,
                }),
            })
                .then((resposta) => {
                    if (resposta.ok) {
                        return resposta.json()
                            .then((json) => {
                                alert("Cadastro realizado com sucesso! Redirecionando para o login...");
                                sessionStorage.setItem("NOME_USUARIO", json.nome || nomeVar);
                                setTimeout(() => {
                                    window.location = "login.html";
                                }, 2000);
                            });
                    } else {
                        return resposta.text().then((mensagem) => {
                            throw new Error(mensagem || "Erro ao tentar realizar o cadastro.");
                        });
                    }
                })
                .catch((erro) => {
                    console.error("Erro ao cadastrar usuário:", erro);
                    alert("Erro ao realizar o cadastro: " + erro.message);
                });
        })
        .catch((error) => {
            console.error("Erro ao buscar CEP:", error);
            alert("Erro ao buscar o CEP. Tente novamente.");
        });

    return false;
}
// Função para validar CPF
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

// Função para validar a senha
function validarSenha() {
    const senha = senha_input.value.trim();
    if (senha.length >= 7) {
        validacaoSenha.innerHTML = `<span style="color: green;">Senha válida</span>`;
    } else {
        validacaoSenha.innerHTML = `<span style="color: red;">Senha deve ter no mínimo 7 caracteres.</span>`;
    }
}

// Função para confirmar a senha
function confirmacaoSenha() {
    const senha = senha_input.value.trim();
    const confirmacaoSenha = senha_confirmacao_input.value.trim();
    if (senha === confirmacaoSenha) {
        validacaoConfirmacao.innerHTML = `<span style="color: green;">Senhas coincidem</span>`;
    } else {
        validacaoConfirmacao.innerHTML = `<span style="color: red;">As senhas não coincidem</span>`;
    }
}

// Ajustar atributos de autocomplete
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#login_email").setAttribute("autocomplete", "username");
    document.querySelector("#login_senha").setAttribute("autocomplete", "current-password");
    document.querySelector("#senha_input").setAttribute("autocomplete", "new-password");
    document.querySelector("#confirmacao_senha_input").setAttribute("autocomplete", "new-password");
});


// Função para autenticar usuário
function entrar() {
    const emailVar = login_email.value.trim();
    const senhaVar = login_senha.value.trim();

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
                    sessionStorage.setItem("TIPO_USUARIO", json.tipoUsuario);

                    if (json.nomeFantasia) {
                        sessionStorage.setItem("NOME_EMPRESA", json.nomeFantasia);
                    } else {
                        sessionStorage.removeItem("NOME_EMPRESA");
                    }

                    // Armazena o id da empresa
                    if (json.idEmpresa) {
                        sessionStorage.setItem("ID_EMPRESA", json.idEmpresa);
                    } else {
                        sessionStorage.removeItem("ID_EMPRESA");
                    }

                    // Redireciona para a página correta
                    if (json.tipoUsuario === "administrador") {
                        window.location = "/bobia.html";
                    } else {
                        window.location = "/sala-de-maturacao.html";
                    }
                });
            } else {
                resposta.text().then((mensagem) => {
                    alert("Erro ao tentar realizar o login: " + mensagem);
                });
            }
        })
        .catch((erro) => {
            console.error("Erro ao realizar o login:", erro);
            alert("Erro ao realizar o login.");
        });

    return false;
}