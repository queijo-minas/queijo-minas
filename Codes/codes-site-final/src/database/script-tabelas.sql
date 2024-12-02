-- Criação do banco de dados
DROP DATABASE IF EXISTS queijonopontodb;
CREATE DATABASE queijonopontodb;
USE queijonopontodb;

-- Tabela Endereço
CREATE TABLE endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(255),
    bairro VARCHAR(255),
    localidade VARCHAR(255),
    uf CHAR(2),
    ddd CHAR(2)
);

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
    senhaEmpresa VARCHAR(10),
	fkEndereco INT UNIQUE,
    FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco)
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
    tipo VARCHAR(45),
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

-- INSERTS PARA TESTE:


-- Inserções na tabela Empresa
INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, representanteLegal, cpf, telefone, email, senhaEmpresa) 
VALUES 
('Queijo Artesanal Ltda', 'Queijos da Serra', '12345678000123', 'João Silva', '12345678901', '35999999999', 'joao@queijodaserra.com', 'senha123'),
('Delícias do Queijo ME', 'Delícias do Queijo', '98765432000189', 'Maria Oliveira', '98765432101', '31988888888', 'maria@deliciasdoqueijo.com', 'senha456'),
('Maturação Gourmet SA', 'Gourmet Queijos', '45678912000145', 'Pedro Almeida', '45678912345', '31977777777', 'pedro@gourmetqueijos.com', 'senha789');


-- Inserções na tabela Usuário
INSERT INTO usuario (nome, cpf, telefone, email, senha, fkEmpresa, 
VALUES 
('Ana Souza', '12312312312', '35911111111', 'ana.souza@empresa.com', 'senha321', 101),
('Carlos Lima', '32132132132', '31922222222', 'carlos.lima@empresa.com', 'senha654', 102),
('Beatriz Ramos', '23123123123', '31933333333', 'beatriz.ramos@empresa.com', 'senha987',  103);

-- ADICIONANDO UM ADIMINISTRADOR::: SE USAR ESSE LOGIN DE ADM REDIRECIONA PRA BOBIA!!!!!
INSERT INTO usuario (nome, cpf, telefone, email, senha, fkEmpresa, tipoUsuario) 
VALUES 
('Duda Ramos', '13123123123', '21933333333', 'duda.ramos@empresa.com', 'senha888', 106, 'administrador');


-- Inserções na tabela Local Maturação
INSERT INTO localMaturacao (nomeLocal, descricaoLocal, capacidadeEstantes, areaSala, fkEmpresa) 
VALUES 
('Sala 1', 'Sala climatizada para maturação de queijos finos.', 10, '20m²', 101),
('Sala 2', 'Espaço dedicado à maturação de queijos frescos.', 15, '30m²', 102),
('Sala 3', 'Área para armazenamento e controle de queijos artesanais.', 20, '40m²', 103);

-- Inserções na tabela Local Maturação e Usuário
INSERT INTO localMaturacaoUsuario (dataAssociacao, fkUsuario, fkLocalMaturacao) 
VALUES 
('2024-11-01', 101, 101),
('2024-11-02', 102, 102),
('2024-11-03', 103, 103);

-- Inserções na tabela Sensor
INSERT INTO sensor (nome, unidadeMedida, modeloSensor, dataInstalacao, quantidadeTotal, fkLocalMaturacao) 
VALUES 
('Sensor Temp. 1', 'Celsius', 'DHT11', '2024-11-01', 5, 101),
('Sensor Umid. 2', 'Percentual', 'DHT22', '2024-11-02', 3, 102),
('Sensor Temp/Umid 3', 'Celsius/Percentual', 'BME280', '2024-11-03', 4, 103);

-- Inserções na tabela Dados do Sensor
INSERT INTO dadosSensor (temperatura, umidade, fkSensor) 
VALUES 
(22.5, 60.3, 101),
(21.0, 58.7, 102),
(23.8, 62.1, 103);

-- Inserções na tabela Alerta do Sensor
INSERT INTO alertaSensor (tipoAlerta, descricaoAlerta, valorMinimo, valorMaximo, fkSensor) 
VALUES 
('Temperatura Alta', 'Temperatura acima do limite permitido.', 20.0, 25.0, 101),
('Umidade Baixa', 'Umidade abaixo do ideal.', 50.0, 70.0, 102),
('Temperatura/Umidade Fora do Padrão', 'Valores fora do padrão aceitável.', 18.0, 30.0, 103);

-- Inserções na tabela Histórico do Sensor
INSERT INTO historicoSensor (umidade, temperatura, fkSensor) 
VALUES 
(61.0, 22.8, 101),
(59.0, 21.2, 102),
(63.5, 24.0, 103);

-- Inserções na tabela Limites Ideais
INSERT INTO limitesIdeais (tipo, valor_min, valor_max, fkSensor) 
VALUES 
('Temperatura', 18.0, 25.0, 101),
('Umidade', 50.0, 70.0, 102),
('Temperatura e Umidade', 18.0, 30.0, 103);
