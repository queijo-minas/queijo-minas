USE queijoNoPontoDB;

INSERT INTO empresa (razaoSocial, nomeFantasia, representanteLegal, cnpj, email, telefone) VALUES
('Queijaria do Ponto Ltda.','Queijaria do Ponto', 'Cesar Augusto', '12345678000101', 'contato@queijariadoponto.com', '11988887777'),
('Queijos da Serra Ltda.','Queijos da Serra', 'Fernando Pessoa','98765432000102', 'vendas@queijosdaserra.com', '11999996666'),
('Laticínios Boa Vista Ltda.','Laticínios Boa Vista', 'Vivian Marques', '11122233000103', 'fabrica@boavista.com', '1133221100'),
('Delícias do Campo Ltda.','Delícias do Campo', 'Juliano Bela Vista','44455566000104', 'contato@deliciasdocampo.com', '11988776655'),
('Queijos Artesanais Ltda.','Queijos Artesanais', 'Frizzarini Cluadio', '55566677000105', 'artesanal@queijosartesanais.com', '11999885555');

INSERT INTO endereco (logradouro, numero, cidade, cep, fkEmpresa) VALUES
('Rua do Queijo', '123', 'Centro', '01001000', 1),
('Av. da Maturação', '321', 'Rio', '22041010', 2),
('Estrada do Leite', '55', 'Campinas', '13040000', 3),
('Rua dos Fazendeiros', '88', 'Sorocaba', '18035000', 4),
('Travessa do Sabor', '22', 'Belo Horizonte', '30140000', 5);


INSERT INTO usuario (nome, cpf, telefone, nomeNivelAcesso, fkNivelAcesso) VALUES
('João Silva', '12345678901', '11987654321','Administrador', 1),
('Maria Souza', '23456789012', '11991234567','Comum', 2), 
('José Ferreira', '34567890123', '11999887766', 'Comum', 2);

INSERT INTO login (email, senha, FkUsuario) VALUES
('contato@queijariadoponto.com', 'qj536$55', 1),
('vendas@queijosdaserra.com', 'qj536$55', 2),
('recrusosHumanos@queijosdaserra.com', 'qj536$55', 3);

INSERT INTO LocalMaturacao (nomeLocal, descricaoLocal, temperaturaIdeal, umidadeIdeal, capacidadePrateleiras) VALUES
('Sala de Maturação 1', 'Sala principal com 10 prateleiras para maturação de queijos', 12.5, 80.0, 10),
('Sala de Maturação 2', 'Sala com temperatura controlada para queijos finos', 14.0, 85.0, 8),
('Sala de Prateleiras Externas', 'Sala auxiliar para queijos de longa maturação', 10.0, 70.0, 15),
('Câmara de Maturação 3', 'Área de controle climático avançado para produção artesanal', 13.0, 82.0, 12),
('Câmara Externa de Maturação', 'Área adicional para maturação em temperatura ambiente', 15.0, 75.0, 4);

INSERT INTO LocalMaturacaoUsuario (fkLocalMaturacao, fkUsuario, dataAssociacao) VALUES
(1, 1, '2024-09-20'),
(2, 2, '2024-01-10'),
(5, 3, '2024-07-05');

INSERT INTO Prateleira (identificacaoPrateleira, capacidadeMaxima, altura, largura, profundidade, fkLocalMaturacao) VALUES
('Prateleira A1', 50, '2.0', '1.5', '0.6', 1),
('Prateleira A2', 60, '2.5', '1.8', '0.7', 1),
('Prateleira B1', 40, '1.8', '1.2', '0.5', 2),
('Prateleira B2', 45, '2.0', '1.3', '0.6', 2),
('Prateleira C1', 55, '2.3', '1.4', '0.8', 5);

INSERT INTO SensorPrateleira ( nivelPrateleira, dataInstalacao, quantidadeTotal, fkPrateleira) VALUES
(1, '2024-08-01', 2, 1),
(2, '2024-08-01', 2, 1),
(4, '2024-08-02', 2, 2),
(3, '2024-08-03', 3, 2),
(7, '2024-08-04', 4, 5);

INSERT INTO tipoSensor VALUES
(default, 'LM35', 'Temperatura', '°C', 7),
(default, 'DHT11', 'Umidade', '%', 8);

INSERT INTO DadosSensores (FkTipoSensor, umidade) VALUES 
(2, 80.00);

INSERT INTO DadosSensores (FkTipoSensor, temepratura) VALUES 
(1 , 20.00);

INSERT INTO AlertaSensor (tipoAlerta, descricaoAlerta, fkSensorPrateleira) VALUES
('Temperatura Alta', 'A temperatura está acima do ideal na Prateleira A1', 7),
('Umidade Alta', 'A umidade está acima do ideal na Prateleira B1', 9),
('Temperatura Baixa', 'A temperatura está abaixo do ideal na Prateleira A2', 8),
('Temperatura Alta', 'A temperatura está acima do ideal na Prateleira B2', 6),
('Temperatura Alta', 'A temperatura está acima do ideal na Prateleira C1', 6);


