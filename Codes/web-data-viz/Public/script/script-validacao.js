/*function validarSenha(){
    const senha = senha_input.value 

    if( senha.length >= 7 ){
        validacaoSenha.innerHTML = `<div style="color: green;">Senha Válida</div><br>`
    }else {
        validacaoSenha.innerHTML = `<div style="color: red;">Sua senha está fraca</div><br>`
    }


}

function confirmacaoSenha(){
    const senha = senha_input.value
    const confirmacaoSenha = confirmacao_senha_input.value
    
    if(senha == confirmacaoSenha){
        validacaoConfirmacao.innerHTML = `<div style="color: green;">Senha Válida</div><br>`
    }else{
        validacaoConfirmacao.innerHTML = `<div style="color: red;">As senhas devem ser a mesma</div><br>`
    }
}

function gerarSenha(){
var senhaAutoGerada = ``
var Catalogo = `aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPrRsStTuUvVwWxXyYzZ0123456789!@#$%&*_-+=`


for(i=0; i<7; i++){
    senhaAutoGerada += Catalogo[parseInt(Math.random() * 71)]
}

senha_input.value = senhaAutoGerada
senha_input.type = "text"
confirmacao_senha_input.value = senhaAutoGerada
confirmacao_senha_input.type = "text"

validarSenha()
confirmacaoSenha()

}



function Validacao() {

        alert("Bem Vindo a Queijo no Ponto, obrigado pela confiança!")
}

// Estrutura do CNPJ 99.999.999/9999-99

function validarCNPJ(){
const CNPJ = cnpj_input.value
var fraseCorrigida = ``

//if( colocar condição de validar o campo se tem os '.', '/', '-' )
    if( CNPJ.length == 14){
    for ( i = 0 ; i < CNPJ.length ; i++){

        
        if(i == 2 || i == 5){
            fraseCorrigida += `.`
        }
        if (i == 8){
            fraseCorrigida += `/`
        }
        if (i == 12){
            fraseCorrigida += `-`
        }
        
        fraseCorrigida += CNPJ[i]
        cnpj_input.value = fraseCorrigida
        validacaoCNPJ.innerHTML =
        `<div style="color: green;">CNPJ válido, ${fraseCorrigida}</div><br>`

    }
    } else {
        validacaoCNPJ.innerHTML = `<div style="color: red;">CNPJ inválido, insira apenas os números necessários (14 digitos)</div><br>`
    }


}


function validarEmail(){
    const email = email_input.value 

    if( email.indexOf('@') > -1 && email.indexOf('.com') > -1){
        validacaoEmail.innerHTML = `<div style="color: green;">E-mail Válido</div><br>`
    }else {
        validacaoEmail.innerHTML = `<div style="color: red;">Sua e-mail está inválido</div><br>`
    }

}


function validarCPF(){
    const cpf = cpf_input.value 
    var cpfSemantico = ``

    if(cpf.length == 11){
        for( posição = 0; posição < 11; posição ++) {
            if(posição == 3 || posição == 6){
                cpfSemantico += `.`
            }if (posição == 9){
                cpfSemantico += `-`
            }

            cpfSemantico += cpf[posição]

            validacaoCPF.innerHTML = `<div style="color: green;">Seu CPF está válido ${cpfSemantico}</div><br>`

            cpf_input.value = cpfSemantico

        }
    }else {
        validacaoCPF.innerHTML = `<div style="color: red;">CPF inválido, insira apenas a quantidade correta de números (11)</div><br>`
    }


}

function validarTelefone(){
    const telefone = telefone_input.value 
    var telefoneSemantico = ``

    if(telefone.length == 11){
        for( posição = 0; posição < 11; posição ++) {
            if(posição == 3 || posição == 6){
                cpfSemantico += `.`
            }if (posição == 9){
                cpfSemantico += `-`
            }

            cpfSemantico += cpf[posição]

            validacaoCPF.innerHTML = `<div style="color: green;">Seu CPF está válido ${cpfSemantico}</div><br>`

            telefone_input.value = cpfSemantico

        }
    }else {
        validacaoCPF.innerHTML = `<div style="color: red;">CPF inválido, insira apenas a quantidade correta de números (11)</div><br>`
    }


}  */



  // Função para listar empresas cadastradas e armazená-las em listaEmpresasCadastradas
  /*function listar() {
    fetch("/empresas/listar", {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((empresas) => {
        listaEmpresasCadastradas = empresas;
        console.log("Empresas cadastradas carregadas:", listaEmpresasCadastradas);
      })
      .catch((erro) => {
        console.error("Erro ao listar empresas:", erro);
      });
  }

  listar(); // Chamar função listar para carregar empresas cadastradas ao carregar a página  */





  // login e cadastro do usu fetch e validçpoes:

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
    const confirmacaoSenha = confirmacao_senha_input.value;

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
}

function tirarPontuacao(texto=''){
    var textoFinal = ``
    for(posicao=0;posicao < texto.length;posicao++){
        if(texto[posicao]==Number(texto[posicao])){
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
        cnpj_input.value = cnpjSemantico;
    } else {
        validacaoCNPJ.innerHTML = `<div style="color: red;">CNPJ inválido, insira apenas a quantidade correta de números (14)</div><br>`;
        cnpj_input.value = cnpjSemantico;

    }
}
