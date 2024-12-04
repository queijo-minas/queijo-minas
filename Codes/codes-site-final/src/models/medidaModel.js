var database = require("../database/config");

// Função para buscar as últimas medidas
function buscarUltimasMedidas(idAquario, limite_linhas) {
    var instrucaoSql = `
        SELECT 
            dht11_temperatura as temperatura, 
            dht11_umidade as umidade,
            momento,
            DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
        FROM medida
        WHERE fk_aquario = ${idAquario}
        ORDER BY id DESC
        LIMIT ${limite_linhas};
    `;

    console.log("Executando a instrução SQL (últimas medidas): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Função para buscar medidas em tempo real
function buscarMedidasEmTempoReal(idDadosSensor) {
    var instrucaoSql = `
        SELECT 
            temperatura as temperatura, 
            umidade as umidade,
            DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico, 
            fkSensor 
        FROM dadosSensor
        WHERE fkSensor = ${idDadosSensor}
        ORDER BY idDadosSensor DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL (tempo real): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function calcularTempoForaIdeal(fkSensor) {
    const query = `
        SELECT 
            fkSensor,
            SUM(
                CASE 
                    WHEN temperatura < 7 OR temperatura > 14 THEN 1 
                    ELSE 0 
                END
            ) AS tempo_fora_ideal_temperatura,
            SUM(
                CASE 
                    WHEN umidade < 75 OR umidade > 95 THEN 1 
                    ELSE 0 
                END
            ) AS tempo_fora_ideal_umidade
        FROM dadosSensor
        WHERE fkSensor = ${fkSensor}
        GROUP BY fkSensor;
    `;

    return database.executar(query);
}




module.exports = {
    buscarUltimasMedidas,
    calcularTempoForaIdeal,
    buscarMedidasEmTempoReal
};
