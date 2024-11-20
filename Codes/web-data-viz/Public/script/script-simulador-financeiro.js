function mostrarCamposPerda() {
    const opcaoPerda = document.getElementById('input_perda_opcao').value;
    const divPerdaManual = document.getElementById('div_perda_manual');

    if (opcaoPerda === 'manual') {
        divPerdaManual.innerHTML = `
            <p>Taxa de perda na fase de maturação (%):</p>
            <input type="number" id="input_perda_maturacao">
            <p>Taxa de perda por outros motivos (%):</p>
            <input type="number" id="input_perda_outros">
        `;
    } else {
        divPerdaManual.innerHTML = '';
    }
}

function Calcular() {
    // Pegando a escolha de mensal ou anual
    const medidaTempo = document.getElementById('input_tempo_producao').value;

    // Pegando os valores de entrada
    const producao = Number(document.getElementById('input_producao_Kilos').value); // Produção de queijo (em Kg)
    const valorKg = Number(document.getElementById('input_venda_Kilo').value); // Valor de venda por Kg
    const GastoKg = Number(document.getElementById('input_gasto_por_KG').value); // Gasto por Kg de produção

    // Valores padrão de taxa de perda
    let taxaPerdaMaturacao = 0.12; // 12% perda na maturação
    let taxaPerdaOutros = 0.08;     // 8% perda por outros motivos
    let taxaPerdaTotal = 0.20;      // 20% taxa de perda total
    let porcentagemEconomia = 0.80; // 80% de economia sobre a perda na maturação

    // Se o usuário escolheu inserir manualmente as taxas de perda
    if (document.getElementById('input_perda_opcao').value === 'manual') {
        taxaPerdaMaturacao = Number(document.getElementById('input_perda_maturacao').value) / 100;
        taxaPerdaOutros = Number(document.getElementById('input_perda_outros').value) / 100;
        taxaPerdaTotal = taxaPerdaMaturacao + taxaPerdaOutros;

        // A porcentagem de economia será baseada na taxa de perda na maturação
        porcentagemEconomia = taxaPerdaMaturacao / taxaPerdaTotal;
    }

    // Calculando o lucro por Kg (valor de venda - custo de produção)
    const lucro = valorKg - GastoKg;

    // Cálculos de perda e economia com base na escolha (mensal ou anual)
    let PerdaSemMonitoramento, EconomiaComSistema, periodoTexto;

    if (medidaTempo === 'mensal') {
        // Cálculos para mensal
        PerdaSemMonitoramento = producao * (taxaPerdaMaturacao + taxaPerdaOutros) * lucro; // Calcula a perda total mensal
        EconomiaComSistema = PerdaSemMonitoramento * porcentagemEconomia; // Economia com o sistema mensal
        periodoTexto = "mês";
    } else {
        // Cálculos para anual (multiplicando por 12)
        PerdaSemMonitoramento = producao * (taxaPerdaMaturacao + taxaPerdaOutros) * lucro * 12; // Calcula a perda total anual
        EconomiaComSistema = PerdaSemMonitoramento * porcentagemEconomia; // Economia anual
        periodoTexto = "ano";
    }

    // Atualização para exibir resultados
    const resultadoSemMonitoramento = `

<p><b>Perda estimada: </b><br> <b>${(taxaPerdaMaturacao * 100).toFixed(2)}%</b> na fase de maturação.</p>
<hr>
<p><b>Produção ${medidaTempo}:</b> <br> <b> ${producao.toFixed(2)} kg</b> de queijo.</p>
<hr>    
<p><b>Lucro por quilo:</b> <br> <b>R$${lucro.toFixed(2)}</b></p>
<hr>
<p><b>Perda total por ${periodoTexto}:</b> <br> <b>R$${PerdaSemMonitoramento.toLocaleString("pt-BR")}</b></p>

`;

    const resultadoComMonitoramento = `

<p><b>Redução das perdas:</b><br><b> ${(taxaPerdaMaturacao * 100).toFixed(2)}%</b> na maturação.</p>
<hr>
<p><b>Produção ${medidaTempo}:</b><br> <b>${producao.toFixed(2)} kg</b> de queijo.</p>
<hr>
<p><b>Lucro por quilo:<b> <br><b>R$${lucro.toFixed(2)}</b></p>
<hr>
<p><b>Economia mensal:<b> <br><b>R$${EconomiaComSistema.toLocaleString("pt-BR")}</b></p>
<hr class="bottom">
<a class="font" href="https://www.rmqa.com.br/wp-content/uploads/2023/12/tese_efeito_de_diferentes_condicoes_de_maturacao_nas_caracteristicas_do_queijo_minas_artesanal.pdf">Link | Mal monitoramento | Cuidados durante a cura</a>
                 `;


    // Exibindo os resultados na tela
    document.getElementById('resultadosCard').style.display = 'block';
    document.getElementById('resultadoPerda').innerHTML = resultadoSemMonitoramento;
    document.getElementById('resultadoEconomia').innerHTML = resultadoComMonitoramento;
}
