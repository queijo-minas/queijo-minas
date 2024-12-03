// Funções de validação
function validarNome(nome) {
    if (nome.trim().length > 2) {
      return true;
    } else {
      exibirMensagemErro("Erro: Nome deve conter mais de 2 caracteres.");
      return false;
    }
  }
  
  function validarTelefone(telefone) {
    if (/^\d{10,11}$/.test(telefone)) {1
      return true;
    } else {
      exibirMensagemErro("Erro: Telefone inválido. Deve conter 10 ou 11 dígitos.");
      return false;
    }
  }
  
  function validarReligiao(religiao) {
    if (religiao.trim().length > 2) {
      return true;
    } else {
      exibirMensagemErro("Erro: Religião deve conter mais de 2 caracteres.");
      return false;
    }
  }
  
  function validarEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regexEmail.test(email)) {
      return true;
    } else {
      exibirMensagemErro("Erro: E-mail inválido. Deve conter '@' e '.'");
      return false;
    }
  }
  
  function validarSenha(senha) {
    if (senha.length >= 6) {
      return true;
    } else {
      exibirMensagemErro("Erro: Senha deve conter pelo menos 6 caracteres.");
      return false;
    }
  }
  
  // Exibição de mensagens
  function exibirMensagemErro(mensagem) {
    const cardErro = document.getElementById("cardErro");
    const mensagemErro = document.getElementById("mensagem_erro");
    cardErro.style.display = "block";
    cardErro.style.backgroundColor = "red"; // Erro com fundo vermelho
    mensagemErro.innerHTML = mensagem;
  }
  
  function exibirMensagemSucesso(mensagem) {
    const cardErro = document.getElementById("cardErro");
    const mensagemErro = document.getElementById("mensagem_erro");
    cardErro.style.display = "block";
    cardErro.style.backgroundColor = "green"; // Diferenciar sucesso de erro
    mensagemErro.innerHTML = mensagem;
  }
  
  function sumirMensagem() {
    const cardErro = document.getElementById("cardErro");
    cardErro.style.display = "none";
  }
  function buscarEnderecoPorCEP() {
    const cep = document.getElementById("cep_input").value.replace(/\D/g, "");
    
    // Valida o formato do CEP
    if (!/^[0-9]{8}$/.test(cep)) {
        alert("Formato de CEP inválido. Por favor, digite novamente.");
        limparCamposEndereco();
        return;
    }

    // Busca o CEP na API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao consultar o CEP.");
            return response.json();
        })
        .then((data) => {
            if (data.erro) {
                alert("CEP não encontrado.");
                limparCamposEndereco();
                return;
            }

            // Preenche os campos do formulário
            document.getElementById("logradouro_input").value = data.logradouro;
            document.getElementById("bairro_input").value = data.bairro;
            document.getElementById("cidade_input").value = data.localidade;
            document.getElementById("uf_input").value = data.uf;
        })
        .catch((error) => {
            console.error("Erro ao buscar o CEP:", error);
            alert("Erro ao buscar o CEP. Tente novamente.");
            limparCamposEndereco();
        });
}

function limparCamposEndereco() {
    document.getElementById("logradouro_input").value = "";
    document.getElementById("bairro_input").value = "";
    document.getElementById("cidade_input").value = "";
    document.getElementById("uf_input").value = "";
}
  