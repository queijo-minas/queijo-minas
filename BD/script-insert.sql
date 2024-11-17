-- Criação do banco de dados
CREATE DATABASE queijonopontodb;
USE queijonopontodb;

-- Inserindo dados na tabela login
INSERT INTO login (email, senhaUsuario) VALUES
('vendas@queijosdaserra.com', 'senha321'),
('fabrica@boavista.com', 'senha321'),
('artesanal@queijosartesanais.com', 'senha321');

-- Inserindo dados na tabela empresa
INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, representanteLegal, cpf, telefone, data_cadastro, fkLogin) VALUES
('Queijos da Serra Ltda.', 'Queijos da Serra', '08765432000102', 'Fernando Pessoa', '98765432100', '11999996666', '2022-08-05', 101),
('Laticínios Boa Vista Ltda.', 'Laticínios Boa Vista', '31122233000103', 'Vivian Marques', '15975348612', '1133221100', '2021-04-23', 102),
('Queijos Artesanais Ltda.', 'Queijos Artesanais', '25566677000105', 'Frizzarini Cláudio', '36925814736', '11999885555', '2019-01-30', 103);

-- Inserindo dados na tabela endereco
INSERT INTO endereco (rua, numero, cidade, cep, fkEmpresa) VALUES
('Rua do Queijo', '123', 'Centro', '01001000', 101),
('Av. da Maturação', '321', 'Rio', '22041010', 102),
('Estrada do Leite', '55', 'Campinas', '13040000', 103);

-- Inserindo dados na tabela usuario
INSERT INTO usuario (nome, cpf, telefone, fkEmpresa, fkEndereco, fkLogin) VALUES
('Arthur Farias', '30567890123', '02999887766', 101, 101, 101),
('João Silva', '12345678901', '11987654321', 102, 102, 102),
('Maria Souza', '23456789012', '11991234567', 103, 103, 103);

-- Inserindo dados na tabela localMaturacao
INSERT INTO localMaturacao (nomeLocal, descricaoLocal, capacidadeEstantes, areaSala, fkEmpresa) VALUES
('Sala de Maturação 1', 'Sala principal com 10 prateleiras para maturação de queijos', 10, '30m²', 101),
('Sala de Maturação 2', 'Sala com temperatura controlada para queijos finos', 8, '25m²', 102),
('Sala de Prateleiras Externas', 'Sala auxiliar para queijos de longa maturação', 15, '35m²', 103);

-- Inserindo dados na tabela localMaturacaoUsuario
INSERT INTO localMaturacaoUsuario (dataAssociacao, fkUsuario, fkLocalMaturacao) VALUES
('2024-09-20', 101, 101),
('2024-01-10', 102, 102),
('2024-07-05', 103, 103);

-- Inserindo dados na tabela sensor
INSERT INTO sensor (nome, unidadeMedida, modeloSensor, dataInstalacao, quantidadeTotal, fkLocalMaturacao) VALUES
('Sensor de Temperatura', '°C', 'LM35', '2023-05-12', 15, 101),
('Sensor de Umidade', '%', 'DHT11', '2022-11-08', 10, 102),
('Sensor de Temperatura', '°C', 'LM35', '2021-07-19', 20, 103);

-- Inserindo dados na tabela dadosSensor
INSERT INTO dadosSensor (dataHora, temperatura, umidade, fkSensor) VALUES
('2023-07-15 14:35:21', 18.0, 77.0, 101),
('2024-03-22 08:12:47', 16.0, 83.0, 102);

-- Inserindo dados na tabela alertaSensor
INSERT INTO alertaSensor (dataHora, tipoAlerta, descricaoAlerta, valorMinimo, valorMaximo, fkSensor) VALUES
('2022-11-03 16:24:55', 'Temperatura Alta', 'A temperatura está acima do ideal na prateleira A1', 10.0, 14.0, 101),
('2021-06-18 09:47:33', 'Umidade Alta', 'A umidade está acima do ideal na prateleira B1', 75.0, 90.0, 102),
('2023-02-25 12:05:18', 'Temperatura Baixa', 'A temperatura está abaixo do ideal na prateleira A2', 8.0, 12.0, 103);

-- Inserindo dados na tabela historicoSensor
INSERT INTO historicoSensor (dataHora, umidade, temperatura, fkSensor) VALUES
('2023-07-15 14:35:21', 77.0, 18.0, 101),
('2024-03-22 08:12:47', 83.0, 16.0, 102);

--  Inserindo dados na tabela limitesideais
INSERT INTO limitesideais (tipo, valor_min, valor_max) VALUES
('Umidade', 75, 95),
('Temperatura', 7,12);
