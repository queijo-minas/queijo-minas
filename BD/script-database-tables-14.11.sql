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
    senhaEmpresa VARCHAR(255)
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
    senha VARCHAR(255),
    fkEmpresa INT,
    fkEndereco INT UNIQUE,
    tipo varchar(45),
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

DELIMITER $$

CREATE TRIGGER before_usuario_insert
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    -- Criptografar a senha usando SHA-256 antes de inserir
    SET NEW.senha = SHA2(NEW.senha, 256);
END$$

DELIMITER ;

INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, representanteLegal, cpf, telefone, email, senha) VALUES
('Tech Solutions Ltda', 'TechSol', '12345678000195', 'João Silva', '12345678901', '21999999999', 'contato@techsol.com', 'abcd1234');

INSERT INTO endereco (rua, numero, cidade, cep, fkEmpresa) VALUES
('Rua das Flores', '123', 'Rio de Janeiro', '20040001', 101);

INSERT INTO usuario (nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco, tipo) VALUES
('Carlos Lima', '12312312300', '21988887777', 'carlos@techsol.com', 'mnop3456', 101, 101, 'Administrador');

insert into usuario values
(default, 'pedro leão', '17316315380', '12121212121', 'pedroleao@gmail.com', 'abc123', 102, null, 'funcionario');

ALTER TABLE usuario MODIFY COLUMN cpf VARCHAR(14);	

 SELECT usuario.idUsuario AS id, usuario.nome, usuario.tipo as tipo, usuario.email, empresa.nomeFantasia AS nomeFantasia
    FROM usuario
    LEFT JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa;

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
    
    
