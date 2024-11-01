create database queijonopontodb;
use queijonopontodb;

create table empresa(
    idEmpresa int primary key auto_increment,
    razaoSocial varchar(45),
    nomeFantasia varchar(45),
    cnpj char(14),
    representanteLegal varchar(45),
    cpf char(11),
    email varchar(60),
    telefone varchar(15),
    data_cadastro timestamp default current_timestamp
)auto_increment=101;

create table endereco(
	idEndereco int primary key auto_increment,
	logradouro varchar(45),
	numero char(6),
	cidade varchar(45),
	cep char(9),
	fkEmpresa int unique,
	foreign key (fkEmpresa)  references empresa(idEmpresa)
)auto_increment=101;

create table login(
	idLogin int primary key auto_increment,
	email varchar(45),
	senha varchar(45)
)auto_increment=101;

create table usuario(
    idUsuario int primary key auto_increment,
    nome varchar(45),
    cpf varchar(11) not null unique,
    telefone varchar(15),
    fkEmpresa int unique,
    fkEndereco int unique,
    fkLogin int not null,
    foreign key (fkEmpresa) references empresa(idEmpresa),
	foreign key (fkEndereco) references endereco(idEndereco),
    foreign key (fkLogin) references login(idLogin)
)auto_increment=101;

create table localMaturacao (
    idLocalMaturacao int auto_increment primary key,
    nomeLocal varchar(100), -- nome do local de maturação (ex: "sala de maturação 1")
    descricaoLocal varchar(255), -- descrição do local
    temperaturaIdeal decimal(5,2), -- temperatura ideal para maturação
    umidadeIdeal decimal(5,2), -- umidade ideal para maturação
    capacidadePrateleiras int, -- número de prateleiras na sala
    fkEmpresa int unique,
    foreign key (fkEmpresa) references empresa(idEmpresa) -- relaciona com a empresa que possui o local
)auto_increment=101;

create table localMaturacaoUsuario (
	idLocalMaturacaoUsuario int primary key auto_increment,
    dataAssociacao date,
    fkUsuario int,  
	fkLocalMaturacao int,
    foreign key (fkUsuario) references usuario(idUsuario),
    foreign key (fkLocalMaturacao) references localMaturacao(idLocalMaturacao)
);

create table estante (
idEstante int primary key auto_increment,
identificacaoEstante varchar(50),
capacidadeMaxima int,
altura decimal(5,2),
largura decimal(5,2),
profundidade decimal(5,2),
fkLocalMaturacao int,
foreign key (fkLocalMaturacao) references localMaturacao (idLocalMaturacao)
) auto_increment = 101;

create table sensor (
    idSensor int primary key auto_increment,
    modeloSensor varchar(50),
    dataInstalacao date, -- data de instalação do sensor
    quantidadeTotal int,
	fkEstante int,
    fkLocalMaturacao int,
    foreign key (fkEstante) references estante (idEstante),
    foreign key (fkLocalMaturacao) references localMaturacao (idLocalMaturacao)
)auto_increment=101;

create table tipoSensor (
    idTipoSensor int auto_increment,
    nome varchar(45) not null, -- nome do sensor (lm35, dht11)
    constraint chknome check (nome in('lm35', 'dht11')),
    tipo varchar(45) not null, -- tipo de grandeza medida (temperatura, umidade)
    unidademedida varchar(5) not null, -- unidade de medida (°c, %)
    fkSensor int,
    primary key (idTipoSensor, fkSensor),
	foreign key (fkSensor) references sensor (idSensor)
)auto_increment=101;

create table dadosSensor (
    idDadosSensor int auto_increment,
    datahora timestamp default current_timestamp, -- armazena o momento da leitura
    temperatura decimal(5,2), -- armazena a temperatura coletada
    umidade decimal(5,2), -- armazena a umidade coletada
    fkSensor int, 
    primary key (idDadosSensor, fkSensor),
    foreign key (fkSensor) references sensor (idSensor) -- relaciona com o sensor de temperatura
)auto_increment=101;

create table alertaSensor (
    idAlertaSensor int auto_increment,
    dataHora timestamp default current_timestamp, -- data e hora do alerta
    tipoAlerta varchar(50), -- ex: "temperatura alta", "umidade baixa"
    descricaoAlerta varchar(255),
	valorMinimo decimal(5,2), -- faixa mínima de operação
    valorMaximo decimal(5,2), -- faixa máxima de operação
	fkSensor int,
    primary key (idAlertaSensor, fkSensor),
    foreign key (fkSensor) references sensor (idSensor)
)auto_increment=101;

-- INSERT
insert into empresa (razaoSocial, nomeFantasia, cnpj, representanteLegal, cpf, email, telefone, data_cadastro) values
('Queijaria do Ponto ltda.', 'Queijaria do Ponto', '12345678000101', 'Cesar Augusto', '12345678909', 'contato@queijariadoponto.com', '11988887777', '2023-11-17'),
('Queijos da Serra ltda.', 'Queijos da Serra', '98765432000102', 'Fernando Pessoa', '98765432100', 'vendas@queijosdaserra.com', '11999996666', '2022-08-05'),
('Laticínios Boa Vista ltda.', 'Laticínios Boa Vista', '11122233000103', 'Vivian Marques', '15975348612', 'fabrica@boavista.com', '1133221100', '2021-04-23'),
('Delícias do Campo ltda.', 'Delícias do Campo', '44455566000104', 'Juliano Bela Vista', '74185296385', 'contato@deliciasdocampo.com', '11988776655', '2020-10-12'),
('Queijos Artesanais ltda.', 'Queijos Artesanais', '55566677000105', 'Frizzarini Cluadio', '36925814736', 'artesanal@queijosartesanais.com', '11999885555', '2019-01-30');

insert into endereco (logradouro, numero, cidade, cep, fkempresa) values
('rua do queijo', '123', 'centro', '01001000', 101),
('av. da maturação', '321', 'rio', '22041010', 102),
('estrada do leite', '55', 'campinas', '13040000', 103),
('rua dos fazendeiros', '88', 'sorocaba', '18035000', 104),
('rua do vale', '123', 'centro', '01001000', null),
('travessa do sabor', '22', 'belo horizonte', '30140000', 105);

insert into login (email, senha) values
('contato@queijariadoponto.com', 'contato536qj'),
('vendas@queijosdaserra.com', 'venda246qj' ),
('recursoshumanos@queijosdaserra.com', 'recursos536$55qj');

insert into usuario (nome, cpf, telefone, fkEmpresa, fkEndereco, fkLogin) values
('joão silva', '12345678901', '11987654321', 101, 103, 103),
('maria souza', '23456789012', '11991234567', 102, 101, 101), 
('josé ferreira', '34567890123', '11999887766', 103, 102, 102);

insert into localmaturacao (nomeLocal, descricaoLocal, temperaturaIdeal, umidadeIdeal, capacidadePrateleiras, fkEmpresa) values
('sala de maturação 1', 'sala principal com 10 prateleiras para maturação de queijos', 12.5, 80.0, 10, 101),
('sala de maturação 2', 'sala com temperatura controlada para queijos finos', 14.0, 85.0, 8, 102),
('sala de prateleiras externas', 'sala auxiliar para queijos de longa maturação', 10.0, 70.0, 15, 103),
('câmara de maturação 3', 'área de controle climático avançado para produção artesanal', 13.0, 82.0, 12, 104),
('câmara externa de maturação', 'área adicional para maturação em temperatura ambiente', 15.0, 75.0, 4, 105);

insert into localMaturacaoUsuario (idLocalMaturacaoUsuario, dataAssociacao, fkUsuario, fkLocalMaturacao) values
(101, '2024-09-20', 107, 101),
(102, '2024-01-10', 108, 102),
(103, '2024-07-05', 109, 103);

insert into estante (identificacaoEstante, capacidadeMaxima, altura, largura, profundidade, fkLocalMaturacao) values
(1, 10, 2.00, 2.60, 0.90, 101),
(2, 12, 1.90, 2.50, 0.75, 102),
(3, 10, 2.00, 2.40, 0.80,102),
(4, 15, 1.90, 2.50, 0.85, 103);

insert into sensor (modeloSensor, dataInstalacao, quantidadeTotal, fkEstante, fkLocalMaturacao) values
('LM35', '2023-05-12', 15, 101, 101),
('DHT11', '2022-11-08', 10, 103, 102),
('LM35', '2021-07-19', 20, 102, 105),
('DHT11', '2020-02-28', 5, 104, 104),
('LM35', '2023-09-30', 12, 101, 103);

insert into tipoSensor (nome, tipo, unidadeMedida, fkSensor) values
('lm35', 'temperatura', '°c', 103),
('dht11', 'umidade', '%', 105);

insert into dadosSensor (dataHora, temperatura, umidade, fkSensor) values 
('2023-07-15 14:35:21', 18, 77, 102),
('2024-03-22 08:12:47', 16, 83, 101);

insert into alertaSensor (dataHora, tipoAlerta, descricaoAlerta, valorMinimo, valorMaximo, fkSensor) values
('2022-11-03 16:24:55', 'temperatura alta', 'a temperatura está acima do ideal na prateleira a1', 10, 14, 103),
('2021-06-18 09:47:33', 'umidade alta', 'a umidade está acima do ideal na prateleira b1', 75, 90, 105),
('2023-02-25 12:05:18', 'temperatura baixa', 'a temperatura está abaixo do ideal na prateleira a2', 8, 12, 101),
('2024-09-14 19:22:49', 'temperatura alta', 'a temperatura está acima do ideal na prateleira b2', 11, 15, 102),
('2020-04-08 07:31:02', 'temperatura alta', 'a temperatura está acima do ideal na prateleira c1', 9, 13, 104);

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
    usuario.idUsuario as 'id usuário',
    usuario.nome as 'nome do usuário',
    usuario.cpf as 'cpf',
    login.email as 'login email',
    login.senha as 'senha'
from 
    usuario
-- join com a tabela de login
left join login on login.idlogin = usuario.fklogin;

-- select com join e case

select 
    ds.idDadosSensor,
    ds.temperatura,
    ds.umidade,
    asensor.tipoAlerta,
    asensor.descricaoAlerta,
    asensor.dataHora as 'data do alerta',
    -- condicional para verificar os limites e ativar o alerta
    case 
        when ds.temperatura > 14 or ds.umidade < 70 then 'alerta ativo'
        else 'normal'
    end as 'status alerta'
from 
    dadosSensor ds
left join 
    alertaSensor asensor on ds.fkSensor = asensor.fkSensor
    and asensor.valorMinimo <= ds.umidade and asensor.valorMaximo >= ds.temperatura;
