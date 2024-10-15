function validarSenha(){
    const senha = input_senha.value 

    if( senha.length >= 7 ){
        validacaoSenha.innerHTML = `Senha Válida`
    }else {
        validacaoSenha.innerHTML = `Sua senha está inválida`
    }

}

function gerarSenha(){
var senhaAutoGerada = ``
var Catalogo = `aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPrRsStTuUvVwWxXyYzZ0123456789!@#$%&*_-+=`


for(i=0; i<7; i++){
    senhaAutoGerada += Catalogo[parseInt(Math.random() * 71)]
}

input_senha.value = senhaAutoGerada

validarSenha()

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
        validacaoCNPJ.innerHTML = `CNPJ válido, ${fraseCorrigida}`

    }

    

} else {
    validacaoCNPJ.innerHTML = `CNPJ inválido, insira apenas os números necessários (14 digitos)` 
}




}


function validarEmail(){
    const email = email_input.value 

    if( email.indexOf('@') > -1 && email.indexOf('.com') > -1){
        validacaoEmail.innerHTML = `E-mail Válido`
    }else {
        validacaoEmail.innerHTML = `Sua e-mail está inválido`
    }

}


function validarCPF(){
    const cpf = input_CPF.value 
    var cpfSemantico = ``

    if(cpf.length == 11){
        for( posição = 0; posição < 11; posição ++) {
            if(posição == 3 || posição == 6){
                cpfSemantico += `.`
            }if (posição == 9){
                cpfSemantico += `-`
            }

            cpfSemantico += cpf[posição]

            validacaoCPF.innerHTML = `Seu CPF está válido ${cpfSemantico}`

            input_CPF.value = cpfSemantico

        }
    }else {
        validacaoCPF.innerHTML = `CPF inválido, insira apenas a quantidade correta de números (11)`
    }


}