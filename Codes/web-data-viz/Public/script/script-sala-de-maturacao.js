
const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nomeLocal = form.nomeLocal.value;
    const descricaoLocal = form.descricaoLocal.value;
    const quantidadeEstantes = parseInt(form.quantidadeEstantes.value);
    const area = parseFloat(form.area.value);
    const fkEmpresa = parseInt(form.fkEmpresa.value);

    if (!nomeLocal || !descricaoLocal || !quantidadeEstantes || !area || !fkEmpresa) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    fetch("http://localhost:3333/salas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeLocal,
            descricaoLocal,
            quantidadeEstantes,
            area,
            fkEmpresa,
        }),
    })
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                return resposta.text().then((texto) => {
                    throw new Error(texto);
                });
            }
        })
        .then((json) => {
            alert("Sala cadastrada com sucesso!");
            window.location = "http://localhost:3333/saladematuracao.html"; // Página após o cadastro
        })
        .catch((erro) => {
            console.error("Erro ao cadastrar sala:", erro);
            alert("Erro ao cadastrar sala. Tente novamente.");
        });

    return false;
});
