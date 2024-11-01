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
