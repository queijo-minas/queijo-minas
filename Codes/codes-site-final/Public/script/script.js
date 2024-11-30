// ESSE SCRIPT É GERAL DE FUNÇÕES DINÂMICAS DO SITE, NÃO TEM NADA DE VALIDAÇÕES AQUI,
// SE FOR FAZER VALIDAÇÕES, FAÇA NOS RESPECTIVOS SCRIPTS DA EMPRESA OU DO USUÁRIO!!!


// Seleciona todos os links do menu de navegação
const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
// Seleciona o botão de abrir o menu (versão mobile)
const menuOpenButton = document.querySelector("#menu-open-button");
// Seleciona o botão de fechar o menu (versão mobile)
const menuCloseButton = document.querySelector("#menu-close-button");


// Adiciona um evento de clique no botão de abrir o menu
menuOpenButton.addEventListener("click", () => {
  // Alterna a visibilidade do menu mobile adicionando/removendo a classe 'show-mobile-menu' ao corpo da página
  document.body.classList.toggle("show-mobile-menu");
});


// Quando o botão de fechar o menu for clicado, simula um clique no botão de abrir o menu para fechar o menu
menuCloseButton.addEventListener("click", () => menuOpenButton.click());
// Quando um link do menu de navegação for clicado, fecha o menu mobile simulando um clique no botão de abrir o menu
navbarLinks.forEach((link) => {
  link.addEventListener("click", () => menuOpenButton.click());
});


/* Inicialização do Swiper (biblioteca de sliders) */
let swiper = new Swiper(".slider-wrapper", {
  loop: true, // Permite que o slider gire em loop infinito
  grabCursor: true, // Muda o cursor para uma "mão" ao passar sobre o slider
  spaceBetween: 25, // Espaço entre os slides
  // Configura os botões de paginação (os "bullets" que indicam o slide atual)
  pagination: {
    el: ".swiper-pagination", // Elemento onde os bullets serão exibidos
    clickable: true, // Permite que os bullets sejam clicáveis
    dynamicBullets: true, // Torna os bullets dinâmicos, mudando o tamanho conforme o slide
  },
  // Configura as setas de navegação (próximo/anterior)
  navigation: {
    nextEl: ".swiper-button-next", // Botão de próximo slide
    prevEl: ".swiper-button-prev", // Botão de slide anterior
  },
  /* Configurações de responsividade para o slider */
  breakpoints: {
    0: {
      slidesPerView: 1, // Para telas pequenas (0px ou mais), exibe 1 slide
    },
    768: {
      slidesPerView: 2, // Para telas médias (768px ou mais), exibe 2 slides
    },
    1024: {
      slidesPerView: 3, // Para telas maiores (1024px ou mais), exibe 3 slides
    },
  },
});



