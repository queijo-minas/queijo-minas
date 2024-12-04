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
  
  var cnpjFinal = null;
  var cpfFinal = null;
  
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
  