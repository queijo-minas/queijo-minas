-- Criação do banco de dados
CREATE DATABASE queijonopontodb;
USE queijonopontodb;


-- Tabela Empresa
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    nomeFantasia VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    representanteLegal VARCHAR(45) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(45),
    senha VARCHAR(10)
) AUTO_INCREMENT = 101;

-- Tabela Endereço
CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(45),
    numero CHAR(6),
    cidade VARCHAR(45),
    cep CHAR(9),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
) AUTO_INCREMENT = 101;

-- Tabela Usuário
CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    email VARCHAR(45),
    senha VARCHAR(10),
    fkEmpresa INT,
    fkEndereco INT UNIQUE,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa), 
    FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco)
) AUTO_INCREMENT = 101;

-- Tabela Local Maturação
CREATE TABLE localMaturacao (
    idLocalMaturacao INT PRIMARY KEY AUTO_INCREMENT,
    nomeLocal VARCHAR(100),
    descricaoLocal VARCHAR(255),
    capacidadeEstantes INT,
    areaSala VARCHAR(45),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
) AUTO_INCREMENT = 101;

-- Tabela Local Maturação e Usuário (associação)
CREATE TABLE localMaturacaoUsuario (
    idLocalMaturacaoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    dataAssociacao DATE,
    fkUsuario INT,
    fkLocalMaturacao INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkLocalMaturacao) REFERENCES localMaturacao(idLocalMaturacao)
) AUTO_INCREMENT = 101;

-- Tabela Sensor
CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    unidadeMedida VARCHAR(45),
    modeloSensor VARCHAR(50),
    dataInstalacao DATE,
    quantidadeTotal INT,
    fkLocalMaturacao INT,
    FOREIGN KEY (fkLocalMaturacao) REFERENCES localMaturacao(idLocalMaturacao)
) AUTO_INCREMENT = 101;

-- Tabela Dados do Sensor
CREATE TABLE dadosSensor (
    idDadosSensor INT AUTO_INCREMENT,
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    temperatura DECIMAL(5,2),
    umidade DECIMAL(5,2),
    fkSensor INT,
    PRIMARY KEY (idDadosSensor, fkSensor),
    FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
) AUTO_INCREMENT = 101;

-- Tabela Alerta do Sensor
CREATE TABLE alertaSensor (
    idAlertaSensor INT AUTO_INCREMENT,
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipoAlerta VARCHAR(50),
    descricaoAlerta VARCHAR(255),
    valorMinimo DECIMAL(5,2),
    valorMaximo DECIMAL(5,2),
    fkSensor INT,
    PRIMARY KEY (idAlertaSensor, fkSensor),
    FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
) AUTO_INCREMENT = 101;

-- Tabela Histórico do Sensor
CREATE TABLE historicoSensor (
    idHistoricoSensor INT PRIMARY KEY AUTO_INCREMENT,
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    umidade DECIMAL(5,2),
    temperatura DECIMAL(5,2),
    fkSensor INT,
    FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
) AUTO_INCREMENT = 101;

CREATE TABLE limitesIdeais (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(25),
    valor_min DECIMAL(5,2),
    valor_max DECIMAL(5,2),
    fkSensor INT, 
    FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

-- SELECT SIMPLES
SHOW TABLES;
SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM usuario;
SELECT * FROM localMaturacao;
SELECT * FROM localMaturacaoUsuario;
SELECT * FROM sensor;
SELECT * FROM dadosSensor;
SELECT * FROM historicoSensor;
SELECT * FROM alertaSensor;
SELECT * FROM limitesideais;

-- Select com join para dados básicos do usuário
SELECT 
    usuario.idUsuario AS 'id usuário',
    usuario.nome AS 'nome do usuário',
    usuario.cpf AS 'cpf',
    usuario.email AS 'login email',
    usuario.senha AS 'senha'
FROM 
    usuario;

-- Select com join e case para verificação de alerta
SELECT 
    ds.idDadosSensor,
    ds.temperatura,
    ds.umidade,
    asensor.tipoAlerta,
    asensor.descricaoAlerta,
    asensor.dataHora AS 'data do alerta',
    CASE 
        WHEN ds.temperatura > asensor.valorMaximo OR ds.umidade < asensor.valorMinimo THEN 'alerta ativo'
        ELSE 'normal'
    END AS 'status alerta'
FROM 
    dadosSensor ds
LEFT JOIN 
    alertaSensor asensor ON ds.fkSensor = asensor.fkSensor
    AND asensor.valorMinimo <= ds.umidade AND asensor.valorMaximo >= ds.temperatura;
