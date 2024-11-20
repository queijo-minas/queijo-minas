function gerarSenha() {
    var senhaAutoGerada = ``;
    var Catalogo = `aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPrRsStTuUvVwWxXyYzZ0123456789`
    var caractereEspecial = ``

    for (i = 0; i < 6; i++) {
        senhaAutoGerada += Catalogo[parseInt(Math.random() * 60)];
    }

    for(i = 0; i < 1; i++){
        senhaAutoGerada += Catalogo[parseInt(Math.random() * 11)];
    }
    var novaSenha = ``

    for(posicao = 7; posicao = 0; posicao--){
        var caractere = ``
        caractere = senhaAutoGerada[parseInt(Math.random()*posicao)]
        senhaAutoGerada = senhaAutoGerada.replaceAll(caractere, "")
        novaSenha += caractere

    }
    senha_input.value = novaSenha;
    senha_input.type = "text";
    confirmacao_senha_input.value = novaSenha;
    confirmacao_senha_input.type = "text";

    validarSenha();
    confirmacaoSenha();

    return [novaSenha,caractere,senhaAutoGerada]
}

console.log(gerarSenha())
