create database cadastro;
use cadastro;

create table informacoes (
idUsuario int primary key auto_increment,
nome varchar (50),
email varchar(60),
senha varchar(30),
endereço varchar(100),
telefone char(11),
CNPJ char(14)
)auto_increment = 0;

desc informacoes;

insert into informacoes values
	(default, 'Marcelo Santos Olivares', 'marcelosantos1304@gmail.com', 'euamocarros123', 'Rua das montanhas, 123, Atras da quadra, Santa Amélia, Belo Horizonte, Minas Gerais, 31340000', '975804492', '12345678000190'),
    (default, 'Rodrigo Santos Olivares', 'rodrigoolivares0901@hotmail.com', 'euadorocarros1234', 'Rua das Palmeiras, 789, Frente ao shooping, Beo Horizonte,Minas Gerais, 31350000', '974805593', '14365879000180');
select * from informacoes;
select endereço from informacoes where nome = 'Marcelo Santos Olivares';
select cnpj from informacoes where nome = 'Marcelo Santos Olivares';
select * from informacoes where nome like 'M%';
select * from informacoes order by telefone desc;
select * from informacoes where nome like '%S' order by nome;
select cnpj from informacoes order by cnpj desc;
select * from informacoes where senha like '%M%';
select senha from informacoes where senha like '%O%';
select * from informacoes where senha like '%CA%';


create table sensores (
id int primary key auto_increment,
dataHora datetime,
temperatura int,
umidade int
)auto_increment = 0;

desc sensores;

insert into sensores values
(default, '2024-09-06 10:00:00', '23', '85'),
(default, '2024-09-06 10:00:03', '24', '86'),
(default, '2024-09-06 10:00:06', '23', '84');

select * from sensores;

delete from sensores where id = 2;

select * from sensores where dataHora like '%1934%';
select * from sensores where temperatura like '%23%';
select * from sensores where temperatura > 20;
select temperatura from sensores where umidade < 86;
select dataHora as 'Tempo atual' from sensores where id in (1, 2, 3);

create table implementaçãoSensores (
id int primary key auto_increment,
nomeEmpresa VARCHAR(60),
localizacaoInstalacao VARCHAR(100),
tipoSensor VARCHAR(50),
modeloSensor VARCHAR(30),
dataInstalacao DATE, 
statusSensor VARCHAR(20)
)auto_increment = 0;

desc implementaçãoSensores;

insert into implementaçãoSensores values
	(default, 'Roça da Cidade', 'Sala de maturação', 'Temperatura', 'LM35', '2024-09-09', 'Funcionando'),
    (default, 'Queijo Fazenda Caxambu', 'Sala de secagem', 'Umidade', 'DHT11', '2024-09-08', 'Manutenção');
    
select * from implementaçãoSensores;
select * from implementaçãoSensores where nomeEmpresa like '%E';
select modeloSensor from implementaçãoSensores order by dataInstalacao desc;
select * from implementaçãoSensores where tipoSensor = 'Umidade';