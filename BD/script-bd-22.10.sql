create database queijonopontodb;
use queijonopontodb;

create table empresa(
    idempresa int primary key auto_increment,
    razaosocial varchar(45),
    nomefantasia varchar(45),
    cnpj char(14),
    representantelegal varchar(45),
    cpf char(11),
    email varchar(60),
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
    nomelocal varchar(100), -- nome do local de maturação (ex: "sala de maturação 1")
    descricaolocal varchar(255), -- descrição do local
    temperaturaideal decimal(5,2), -- temperatura ideal para maturação
    umidadeideal decimal(5,2), -- umidade ideal para maturação
    capacidadeprateleiras int, -- número de prateleiras na sala
    fkempresa int unique,
    foreign key (fkempresa) references empresa(idempresa) -- relaciona com a empresa que possui o local
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
    identificacaoprateleira varchar(50), -- identificação única da prateleira (ex: "prateleira a1", "prateleira b3")
    capacidademaxima int, -- capacidade máxima de queijos na prateleira
    altura decimal(5,2), -- altura da prateleira na sala (em metros)
    largura decimal(5,2), -- largura da prateleira (em metros)
    profundidade decimal(5,2), -- profundidade da prateleira (em metros)
    quantidadetotal int, -- quantidade total desse tipo de sensor
	fklocalmaturacao int, -- relaciona a prateleira com o local de maturação
    foreign key (fklocalmaturacao) references localmaturacao(idlocalmaturacao)
)auto_increment=101;

create table sensorprateleira (
    idsensorprateleira int primary key auto_increment,
    nivelprateleira int,
    datainstalacao date, -- data de instalação do sensor
    quantidadetotal int,
	fkprateleira int,
    foreign key (fkprateleira) references prateleira(idprateleira)
)auto_increment=101;

create table tiposensor (
    idsensor int auto_increment,
    nome varchar(45) not null, -- nome do sensor (lm35, dht11)
    constraint chknome check (nome in('lm35', 'dht11')),
    tipo varchar(45) not null, -- tipo de grandeza medida (temperatura, umidade)
    unidademedida varchar(5) not null, -- unidade de medida (°c, %)
    fksensorprateleira int,
    primary key (idsensor, fksensorprateleira),
	foreign key (fksensorprateleira) references sensorprateleira (idsensorprateleira)
)auto_increment=101;

create table dadossensores (
    iddadossensor int auto_increment,
	fksensorprateleira int, 
    datahora timestamp default current_timestamp, -- armazena o momento da leitura
    temperatura decimal(5,2), -- armazena a temperatura coletada
    umidade decimal(5,2), -- armazena a umidade coletada
    primary key (iddadossensor, fksensorprateleira),
    foreign key (fksensorprateleira) references sensorprateleira(idsensorprateleira) -- relaciona com o sensor de temperatura
)auto_increment=101;

create table alertasensor (
    idalertasensor int auto_increment,
    datahora timestamp default current_timestamp, -- data e hora do alerta
    tipoalerta varchar(50), -- ex: "temperatura alta", "umidade baixa"
    descricaoalerta varchar(255),
	valorminimo decimal(5,2), -- faixa mínima de operação
    valormaximo decimal(5,2), -- faixa máxima de operação
	fksensorprateleira int,
    primary key (idalertasensor, fksensorprateleira),
    foreign key (fksensorprateleira) references sensorprateleira(idsensorprateleira)
)auto_increment=101;



-- INSERT
insert into empresa (razaosocial, nomefantasia, representantelegal, cnpj, email, telefone) values
('queijaria do ponto ltda.','queijaria do ponto', 'cesar augusto', '12345678000101', 'contato@queijariadoponto.com', '11988887777'),
('queijos da serra ltda.','queijos da serra', 'fernando pessoa','98765432000102', 'vendas@queijosdaserra.com', '11999996666'),
('laticínios boa vista ltda.','laticínios boa vista', 'vivian marques', '11122233000103', 'fabrica@boavista.com', '1133221100'),
('delícias do campo ltda.','delícias do campo', 'juliano bela vista','44455566000104', 'contato@deliciasdocampo.com', '11988776655'),
('queijos artesanais ltda.','queijos artesanais', 'frizzarini cluadio', '55566677000105', 'artesanal@queijosartesanais.com', '11999885555');

insert into endereco (logradouro, numero, cidade, cep, fkempresa) values
('rua do queijo', '123', 'centro', '01001000', 101),
('av. da maturação', '321', 'rio', '22041010', 102),
('estrada do leite', '55', 'campinas', '13040000', 103),
('rua dos fazendeiros', '88', 'sorocaba', '18035000', 104),
('rua do vale', '123', 'centro', '01001000', null),
('travessa do sabor', '22', 'belo horizonte', '30140000', 105);

insert into login (email, senha) values
('contato@queijariadoponto.com', 'qj536$55'),
('vendas@queijosdaserra.com', 'qj536$55' ),
('recrusoshumanos@queijosdaserra.com', 'qj536$55');

insert into usuario (nome, cpf, telefone, nomenivelacesso, fknivelacesso, fklogin, fkempresa, fkendereco) values
('joão silva', '12345678901', '11987654321','administrador', 101, 101, null,105),
('maria souza', '23456789012', '11991234567','comum', 102,102,101,101), 
('josé ferreira', '34567890123', '11999887766', 'comum', 102,103,102,102);


insert into localmaturacao (nomelocal, descricaolocal, temperaturaideal, umidadeideal, capacidadeprateleiras) values
('sala de maturação 1', 'sala principal com 10 prateleiras para maturação de queijos', 12.5, 80.0, 10),
('sala de maturação 2', 'sala com temperatura controlada para queijos finos', 14.0, 85.0, 8),
('sala de prateleiras externas', 'sala auxiliar para queijos de longa maturação', 10.0, 70.0, 15),
('câmara de maturação 3', 'área de controle climático avançado para produção artesanal', 13.0, 82.0, 12),
('câmara externa de maturação', 'área adicional para maturação em temperatura ambiente', 15.0, 75.0, 4);

insert into localmaturacaousuario (idlocalmaturacaousuario, fklocalmaturacao, fkusuario, dataassociacao) values
(101,101, 101, '2024-09-20'),
(102,102, 102, '2024-01-10'),
(103,105, 103, '2024-07-05');

insert into prateleira (identificacaoprateleira, capacidademaxima, altura, largura, profundidade, fklocalmaturacao) values
('prateleira a1', 50, '2.0', '1.5', '0.6', 101),
('prateleira a2', 60, '2.5', '1.8', '0.7', 101),
('prateleira b1', 40, '1.8', '1.2', '0.5', 102),
('prateleira b2', 45, '2.0', '1.3', '0.6', 102),
('prateleira c1', 55, '2.3', '1.4', '0.8', 105);

insert into sensorprateleira ( nivelprateleira, datainstalacao, quantidadetotal, fkprateleira) values
(1, '2024-08-01', 2, 101),
(2, '2024-08-01', 2, 101),
(4, '2024-08-02', 2, 102),
(3, '2024-08-03', 3, 102),
(7, '2024-08-04', 4, 105);

insert into tiposensor (nome, tipo, unidademedida, fksensorprateleira) values
('lm35', 'temperatura', '°c', 103),
('dht11', 'umidade', '%', 105);

insert into dadossensores (fksensorprateleira, temperatura, umidade) values 
(102, 18, 77),
(101, 16, 83);

insert into alertasensor (tipoalerta, descricaoalerta, fksensorprateleira) values
('temperatura alta', 'a temperatura está acima do ideal na prateleira a1', 103),
('umidade alta', 'a umidade está acima do ideal na prateleira b1', 105),
('temperatura baixa', 'a temperatura está abaixo do ideal na prateleira a2', 101),
('temperatura alta', 'a temperatura está acima do ideal na prateleira b2', 102),
('temperatura alta', 'a temperatura está acima do ideal na prateleira c1', 104);




-- SELECT SIMPLES
show tables;
select * from login;
select * from empresa;
select * from endereco;
select * from localmaturacao;
select * from usuario;
select * from localmaturacaousuario;
select * from prateleira;
select * from sensorprateleira;
select * from dadossensores;
select * from alertasensor;
select * from sensorprateleira;
select * from tiposensor;


-- select com join dados básicos do usuário 
select 
    usuario.idusuario as 'id usuário',
    usuario.nome as 'nome do usuário',
    usuario.cpf as 'cpf',
    nivelacesso.nomenivelacesso as 'nível de acesso',
    login.email as 'login email',
    login.senha as 'senha'
from 
    usuario
left join usuario as nivelacesso on usuario.fknivelacesso = nivelacesso.idusuario
-- join com a tabela de login
left join login on login.idlogin = usuario.fklogin;


-- select com join e case

select 
    ds.iddadossensor,
    ds.temperatura,
    ds.umidade,
    asensor.tipoalerta,
    asensor.descricaoalerta,
    asensor.datahora as 'data do alerta',
    -- condicional para verificar os limites e ativar o alerta
    case 
        when ds.temperatura > 14 or ds.umidade < 70 then 'alerta ativo'
        else 'normal'
    end as 'status alerta'
from 
    dadossensores ds
left join 
    alertasensor asensor on ds.fksensorprateleira = asensor.fksensorprateleira
    and asensor.valorminimo <= ds.umidade and asensor.valormaximo >= ds.temperatura;
