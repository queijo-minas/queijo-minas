function Calcular() {
   
    // Pegar os valores inseridos pelo usuário
    const ProduzidoAnual = Number(input_produção_Kilos.value); // Quantidade de Kg produzidos anualmente
    const valorKg = Number(input_venda_Kilo.value); // Valor de venda por Kg
    const GastoKg = Number(input_gasto_por_KG.value); // Custo por Kg de produção
    const AnosQueDesejaInvestir = Number(input_anos_que_deseja_investir.value); // Anos que deseja investir

    // Cálculo da perda por produção (supondo que 20% da produção é perdida)
    var PerdaPorProducao = ProduzidoAnual * 0.20;

    // Cálculo do ganho por Kg produzido (diferença entre valor de venda e custo por Kg)
    var GanhoPorProducaoKg = valorKg - GastoKg;

    // Cálculo da perda cessante (perda total multiplicada pelo ganho por Kg)
    var PerdaCessanteAnual = PerdaPorProducao * GanhoPorProducaoKg;

    // Ajuste de 80% sobre a perda cessante
    var PerdaCessanteAjustadaAnual = PerdaCessanteAnual * 0.80;

    // Variável para acumular a perda cessante ao longo dos anos
    var TotalPerdaCessante = 0;

    // Loop para acumular a perda cessante ao longo dos anos que o usuário deseja investir
     div_exibir.innerHTML = ``
    for (var ano = 1; ano <= AnosQueDesejaInvestir; ano++) {
        TotalPerdaCessante += PerdaCessanteAjustadaAnual;
 
        div_exibir.innerHTML += `Perda Cessante no <b>${ano} º ano</b> pode ser até: 
                        <b>R$ ${TotalPerdaCessante.toLocaleString('pt-BR', { slyte: 'currency', currency: 'BRL' })}</b><br>`
    }

    // Exibir o resultado final
    div_exibir.innerHTML += `Perda Cessante Total ao longo de <b> ${AnosQueDesejaInvestir} anos</b> pode chegar até:
                 <b>R$ ${TotalPerdaCessante.toLocaleString('pt-BR', { slyte: 'currency', currency: 'BRL' })}</b>  <br>`
    
}
 //de onde vem a informação
 //a perda cessante e lucro cessante
 //pesquisar queijo estragado, multas...
 //quanto tempo o produtor deixa o quijo maturando