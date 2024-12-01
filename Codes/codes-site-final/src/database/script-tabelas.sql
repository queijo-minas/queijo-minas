-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

create database queijonopontodb;
use queijonopontodb;

create table empresa(
    idempresa int primary key auto_increment,
    razaosocial varchar(45),
    nomefantasia varchar(45),
    cnpj char(14),
    nome varchar(45),
    cpf char(11),
    email varchar(60),
	senha varchar(45),
    telefone varchar(15),
    data_cadastro timestamp default current_timestamp
)auto_increment=101;

create table endereco(
	idendereco int primary key auto_increment,
	logradouro varchar(45),
	numero char(6),
	cidade varchar(45),
	cep char(9),
	fkempresa int unique,
	foreign key (fkempresa)  references empresa(idempresa)
)auto_increment=101;

create table login(
	idlogin int primary key auto_increment,
	email varchar(45),
	senha varchar(45)
)auto_increment=101;

create table usuario(
    idusuario int auto_increment,
    nome varchar(45),
    cpf varchar(11) not null unique,
    telefone varchar(15),
    nomenivelacesso varchar(45),
    fkempresa int unique,
    fknivelacesso int not null,
    fkendereco int unique,
    fklogin int not null,
	foreign key (fkendereco) references endereco(idendereco),
    foreign key (fkempresa) references empresa(idempresa),
    foreign key (fknivelacesso) references usuario(idusuario),
    foreign key (fklogin) references login(idlogin),
    primary key (idusuario, fknivelacesso, fklogin)
)auto_increment=101; 

create table localmaturacao (
    idlocalmaturacao int auto_increment primary key,
    nomelocal varchar(100), 
    descricaolocal varchar(255), 
    temperaturaideal decimal(5,2), 
    umidadeideal decimal(5,2), 
    capacidadeprateleiras int, 
    fkempresa int unique,
    foreign key (fkempresa) references empresa(idempresa) 
)auto_increment=101;

create table localmaturacaousuario (
	idlocalmaturacaousuario int primary key auto_increment,
	fklocalmaturacao int,
    fkusuario int,  
    dataassociacao date,
    foreign key (fklocalmaturacao) references localmaturacao(idlocalmaturacao),
    foreign key (fkusuario) references usuario(idusuario)
);


create table prateleira (
    idprateleira int auto_increment primary key,
    identificacaoprateleira varchar(50),
    capacidademaxima int,
    altura decimal(5,2), 
    largura decimal(5,2), 
    profundidade decimal(5,2), 
    quantidadetotal int, 
	fklocalmaturacao int, 
    foreign key (fklocalmaturacao) references localmaturacao(idlocalmaturacao)
)auto_increment=101;

create table sensorprateleira (
    idsensorprateleira int primary key auto_increment,
    nivelprateleira int,
    datainstalacao date, 
    quantidadetotal int,
	fkprateleira int,
    foreign key (fkprateleira) references prateleira(idprateleira)
)auto_increment=101;

create table tiposensor (
    idsensor int auto_increment,
    nome varchar(45) not null, 
    constraint chknome check (nome in('lm35', 'dht11')),
    tipo varchar(45) not null, 
    unidademedida varchar(5) not null, 
    fksensorprateleira int,
    primary key (idsensor, fksensorprateleira),
	foreign key (fksensorprateleira) references sensorprateleira (idsensorprateleira)
)auto_increment=101;

create table dadossensores (
    iddadossensor int auto_increment,
	fksensorprateleira int, 
    datahora timestamp default current_timestamp, 
    temperatura decimal(5,2), 
    umidade decimal(5,2), 
    primary key (iddadossensor, fksensorprateleira),
    foreign key (fksensorprateleira) references sensorprateleira(idsensorprateleira) 
)auto_increment=101;

create table alertasensor (
    idalertasensor int auto_increment,
    datahora timestamp default current_timestamp,
    tipoalerta varchar(50), 
    descricaoalerta varchar(255),
	valorminimo decimal(5,2), 
    valormaximo decimal(5,2), 
	fksensorprateleira int,
    primary key (idalertasensor, fksensorprateleira),
    foreign key (fksensorprateleira) references sensorprateleira(idsensorprateleira)
)auto_increment=101;



-- INSERTS PARA TESTE:


-- Inserções na tabela Empresa
INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, representanteLegal, cpf, telefone, email, senhaEmpresa) 
VALUES 
('Queijo Artesanal Ltda', 'Queijos da Serra', '12345678000123', 'João Silva', '12345678901', '35999999999', 'joao@queijodaserra.com', 'senha123'),
('Delícias do Queijo ME', 'Delícias do Queijo', '98765432000189', 'Maria Oliveira', '98765432101', '31988888888', 'maria@deliciasdoqueijo.com', 'senha456'),
('Maturação Gourmet SA', 'Gourmet Queijos', '45678912000145', 'Pedro Almeida', '45678912345', '31977777777', 'pedro@gourmetqueijos.com', 'senha789');

-- Inserções na tabela Endereço
INSERT INTO endereco (rua, numero, cidade, cep, fkEmpresa) 
VALUES 
('Rua das Flores', '101', 'Belo Horizonte', '30110001', 101),
('Avenida Central', '202', 'São Paulo', '01020030', 102),
('Rua do Campo', '303', 'Curitiba', '80030040', 103);


INSERT INTO endereco (rua, numero, cidade, cep, fkEmpresa) 
VALUES 
('seila', '305', 'Capão', '10030040', null);



-- Inserções na tabela Usuário
INSERT INTO usuario (nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco) 
VALUES 
('Ana Souza', '12312312312', '35911111111', 'ana.souza@empresa.com', 'senha321', 101, 101),
('Carlos Lima', '32132132132', '31922222222', 'carlos.lima@empresa.com', 'senha654', 102, 102),
('Beatriz Ramos', '23123123123', '31933333333', 'beatriz.ramos@empresa.com', 'senha987', 103, 103);

-- ADICIONANDO UM ADIMINISTRADOR::: SE USAR ESSE LOGIN DE ADM REDIRECIONA PRA BOBIA!!!!!
INSERT INTO usuario (nome, cpf, telefone, email, senha, fkEmpresa, fkEndereco, tipoUsuario) 
VALUES 
('Duda Ramos', '13123123123', '21933333333', 'duda.ramos@empresa.com', 'senha888', 102, 106, 'administrador');


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
