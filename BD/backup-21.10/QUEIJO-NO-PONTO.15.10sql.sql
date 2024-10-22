
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
)auto_increment=101;

CREATE TABLE endereco(
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
	logradouro VARCHAR(45),
	numero CHAR(6),
	cidade VARCHAR(45),
	cep CHAR(9),
	fkEmpresa INT unique,
	FOREIGN KEY (fkEmpresa)  REFERENCES empresa(idEmpresa)
)auto_increment=101;

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
)auto_increment=101; 

CREATE TABLE login(
	idLogin INT auto_increment,
	fKUsuario INT unique,
	email VARCHAR(45),
	senha VARCHAR(45),
	FOREIGN KEY (fKUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idLogin, fKUsuario)
)auto_increment=101;

CREATE TABLE LocalMaturacao (
    idLocalMaturacao INT AUTO_INCREMENT PRIMARY KEY,
    nomeLocal VARCHAR(100), -- Nome do local de maturação (ex: "Sala de Maturação 1")
    descricaoLocal VARCHAR(255), -- Descrição do local
    temperaturaIdeal DECIMAL(5,2), -- Temperatura ideal para maturação
    umidadeIdeal DECIMAL(5,2), -- Umidade ideal para maturação
    capacidadePrateleiras INT, -- Número de prateleiras na sala
    fkEmpresa int,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa) -- Relaciona com a empresa que possui o local
)auto_increment=101;

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
)auto_increment=101;

CREATE TABLE SensorPrateleira (
    idSensorPrateleira INT AUTO_INCREMENT,
    nivelPrateleira int,
    dataInstalacao DATE, -- Data de instalação do sensor
    quantidadeTotal INT,
	fkPrateleira INT,
    primary key (idSensorPrateleira, fkPrateleira),
    FOREIGN KEY (fkPrateleira) REFERENCES Prateleira(idPrateleira)
)auto_increment=101;

CREATE TABLE tipoSensor (
    idSensor INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL, -- Nome do sensor (LM35, DHT11)
    CONSTRAINT chkNome check (nome in('LM35', 'DHT11')),
    tipo VARCHAR(45) NOT NULL, -- Tipo de grandeza medida (Temperatura, Umidade)
    unidadeMedida VARCHAR(5) NOT NULL, -- Unidade de medida (°C, %)
    fkSensorPrateleira INT,
    PRIMARY KEY (idSensor, fkSensorPrateleira),
	FOREIGN KEY (fkSensorPrateleira) REFERENCES SensorPrateleira (idSensorPrateleira)
)auto_increment=101;

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
)auto_increment=101;

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
)auto_increment=101;

INSERT INTO empresa (razaoSocial, nomeFantasia, representanteLegal, cnpj, email, telefone) VALUES
('Queijaria do Ponto Ltda.','Queijaria do Ponto', 'Cesar Augusto', '12345678000101', 'contato@queijariadoponto.com', '11988887777'),
('Queijos da Serra Ltda.','Queijos da Serra', 'Fernando Pessoa','98765432000102', 'vendas@queijosdaserra.com', '11999996666'),
('Laticínios Boa Vista Ltda.','Laticínios Boa Vista', 'Vivian Marques', '11122233000103', 'fabrica@boavista.com', '1133221100'),
('Delícias do Campo Ltda.','Delícias do Campo', 'Juliano Bela Vista','44455566000104', 'contato@deliciasdocampo.com', '11988776655'),
('Queijos Artesanais Ltda.','Queijos Artesanais', 'Frizzarini Cluadio', '55566677000105', 'artesanal@queijosartesanais.com', '11999885555');

INSERT INTO endereco (logradouro, numero, cidade, cep, fkEmpresa) VALUES
('Rua do Queijo', '123', 'Centro', '01001000', 101),
('Av. da Maturação', '321', 'Rio', '22041010', 102),
('Estrada do Leite', '55', 'Campinas', '13040000', 103),
('Rua dos Fazendeiros', '88', 'Sorocaba', '18035000', 104),
('Travessa do Sabor', '22', 'Belo Horizonte', '30140000', 105);


INSERT INTO usuario (nome, cpf, telefone, nomeNivelAcesso, fkNivelAcesso) VALUES
('João Silva', '12345678901', '11987654321','Administrador', 101),
('Maria Souza', '23456789012', '11991234567','Comum', 102), 
('José Ferreira', '34567890123', '11999887766', 'Comum', 102);

INSERT INTO login (email, senha, FkUsuario) VALUES
('contato@queijariadoponto.com', 'qj536$55', 101),
('vendas@queijosdaserra.com', 'qj536$55', 102),
('recrusosHumanos@queijosdaserra.com', 'qj536$55', 103);

INSERT INTO LocalMaturacao (nomeLocal, descricaoLocal, temperaturaIdeal, umidadeIdeal, capacidadePrateleiras) VALUES
('Sala de Maturação 1', 'Sala principal com 10 prateleiras para maturação de queijos', 12.5, 80.0, 10),
('Sala de Maturação 2', 'Sala com temperatura controlada para queijos finos', 14.0, 85.0, 8),
('Sala de Prateleiras Externas', 'Sala auxiliar para queijos de longa maturação', 10.0, 70.0, 15),
('Câmara de Maturação 3', 'Área de controle climático avançado para produção artesanal', 13.0, 82.0, 12),
('Câmara Externa de Maturação', 'Área adicional para maturação em temperatura ambiente', 15.0, 75.0, 4);

INSERT INTO LocalMaturacaoUsuario (fkLocalMaturacao, fkUsuario, dataAssociacao) VALUES
(101, 101, '2024-09-20'),
(102, 102, '2024-01-10'),
(105, 103, '2024-07-05');

INSERT INTO Prateleira (identificacaoPrateleira, capacidadeMaxima, altura, largura, profundidade, fkLocalMaturacao) VALUES
('Prateleira A1', 50, '2.0', '1.5', '0.6', 101),
('Prateleira A2', 60, '2.5', '1.8', '0.7', 101),
('Prateleira B1', 40, '1.8', '1.2', '0.5', 102),
('Prateleira B2', 45, '2.0', '1.3', '0.6', 102),
('Prateleira C1', 55, '2.3', '1.4', '0.8', 105);

INSERT INTO SensorPrateleira ( nivelPrateleira, dataInstalacao, quantidadeTotal, fkPrateleira) VALUES
(1, '2024-08-01', 2, 101),
(2, '2024-08-01', 2, 101),
(4, '2024-08-02', 2, 102),
(3, '2024-08-03', 3, 102),
(7, '2024-08-04', 4, 105);

INSERT INTO tipoSensor (nome, tipo, unidadeMedida, fkSensorPrateleira) VALUES
('LM35', 'Temperatura', '°C', 103),
('DHT11', 'Umidade', '%', 105);

INSERT INTO DadosSensores (fkSensorPrateleira, FkTipoSensor, temperatura, umidade) VALUES 
(102, 101, 18, 77),
(101, 102, 16, 83);

INSERT INTO AlertaSensor (tipoAlerta, descricaoAlerta, fkSensorPrateleira) VALUES
('Temperatura Alta', 'A temperatura está acima do ideal na Prateleira A1', 103),
('Umidade Alta', 'A umidade está acima do ideal na Prateleira B1', 105),
('Temperatura Baixa', 'A temperatura está abaixo do ideal na Prateleira A2', 101),
('Temperatura Alta', 'A temperatura está acima do ideal na Prateleira B2', 102),
('Temperatura Alta', 'A temperatura está acima do ideal na Prateleira C1', 104);

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


SELECT 
    usuario.idUsuario AS 'ID Usuário',
    usuario.nome AS 'Nome do Usuário',
    usuario.cpf AS 'CPF',
    nivelAcesso.nomeNivelAcesso AS 'Nível de Acesso',
    login.email AS 'Login Email',
    login.senha AS 'Senha'
FROM 
    usuario as usuario
LEFT JOIN usuario as nivelAcesso ON usuario.fkNivelAcesso = nivelAcesso.idUsuario
-- Join com a tabela de login
LEFT JOIN login ON login.fKUsuario = usuario.idUsuario;



SELECT 
    ds.idDadosSensor,
    ds.temperatura,
    ds.umidade,
    asensor.tipoAlerta,
    asensor.descricaoAlerta,
    asensor.dataHora AS 'Data do Alerta',
    -- Condicional para verificar os limites e ativar o alerta
    CASE 
        WHEN ds.temperatura > 14 or ds.umidade < 70 THEN 'Alerta Ativo'
        ELSE 'Normal'
    END AS 'Status Alerta'
FROM 
    DadosSensores ds
LEFT JOIN 
    AlertaSensor asensor ON ds.fkSensorPrateleira = asensor.fkSensorPrateleira
    AND asensor.valorMinimo <= ds.umidade AND asensor.valorMaximo >= ds.temperatura;

