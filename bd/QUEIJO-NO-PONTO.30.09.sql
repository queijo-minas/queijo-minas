CREATE DATABASE queijoNoPontoDB;
USE queijoNoPontoDB;

CREATE TABLE empresa(
    idEmpresa int primary key auto_increment,
    nome varchar(45),
    cnpj char(14),
    email VARCHAR(60),
    telefone VARCHAR(15),
    endereco VARCHAR(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE NivelAcesso (
    idNivelAcesso INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) -- Descrição do nível de acesso (ex: Administrador, Usuário, etc.)
);

CREATE TABLE LocalMaturacao (
    idLocalMaturacao INT AUTO_INCREMENT PRIMARY KEY,
    nomeLocal VARCHAR(100), -- Nome do local de maturação (ex: "Sala de Maturação 1")
    descricaoLocal VARCHAR(255), -- Descrição do local
    temperaturaIdeal DECIMAL(5,2), -- Temperatura ideal para maturação
    umidadeIdeal DECIMAL(5,2), -- Umidade ideal para maturação
    capacidadePrateleiras INT, -- Número de prateleiras na sala
    idEmpresa int,
    FOREIGN KEY (idEmpresa) REFERENCES empresa(idEmpresa) -- Relaciona com a empresa que possui o local
);

CREATE TABLE usuario(
    idUsuario int primary key auto_increment,
    nome varchar(45),
    cpf VARCHAR(11) NOT NULL UNIQUE,
    email VARCHAR(60),
    login VARCHAR(20) NOT NULL UNIQUE,
    senha CHAR(8),
    telefone VARCHAR(15),
    idEmpresa int,
    idNivelAcesso int,
    FOREIGN KEY (idNivelAcesso) REFERENCES NivelAcesso(idNivelAcesso),
    FOREIGN KEY (idEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE UsuarioLocalMaturacao (
    idUsuario INT, -- Chave estrangeira para a tabela usuario
    idLocalMaturacao INT, -- Chave estrangeira para a tabela LocalMaturacao
    dataAssociacao DATE, -- Data em que o usuário foi associado ao local
    PRIMARY KEY (idUsuario, idLocalMaturacao),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idLocalMaturacao) REFERENCES LocalMaturacao(idLocalMaturacao)
);

CREATE TABLE Prateleira (
    idPrateleira INT AUTO_INCREMENT PRIMARY KEY,
    idLocalMaturacao INT, -- Relaciona a prateleira com o local de maturação
    identificacaoPrateleira VARCHAR(50), -- Identificação única da prateleira (ex: "Prateleira A1", "Prateleira B3")
    capacidadeMaxima INT, -- Capacidade máxima de queijos na prateleira
    altura DECIMAL(5,2), -- Altura da prateleira na sala (em metros)
    largura DECIMAL(5,2), -- Largura da prateleira (em metros)
    profundidade DECIMAL(5,2), -- Profundidade da prateleira (em metros)
    FOREIGN KEY (idLocalMaturacao) REFERENCES LocalMaturacao(idLocalMaturacao) -- Relaciona com o local de maturação
);

CREATE TABLE SensorPrateleira (
    idSensor INT AUTO_INCREMENT PRIMARY KEY,
    idPrateleira INT, -- Relaciona o sensor com a prateleira
    tipoSensor VARCHAR(50), -- Tipo do sensor (ex: "Temperatura", "Umidade")
    modeloSensor VARCHAR(50), -- Modelo do sensor (ex: "DHT22", "SHT31")
    dataInstalacao DATE, -- Data de instalação do sensor
    FOREIGN KEY (idPrateleira) REFERENCES Prateleira(idPrateleira) -- Relaciona com a prateleira
);

CREATE TABLE DadosSensor (
    idDadosSensor INT AUTO_INCREMENT PRIMARY KEY,
    idSensor INT, -- Relaciona com o sensor específico
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Armazena o momento da leitura
    temperatura DECIMAL(5,2), -- Armazena a temperatura coletada
    umidade DECIMAL(5,2), -- Armazena a umidade coletada
    FOREIGN KEY (idSensor) REFERENCES SensorPrateleira(idSensor) -- Relaciona com o sensor
);

CREATE TABLE AlertaSensor (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    idSensor INT, -- Relaciona com o sensor
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora do alerta
    tipoAlerta VARCHAR(50), -- Ex: "Temperatura Alta", "Umidade Baixa"
    descricaoAlerta VARCHAR(255), -- Descrição do alerta
    FOREIGN KEY (idSensor) REFERENCES SensorPrateleira(idSensor)
);
INSERT INTO empresa (nome, cnpj, email, telefone, endereco) VALUES
('Queijaria do Ponto', '12345678000101', 'contato@queijariadoponto.com', '11988887777', 'Rua do Queijo, 123, Centro, SP'),
('Queijos da Serra', '98765432000102', 'vendas@queijosdaserra.com', '11999996666', 'Av. da Maturação, 321, Rio, RJ'),
('Laticínios Boa Vista', '11122233000103', 'fabrica@boavista.com', '1133221100', 'Estrada do Leite, 55, Campinas, SP'),
('Delícias do Campo', '44455566000104', 'contato@deliciasdocampo.com', '11988776655', 'Rua dos Fazendeiros, 88, Sorocaba, SP'),
('Queijos Artesanais', '55566677000105', 'artesanal@queijosartesanais.com', '11999885555', 'Travessa do Sabor, 22, Belo Horizonte, MG');

INSERT INTO NivelAcesso (descricao) VALUES
('Administrador'),
('Operador'),
('Comum'); 

INSERT INTO usuario (nome, cpf, email, login, senha, telefone, idEmpresa, idNivelAcesso) VALUES
('João Silva', '12345678901', 'joao@queijariadoponto.com', 'joaoponto', 'abc12345', '11987654321', 1, 1),
('Maria Souza', '23456789012', 'maria@queijariadoponto.com', 'mariasouza', 'xyz98765', '11991234567', 1, 2), 
('José Ferreira', '34567890123', 'jose@queijosdaserra.com', 'joseferreira', 'qwe43210', '11999887766', 2, 3); 

INSERT INTO UsuarioLocalMaturacao (idUsuario, idLocalMaturacao, dataAssociacao) VALUES
(1, 1, '2024-09-30'), -- João Silva responsável pela Sala de Maturação 1
(1, 2, '2024-09-30'), -- João Silva também é responsável pela Sala de Maturação 2
(2, 1, '2024-09-30'); -- Maria Souza responsável pela Sala de Maturação 1


INSERT INTO LocalMaturacao (nomeLocal, descricaoLocal, temperaturaIdeal, umidadeIdeal, capacidadePrateleiras, idEmpresa) VALUES
('Sala de Maturação 1', 'Sala principal com 10 prateleiras para maturação de queijos', 12.5, 80.0, 10, 1),
('Sala de Maturação 2', 'Sala com temperatura controlada para queijos finos', 14.0, 85.0, 8, 1),
('Sala de Prateleiras Externas', 'Sala auxiliar para queijos de longa maturação', 10.0, 70.0, 15, 2),
('Câmara de Maturação 3', 'Área de controle climático avançado para produção artesanal', 13.0, 82.0, 12, 3),
('Câmara Externa de Maturação', 'Área adicional para maturação em temperatura ambiente', 15.0, 75.0, 4, 4);

INSERT INTO Prateleira (idLocalMaturacao, identificacaoPrateleira, capacidadeMaxima, altura, largura, profundidade) VALUES
(1, 'Prateleira A1', 50, 2.0, 1.5, 0.6),
(1, 'Prateleira A2', 60, 2.5, 1.8, 0.7),
(2, 'Prateleira B1', 40, 1.8, 1.2, 0.5),
(2, 'Prateleira B2', 45, 2.0, 1.3, 0.6),
(3, 'Prateleira C1', 55, 2.3, 1.4, 0.8);

INSERT INTO SensorPrateleira (idPrateleira, tipoSensor, modeloSensor, dataInstalacao) VALUES
(1, 'Temperatura', 'DHT22', '2024-08-01'),
(1, 'Umidade', 'SHT31', '2024-08-01'),
(2, 'Temperatura', 'DHT11', '2024-08-02'),
(3, 'Umidade', 'DHT22', '2024-08-03'),
(4, 'Temperatura', 'SHT31', '2024-08-04');

INSERT INTO DadosSensor (idSensor, dataHora, temperatura, umidade) VALUES
(1, '2024-09-01 10:30:00', 12.4, 79.8),
(1, '2024-09-01 11:30:00', 12.5, 80.0),
(2, '2024-09-01 12:00:00', 13.0, NULL),
(3, '2024-09-01 12:15:00', NULL, 85.5),
(4, '2024-09-01 12:45:00', 14.0, NULL);

INSERT INTO AlertaSensor (idSensor, tipoAlerta, descricaoAlerta) VALUES
(1, 'Temperatura Alta', 'A temperatura está acima do ideal na Prateleira A1'),
(3, 'Umidade Alta', 'A umidade está acima do ideal na Prateleira B1'),
(2, 'Temperatura Baixa', 'A temperatura está abaixo do ideal na Prateleira A2'),
(4, 'Temperatura Alta', 'A temperatura está acima do ideal na Prateleira B2'),
(5, 'Temperatura Alta', 'A temperatura está acima do ideal na Prateleira C1');


SHOW TABLES;
SELECT * FROM empresa;
SELECT * FROM usuario;
SELECT * FROM localmaturacao;
SELECT * FROM dadossensor;
SELECT * FROM alertasensor;
SELECT * FROM sensorprateleira;
SELECT * FROM prateleira;

 
