CREATE DATABASE queijoNoPontoDB;
USE queijoNoPontoDB;

CREATE TABLE empresa(
    idEmpresa int primary key auto_increment,
    razaoSocial varchar(45),
    nomeFantasia varchar(45),
    cnpj char(14),
    representanteLegal varchar(45),
    cpf char(11),
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
	fkEmpresa INT unique,
	FOREIGN KEY (fkEmpresa)  REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario(
    idUsuario int primary key auto_increment,
    nome varchar(45),
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    nomeNivelAcesso varchar(45),
    fkEmpresa int,
    fkNivelAcesso int,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkNivelAcesso) REFERENCES usuario(idUsuario)
); 

CREATE TABLE login(
	idLogin INT auto_increment,
	fKUsuario INT unique,
	email VARCHAR(45),
	senha VARCHAR(45),
	FOREIGN KEY (fKUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idLogin, fKUsuario)
);

CREATE TABLE LocalMaturacao (
    idLocalMaturacao INT AUTO_INCREMENT PRIMARY KEY,
    nomeLocal VARCHAR(100), -- Nome do local de maturação (ex: "Sala de Maturação 1")
    descricaoLocal VARCHAR(255), -- Descrição do local
    temperaturaIdeal DECIMAL(5,2), -- Temperatura ideal para maturação
    umidadeIdeal DECIMAL(5,2), -- Umidade ideal para maturação
    capacidadePrateleiras INT, -- Número de prateleiras na sala
    fkEmpresa int unique,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa) -- Relaciona com a empresa que possui o local
);

CREATE TABLE LocalMaturacaoUsuario (
	fkLocalMaturacao INT,
    fkUsuario INT,  
    dataAssociacao DATE,
    PRIMARY KEY (fkLocalMaturacao, fkUsuario),
    FOREIGN KEY (fkLocalMaturacao) REFERENCES LocalMaturacao(idLocalMaturacao),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);


CREATE TABLE Prateleira (
    idPrateleira INT auto_increment,
    identificacaoPrateleira VARCHAR(50), -- Identificação única da prateleira (ex: "Prateleira A1", "Prateleira B3")
    capacidadeMaxima INT, -- Capacidade máxima de queijos na prateleira
    altura DECIMAL(5,2), -- Altura da prateleira na sala (em metros)
    largura DECIMAL(5,2), -- Largura da prateleira (em metros)
    profundidade DECIMAL(5,2), -- Profundidade da prateleira (em metros)
    quantidadeTotal INT, -- Quantidade total desse tipo de sensor
	fkLocalMaturacao INT, -- Relaciona a prateleira com o local de maturação
    primary key (idPrateleira, fkLocalMaturacao),
    FOREIGN KEY (fkLocalMaturacao) REFERENCES LocalMaturacao(idLocalMaturacao)
);

CREATE TABLE SensorPrateleira (
    idSensorPrateleira INT AUTO_INCREMENT,
    nivelPrateleira int,
    dataInstalacao DATE, -- Data de instalação do sensor
    quantidadeTotal INT,
	fkPrateleira INT,
    primary key (idSensorPrateleira, fkPrateleira),
    FOREIGN KEY (fkPrateleira) REFERENCES Prateleira(idPrateleira)
);

CREATE TABLE tipoSensor (
    idSensor INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL, -- Nome do sensor (LM35, DHT11)
    CONSTRAINT chkNome check (nome in('LM35', 'DHT11')),
    tipo VARCHAR(45) NOT NULL, -- Tipo de grandeza medida (Temperatura, Umidade)
    unidadeMedida VARCHAR(5) NOT NULL, -- Unidade de medida (°C, %)
    fkSensorPrateleira INT,
    PRIMARY KEY (idSensor, fkSensorPrateleira),
	FOREIGN KEY (fkSensorPrateleira) REFERENCES SensorPrateleira (idSensorPrateleira)
);

CREATE TABLE DadosSensores (
    idDadosSensor INT AUTO_INCREMENT,
	fkSensorPrateleira INT, 
    fkTipoSensor int, 
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Armazena o momento da leitura
    temperatura DECIMAL(5,2), -- Armazena a temperatura coletada
    umidade DECIMAL(5,2), -- Armazena a umidade coletada
    PRIMARY KEY (idDadosSensor, fkSensorPrateleira,fkTipoSensor),
	FOREIGN KEY (fkTipoSensor) REFERENCES tipoSensor(idSensor),
    FOREIGN KEY (fkSensorPrateleira) REFERENCES SensorPrateleira(idSensorPrateleira) -- Relaciona com o sensor de temperatura
);

CREATE TABLE AlertaSensor (
    idAlertaSensor INT AUTO_INCREMENT,
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora do alerta
    tipoAlerta VARCHAR(50), -- Ex: "Temperatura Alta", "Umidade Baixa"
    descricaoAlerta VARCHAR(255),
	valorMinimo DECIMAL(5,2), -- Faixa mínima de operação
    valorMaximo DECIMAL(5,2), -- Faixa máxima de operação
	fkSensorPrateleira INT,
    primary key (idAlertaSensor, fkSensorPrateleira),
    FOREIGN KEY (fkSensorPrateleira) REFERENCES SensorPrateleira(idSensorPrateleira)
);



SHOW TABLES;
SELECT * FROM login;
SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM LocalMaturacao;
SELECT * FROM usuario;
SELECT * FROM LocalMaturacaoUsuario;
SELECT * FROM Prateleira;
SELECT * FROM SensorPrateleira;
SELECT * FROM DadosSensores;
SELECT * FROM AlertaSensor;
SELECT * FROM SensorPrateleira;
SELECT * FROM tipoSensor;