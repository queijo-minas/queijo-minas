CREATE DATABASE queijoNoPontoDB;
USE queijoNoPontoDB;

CREATE TABLE login(
idLogin INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(45),
senha VARCHAR(45)
);

CREATE TABLE empresa(
    idEmpresa int primary key auto_increment,
    nome varchar(45),
    cnpj char(14),
    email VARCHAR(60),
    telefone VARCHAR(15),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
logradouro VARCHAR(45),
numero CHAR(6),
cidade VARCHAR(45),
cep CHAR(9),
fkEmpresa INT ,
FOREIGN KEY (fkEmpresa)  REFERENCES empresa(idEmpresa)
);

CREATE TABLE LocalMaturacao (
    idLocalMaturacao INT AUTO_INCREMENT PRIMARY KEY,
    nomeLocal VARCHAR(100), -- Nome do local de maturação (ex: "Sala de Maturação 1")
    descricaoLocal VARCHAR(255), -- Descrição do local
    temperaturaIdeal DECIMAL(5,2), -- Temperatura ideal para maturação
    umidadeIdeal DECIMAL(5,2), -- Umidade ideal para maturação
    capacidadePrateleiras INT, -- Número de prateleiras na sala
    fkEmpresa int,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa) -- Relaciona com a empresa que possui o local
);

CREATE TABLE usuario(
    idUsuario int primary key auto_increment,
    nome varchar(45),
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    fkEmpresa int,
    fkNivelAcesso int,
    fkLogin int,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkNivelAcesso) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkLogin) REFERENCES login(idLogin)
); 

CREATE TABLE UsuarioLocalMaturacao (
	fkLocalMaturacao INT,
    fkUsuario INT,  
    dataAssociacao DATE,
    PRIMARY KEY (fkLocalMaturacao, fkUsuario),
    FOREIGN KEY (fkLocalMaturacao) REFERENCES LocalMaturacao(idLocalMaturacao),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Prateleira (
    idPrateleira INT AUTO_INCREMENT PRIMARY KEY,
    identificacaoPrateleira VARCHAR(50), -- Identificação única da prateleira (ex: "Prateleira A1", "Prateleira B3")
    capacidadeMaxima INT, -- Capacidade máxima de queijos na prateleira
    altura DECIMAL(5,2), -- Altura da prateleira na sala (em metros)
    largura DECIMAL(5,2), -- Largura da prateleira (em metros)
    profundidade DECIMAL(5,2), -- Profundidade da prateleira (em metros)
	fkLocalMaturacao INT, -- Relaciona a prateleira com o local de maturação
    fkEmpresa INT,
    FOREIGN KEY (fkLocalMaturacao) REFERENCES LocalMaturacao(idLocalMaturacao),
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE SensorPrateleira (
    idSensor INT AUTO_INCREMENT PRIMARY KEY,
    tipoSensor VARCHAR(50), -- Tipo do sensor (ex: "Temperatura", "Umidade")
    modeloSensor VARCHAR(50), -- Modelo do sensor (ex: "DHT22", "SHT31")
    dataInstalacao DATE, -- Data de instalação do sensor
	fkPrateleira INT,
    fkEmpresa INT,
    FOREIGN KEY (fkPrateleira) REFERENCES Prateleira(idPrateleira), -- Relaciona com a prateleira
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) 
);

CREATE TABLE DadosSensores (
    idDadosSensor INT AUTO_INCREMENT PRIMARY KEY,
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Armazena o momento da leitura
    temperatura DECIMAL(5,2), -- Armazena a temperatura coletada
    umidade DECIMAL(5,2), -- Armazena a umidade coletada
    fkSensorPrateleira INT, 
    FOREIGN KEY (fkSensorPrateleira) REFERENCES SensorPrateleira(idSensor) -- Relaciona com o sensor de temperatura
);

CREATE TABLE AlertaSensor (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora do alerta
    tipoAlerta VARCHAR(50), -- Ex: "Temperatura Alta", "Umidade Baixa"
    descricaoAlerta VARCHAR(255),
	fkSensorPrateleira INT, 
    fkPrateleira INT,
    fkLocalMaturacao INT,
    fkEmpresa INT,
    FOREIGN KEY (fkSensorPrateleira) REFERENCES SensorPrateleira(idSensor),
    FOREIGN KEY (fkPrateleira) REFERENCES Prateleira(idPrateleira),
    FOREIGN KEY (fkLocalMaturacao) REFERENCES LocalMaturacao(idLocalMaturacao),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE tipoSensor (
    idTipoSensor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL, -- Nome do sensor (LM35, DHT11)
    tipo VARCHAR(45) NOT NULL, -- Tipo de grandeza medida (Temperatura, Umidade)
    unidadeMedida VARCHAR(5) NOT NULL, -- Unidade de medida (°C, %)
    valorMinimo DECIMAL(5,2), -- Faixa mínima de operação
    valorMaximo DECIMAL(5,2), -- Faixa máxima de operação
    quantidadeTotal INT, -- Quantidade total desse tipo de sensor
    fkSensorPrateleira INT,
    fkDadosSensores INT,
	FOREIGN KEY (fkSensorPrateleira) REFERENCES SensorPrateleira (idSensor),
    FOREIGN KEY (fkDadosSensores) REFERENCES DadosSensores (idDadosSensor)
);

INSERT INTO login (email, senha) VALUES
('contato@queijariadoponto.com', 'qj536$55'),
('vendas@queijosdaserra.com', 'qj536$55');

INSERT INTO empresa (nome, cnpj, email, telefone) VALUES
('Queijaria do Ponto', '12345678000101', 'contato@queijariadoponto.com', '11988887777'),
('Queijos da Serra', '98765432000102', 'vendas@queijosdaserra.com', '11999996666'),
('Laticínios Boa Vista', '11122233000103', 'fabrica@boavista.com', '1133221100'),
('Delícias do Campo', '44455566000104', 'contato@deliciasdocampo.com', '11988776655'),
('Queijos Artesanais', '55566677000105', 'artesanal@queijosartesanais.com', '11999885555');

INSERT INTO endereco (logradouro, numero, cidade, cep, fkEmpresa) VALUES
('Rua do Queijo', '123', 'Centro', '01001000', 1),
('Av. da Maturação', '321', 'Rio', '22041010', 2),
('Estrada do Leite', '55', 'Campinas', '13040000', 3),
('Rua dos Fazendeiros', '88', 'Sorocaba', '18035000', 4),
('Travessa do Sabor', '22', 'Belo Horizonte', '30140000', 5);

INSERT INTO LocalMaturacao (nomeLocal, descricaoLocal, temperaturaIdeal, umidadeIdeal, capacidadePrateleiras, fkEmpresa) VALUES
('Sala de Maturação 1', 'Sala principal com 10 prateleiras para maturação de queijos', 12.5, 80.0, 10, 1),
('Sala de Maturação 2', 'Sala com temperatura controlada para queijos finos', 14.0, 85.0, 8, 1),
('Sala de Prateleiras Externas', 'Sala auxiliar para queijos de longa maturação', 10.0, 70.0, 15, 2),
('Câmara de Maturação 3', 'Área de controle climático avançado para produção artesanal', 13.0, 82.0, 12, 3),
('Câmara Externa de Maturação', 'Área adicional para maturação em temperatura ambiente', 15.0, 75.0, 4, 4);

INSERT INTO usuario (nome, cpf, telefone, fkEmpresa, fkNivelAcesso, fkLogin) VALUES
('João Silva', '12345678901', '11987654321', 1, 1, 1),
('Maria Souza', '23456789012', '11991234567', 1, 2, 2), 
('José Ferreira', '34567890123', '11999887766', 2, 2, 3);

INSERT INTO UsuarioLocalMaturacao (fkLocalMaturacao, fkUsuario, dataAssociacao) VALUES
(1, 1, '2024-09-30'),
(2, 1, '2024-09-30'),
(1, 2, '2024-09-30');

INSERT INTO Prateleira (identificacaoPrateleira, capacidadeMaxima, altura, largura, profundidade, fkLocalMaturacao, fkEmpresa) VALUES
('Prateleira A1', 50, 2.0, 1.5, 0.6, 1, 1),
('Prateleira A2', 60, 2.5, 1.8, 0.7, 1, 1),
('Prateleira B1', 40, 1.8, 1.2, 0.5, 2, 1),
('Prateleira B2', 45, 2.0, 1.3, 0.6, 2, 1),
('Prateleira C1', 55, 2.3, 1.4, 0.8, 3, 2);

INSERT INTO SensorPrateleira (tipoSensor, modeloSensor, dataInstalacao, fkPrateleira, fkEmpresa) VALUES
('Temperatura', 'DHT22', '2024-08-01', 1, 1),
('Umidade', 'SHT31', '2024-08-01', 1, 1),
('Temperatura', 'DHT11', '2024-08-02', 2, 1),
('Umidade', 'DHT22', '2024-08-03', 3, 2),
('Temperatura', 'SHT31', '2024-08-04', 4, 2);

INSERT INTO DadosSensores (temperatura, umidade, fkSensorPrateleira) VALUES
(12.4, 79.8, 1),
(12.5, 80.0, 1),
(13.0, NULL, 2),
(NULL, 85.5, 3),
(14.0, NULL, 4);

INSERT INTO AlertaSensor (tipoAlerta, descricaoAlerta, fkSensorPrateleira, fkPrateleira, fkLocalMaturacao, fkEmpresa) VALUES
('Temperatura Alta', 'A temperatura está acima do ideal na Prateleira A1', 1, 1, 1, 1),
('Umidade Alta', 'A umidade está acima do ideal na Prateleira B1', 3, 3, 2, 2),
('Temperatura Baixa', 'A temperatura está abaixo do ideal na Prateleira A2', 2, 2, 2, 1),
('Temperatura Alta', 'A temperatura está acima do ideal na Prateleira B2', 4, 4, 2, 2),
('Temperatura Alta', 'A temperatura está acima do ideal na Prateleira C1', 5, 5, 3, 2);

INSERT INTO tipoSensor VALUES
('LM35', 'Temperatura', '°C', 8, 18, 10, 1, 2),
('DHT11', 'Temperatura e Umidade', '%', 75, 85, 15, 2, 1);


SHOW TABLES;
SELECT * FROM login;
SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM LocalMaturacao;
SELECT * FROM usuario;
SELECT * FROM UsuarioLocalMaturacao;
SELECT * FROM Prateleira;
SELECT * FROM SensorPrateleira;
SELECT * FROM DadosSensores;
SELECT * FROM AlertaSensor;
SELECT * FROM SensorPrateleira WHERE idSensor IN (1, 2);
SELECT * FROM tipoSensor;