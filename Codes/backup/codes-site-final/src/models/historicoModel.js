const database = require("../database/config");

async function obterHistorico(fkLocalMaturacao) {
    const query = `
        SELECT 
            hs.dataHora,
            hs.umidade,
            hs.temperatura,
            CASE
                WHEN hs.temperatura > 15 THEN 1
                ELSE 0
            END AS alerta,
            COUNT(a.idAlertaSensor) AS totalAlertas,
            SEC_TO_TIME(SUM(TIMESTAMPDIFF(SECOND, a.dataHora, NOW()))) AS tempoEmAlerta
        FROM historicoSensor hs
        LEFT JOIN alertaSensor a ON hs.fkSensor = a.fkSensor AND hs.dataHora = a.dataHora
        WHERE hs.fkSensor IN (SELECT idSensor FROM sensor WHERE fkLocalMaturacao = ?)
        GROUP BY hs.idHistoricoSensor
        ORDER BY hs.dataHora DESC
        LIMIT 20;
    `;
    return database.executar(query, [fkLocalMaturacao]);
}

module.exports = {
    obterHistorico,
};
