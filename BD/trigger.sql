USE queijonopontodb;

-- Início do bloco de comandos
DELIMITER $$

-- Procedure para gerar dados simulados
CREATE PROCEDURE GerarDadosDiarios()
BEGIN
    DECLARE startTime DATETIME DEFAULT CURDATE();
    DECLARE endTime DATETIME DEFAULT DATE_ADD(CURDATE(), INTERVAL 1 DAY);
    DECLARE fkSensorLM35 INT DEFAULT 101;
    DECLARE fkSensorDHT11 INT DEFAULT 102;

    WHILE startTime < endTime DO
        -- Dados para sensor LM35
        INSERT INTO dadosSensor (datahora, temperatura, umidade, fkSensor)
        VALUES (
            startTime, 
            ROUND(15 + (RAND() * 10), 2),
            ROUND(40 + (RAND() * 20), 2),
            fkSensorLM35
        );

        -- Dados para sensor DHT11
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

-- Evento para mover dados para o histórico à meia-noite
DELIMITER $$
CREATE EVENT IF NOT EXISTS MoverParaHistorico
ON SCHEDULE EVERY 1 DAY
STARTS '2024-11-08 00:00:00'
DO
BEGIN
    INSERT INTO historicoSensor (datahora, temperatura, umidade, fkSensor)
    SELECT datahora, temperatura, umidade, fkSensor
    FROM dadosSensor
    WHERE DATE(datahora) = CURDATE() - INTERVAL 1 DAY;

    DELETE FROM dadosSensor
    WHERE DATE(datahora) = CURDATE() - INTERVAL 1 DAY;
END$$

DELIMITER ;

-- Views para médias diárias
CREATE VIEW historico_media_diaria AS
SELECT
    fkSensor,
    DATE(datahora) AS data,
    ROUND(AVG(temperatura), 2) AS media_temperatura,
    ROUND(AVG(umidade), 2) AS media_umidade
FROM
    historicoSensor
GROUP BY
    fkSensor, DATE(datahora);

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

-- Dados detalhados diários
CREATE VIEW dados_detalhados_diarios AS
SELECT
    datahora,
    temperatura,
    umidade,
    fkSensor
FROM
    dadosSensor
WHERE DATE(datahora) = CURDATE();

-- Gerar dados simulados para o dia atual
CALL GerarDadosDiarios();

-- Exibe dados gerados no dia atual
SELECT * FROM dadosSensor;

-- Exibe média do dia atual
SELECT * FROM media_do_dia_atual;

-- Exibe médias dos dias anteriores
SELECT * FROM historico_media_diaria;

-- Ativação do Agendador de Eventos
SET GLOBAL event_scheduler = ON;


-- consulta que calcula o total de tempo fora do intervalo ideal para um determinado período, como o dia atual.
SELECT 
    DATE(datahora) AS data,
    SUM(TIMESTAMPDIFF(MINUTE, datahora, datafim)) AS minutos_fora_da_faixa
FROM 
    alertaSensor
WHERE 
    temperatura < 10 OR temperatura > 12
    AND DATE(datahora) = CURDATE()
GROUP BY 
    DATE(datahora);
    
    
    
-- calcula em porcentagem 
SELECT 
    DATE(datahora) AS data,
    SUM(TIMESTAMPDIFF(MINUTE, datahora, datafim)) / (24 * 60) * 100 AS porcentagem_fora_da_faixa
FROM 
    alertaSensor
WHERE 
    temperatura < 10 OR temperatura > 12
    AND DATE(datahora) = CURDATE()
GROUP BY 
    DATE(datahora);

-- o tempo total que a umidade esteve fora do intervalo ideal durante o dia atual
SELECT 
    DATE(datahora) AS data,
    SUM(TIMESTAMPDIFF(MINUTE, datahora, datafim)) AS minutos_fora_da_faixa
FROM 
    alertaSensor
WHERE 
    (umidade < 60 OR umidade > 70)
    AND DATE(datahora) = CURDATE()
GROUP BY 
    DATE(datahora);
    
    
-- a porcentagem do tempo que a umidade esteve fora da faixa ideal em relação ao dia
    SELECT 
    DATE(datahora) AS data,
    (SUM(TIMESTAMPDIFF(MINUTE, datahora, datafim)) / (24 * 60)) * 100 AS porcentagem_fora_da_faixa
FROM 
    alertaSensor
WHERE 
    (umidade < 60 OR umidade > 70)
    AND DATE(datahora) = CURDATE()
GROUP BY 
    DATE(datahora);
    
    
-- trigger para monitorar a inserção de dados e gerar um alerta sempre que a temperatura ou umidade ultrapassar os limites.
DELIMITER $$

CREATE TRIGGER verifica_alerta AFTER INSERT ON DadosSensor
FOR EACH ROW
BEGIN
    DECLARE limite_min DECIMAL(5,2);
    DECLARE limite_max DECIMAL(5,2);

    -- Verificar se o valor de temperatura está fora dos limites
    SELECT valor_min, valor_max INTO limite_min, limite_max 
    FROM LimitesIdeais WHERE tipo = 'temperatura';

    IF NEW.temperatura < limite_min OR NEW.temperatura > limite_max THEN
        INSERT INTO AlertaSensor (sensor_id, tipo_alarme, valor, data_alarme)
        VALUES (NEW.id, 'Temperatura fora dos limites', NEW.temperatura, NOW());
    END IF;

    -- Verificar se o valor de umidade está fora dos limites
    SELECT valor_min, valor_max INTO limite_min, limite_max 
    FROM LimitesIdeais WHERE tipo = 'umidade';

    IF NEW.umidade < limite_min OR NEW.umidade > limite_max THEN
        INSERT INTO AlertaSensor (sensor_id, tipo_alarme, valor, data_alarme)
        VALUES (NEW.id, 'Umidade fora dos limites', NEW.umidade, NOW());
    END IF;
END$$

DELIMITER ;



