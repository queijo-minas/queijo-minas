USE queijonopontodb;

-- indicar onde inicia o bloco completo.
DELIMITER $$

-- dados simulados para os sensores LM35 e DHT11 ao longo de um dia, gerando valores a cada 30 minutos.
CREATE PROCEDURE GerarDadosDiarios()
BEGIN
    DECLARE startTime DATETIME DEFAULT CURDATE();
    DECLARE endTime DATETIME DEFAULT DATE_ADD(CURDATE(), INTERVAL 1 DAY);
    DECLARE fkSensorLM35 INT DEFAULT 101;
    DECLARE fkSensorDHT11 INT DEFAULT 102;

    WHILE startTime < endTime DO
        -- Insere dados simulados para o sensor LM35
        INSERT INTO dadosSensor (datahora, temperatura, umidade, fkSensor)
        VALUES (
            startTime, 
            ROUND(15 + (RAND() * 10), 2),
            ROUND(40 + (RAND() * 20), 2),
            fkSensorLM35
        );

        -- Insere dados simulados para o sensor DHT11
        INSERT INTO dadosSensor (datahora, temperatura, umidade, fkSensor)
        VALUES (
            startTime, 
            ROUND(20 + (RAND() * 5), 2),
            ROUND(50 + (RAND() * 10), 2),
            fkSensorDHT11
        );

        SET startTime = DATE_ADD(startTime, INTERVAL 30 MINUTE);
    END WHILE;
END$$

DELIMITER ;

-- indicar onde inicia o bloco completo.
DELIMITER $$

-- Trigger para Mover Dados para o Histórico à Meia-Noite
CREATE EVENT IF NOT EXISTS MoverParaHistorico
ON SCHEDULE EVERY 1 DAY
STARTS '2024-11-08 00:00:00'
DO
BEGIN
    -- Insere os dados do dia anterior na tabela de histórico
    INSERT INTO historico_sensor (datahora, temperatura, umidade, fkSensor)
    SELECT datahora, temperatura, umidade, fkSensor
    FROM dadosSensor
    WHERE DATE(datahora) = CURDATE() - INTERVAL 1 DAY;

    -- Apaga os dados do dia anterior da tabela dadosSensor
    DELETE FROM dadosSensor
    WHERE DATE(datahora) = CURDATE() - INTERVAL 1 DAY;
END$$

DELIMITER ;

-- Views para Obter as Médias dos dias anteriores
CREATE VIEW historico_media_diaria AS
SELECT
    fkSensor,
    DATE(datahora) AS data,
    ROUND(AVG(temperatura), 2) AS media_temperatura,
    ROUND(AVG(umidade), 2) AS media_umidade
FROM
    historico_sensor
GROUP BY
    fkSensor, DATE(datahora);

-- View para Obter as Médias do dia atual
CREATE VIEW media_do_dia_atual AS
SELECT
    fkSensor,
    DATE(datahora) AS data,
    ROUND(AVG(temperatura), 2) AS media_temperatura,
    ROUND(AVG(umidade), 2) AS media_umidade
FROM
    dadosSensor
WHERE DATE(datahora) = CURDATE()
GROUP BY
    fkSensor, DATE(datahora);

-- Dados Detalhados de Temperatura e Umidade do Dia Atual
CREATE VIEW dados_detalhados_diarios AS
SELECT
    datahora,
    temperatura,
    umidade,
    fkSensor
FROM
    dadosSensor
WHERE DATE(datahora) = CURDATE();

-- Gera dados simulados para o dia atual
CALL GerarDadosDiarios();

-- Exibe todos os dados gerados no dia atual
SELECT * FROM dadosSensor;

-- Exibe a média do dia atual
SELECT * FROM media_do_dia_atual;

-- Exibe as médias dos dias anteriores
SELECT * FROM historico_media_diaria;

-- Ativação do Agendador de Eventos
SET GLOBAL event_scheduler = ON;
