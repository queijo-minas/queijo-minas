
var database = require("../database/config");

function buscarHistorico(idSala) {
    const query = `
        SELECT 
            ds.dataHora, 
            ds.umidade, 
            ds.temperatura,
            CASE 
                WHEN ds.umidade < 70 OR ds.umidade > 95 OR ds.temperatura < 7 OR ds.temperatura > 15 
                THEN 1 
                ELSE 0 
            END AS alerta
        FROM dadosSensor ds
        JOIN sensor s ON ds.fkSensor = s.idSensor
        JOIN localMaturacao lm ON s.fkLocalMaturacao = lm.idLocalMaturacao
        WHERE lm.idLocalMaturacao = ${idSala}
        ORDER BY ds.dataHora DESC;
    `;

    console.log("Executando query de histórico:\n", query);

    return database.executar(query);
}

module.exports = {
    buscarHistorico,
};




/*var database = require("../database/config");

// Função para buscar o histórico de um local de maturação
exports.buscarHistorico = async (fkLocalMaturacao) => {
    const query = `
        SELECT 
            dataHora, 
            umidade, 
            temperatura,
            CASE 
                WHEN umidade < 70 OR umidade > 95 OR temperatura < 7 OR temperatura > 15 THEN 1 
                ELSE 0 
            END AS alerta
        FROM dadosSensor
        WHERE fkLocalMaturacao = ?
        ORDER BY dataHora DESC
    `;

    const [rows] = await db.execute(query, [fkLocalMaturacao]);
    return rows;
};

// Função para buscar alertas de um local de maturação
exports.buscarAlertas = async (fkLocalMaturacao) => {
    const query = `
        SELECT 
            COUNT(*) AS totalAlertas,
            SUM(TIMESTAMPDIFF(MINUTE, dataHora, NOW())) AS tempoEmAlerta
        FROM dadosSensor
        WHERE fkLocalMaturacao = ? 
          AND (umidade < 70 OR umidade > 95 OR temperatura < 7 OR temperatura > 15)
    `;

    const [rows] = await db.execute(query, [fkLocalMaturacao]);
    return rows[0]; // Retorna o primeiro resultado
};
*/

