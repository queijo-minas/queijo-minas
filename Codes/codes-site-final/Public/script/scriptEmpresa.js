function cadastrarEmpresa() {
    const razaoSocial = razao_input.value;
    const nomeFantasia = nomeFantasia_input.value;
    const cnpj = cnpjFinal;
    const telefone = telefone_input.value;
    const representanteLegal = representante_input.value;
    const email = email_input.value;
    const cpf = cpfFinal;
    const senhaEmpresa = senha_input.value;

    if (!razaoSocial || !nomeFantasia || !cnpj || !telefone || !representanteLegal || !email || !cpf || !senhaEmpresa) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    fetch("http://localhost:3333/empresas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            razaoSocial,
            nomeFantasia,
            cnpj,
            telefone,
            representanteLegal,
            email,
            cpf,
            senhaEmpresa,
        }),
    })
        .then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((json) => {
                    sessionStorage.setItem("NOME_EMPRESA", json.nomeFantasia);
                    alert("Cadastro de empresa realizado com sucesso!");
                    window.location = "http://localhost:3333/login.html";
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
