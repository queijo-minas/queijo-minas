CREATE DATABASE queijoNoPontoDB;
USE queijoNoPontoDB;


CREATE TABLE cadastro (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(60),
    senha VARCHAR(30),
    endereco VARCHAR(100),
    telefone CHAR(11),
    CNPJ CHAR(14)
);


DESC cadastro;


INSERT INTO cadastro VALUES
    (DEFAULT, 'Marcelo Santos Olivares', 'marcelosantos1304@gmail.com', 'euamocarros123', 'Rua das montanhas, 123, Atras da quadra, Santa Amélia, Belo Horizonte, Minas Gerais, 31340000', '975804492', '12345678000190'),
    (DEFAULT, 'Rodrigo Santos Olivares', 'rodrigoolivares0901@hotmail.com', 'euadorocarros1234', 'Rua das Palmeiras, 789, Frente ao shopping, Belo Horizonte, Minas Gerais, 31350000', '974805593', '14365879000180'),
    (DEFAULT, 'João Silva', 'joao.silva@email.com', 'senha123', 'Rua A, 123', '11987654321', '12345678000195'),
    (DEFAULT, 'Maria Oliveira', 'maria.oliveira@email.com', 'senha456', 'Avenida B, 456', '11912345678', '98765432000196'),
    (DEFAULT, 'Carlos Santos', 'carlos.santos@email.com', 'senha789', 'Praça C, 789', '11987654312', '12312312000197');


SELECT * FROM cadastro;


CREATE TABLE sensores (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME,
    temperatura INT,
    umidade INT
);



DESC sensores;


INSERT INTO sensores VALUES
    (DEFAULT, '2024-09-06 10:00:00', 23, 85),
    (DEFAULT, '2024-09-06 10:00:03', 24, 86),
    (DEFAULT, '2024-09-06 10:00:06', 23, 84),
    (DEFAULT, '2024-09-06 10:00:09', 22, 87),
    (DEFAULT, '2024-09-06 10:00:12', 25, 85);


SELECT * FROM sensores;


CREATE TABLE implementacaoSensores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    nomeEmpresa VARCHAR(60),
    localizacaoInstalacao VARCHAR(100),
    tipoSensor VARCHAR(50),
    modeloSensor VARCHAR(30),
    dataInstalacao DATE, 
    statusSensor VARCHAR(20),
    CONSTRAINT fk_usuario 
    FOREIGN KEY (idUsuario) REFERENCES cadastro(idUsuario)
);




DESC implementacaoSensores;


INSERT INTO implementacaoSensores VALUES
    (DEFAULT, 1, 'Roça da Cidade', 'Sala de maturação', 'Temperatura', 'LM35', '2024-09-09', 'Funcionando'),
    (DEFAULT, 2, 'Queijaria do Vale', 'Câmara de maturação', 'Temperatura', 'LM35', '2024-09-15', 'Funcionando'),
    (DEFAULT, 3, 'Queijo Artesanal', 'Sala de cura', 'Umidade', 'DHT11', '2024-09-16', 'Funcionando'),
    (DEFAULT, 4, 'Queijaria Monte Verde', 'Área de armazenamento', 'Temperatura', 'DS18B20', '2024-09-17', 'Manutenção'),
    (DEFAULT, 5, 'Queijo Fazenda Caxambu', 'Sala de secagem', 'Umidade', 'DHT11', '2024-09-08', 'Manutenção');


SELECT * FROM implementacaoSensores;


SELECT 
    i.nomeEmpresa, 
    c.nome AS nomeUsuario
FROM 
    implementacaoSensores i
JOIN 
    cadastro c 
ON 
    i.idUsuario = c.idUsuario;



SELECT 
    i.tipoSensor, 
    i.localizacaoInstalacao, 
    c.nome AS nomeUsuario, 
    c.telefone 
FROM 
    implementacaoSensores i
JOIN 
    cadastro c 
ON 
    i.idUsuario = c.idUsuario;

