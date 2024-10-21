// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// simular um arduino de LM35
const SIMULACAO_ARDUINO_TEMPERATURA = true;

// função para comunicação serial
const serial = async (
    valoresTemperatura,
    valoresUmidade,
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '192.168.56.1', /* ip da maquina da eduarda */
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'queijoNoPontoDB',
            port: 3307  /* porta que faz conexão com a maquina vitual*/
    }).promise();

    if (SIMULACAO_ARDUINO_TEMPERATURA) {
        // Simula a leitura do sensor LM35
        setInterval(async () => {
            const temperatura = (Math.random() * 40) + 1; // gera números entre 1 e 40 para simular a temperatura
            console.log(`Temperatura simulada: ${temperatura.toFixed(2)}`);

            // Armazena os valores dos sensores nos arrays correspondentes
            valoresTemperatura.push(temperatura);

            // Insere os dados no banco de dados (se habilitado)
            if (HABILITAR_OPERACAO_INSERIR) {
                await poolBancoDados.execute(
                    `INSERT INTO DadosSensores (FkTipoSensor, temperatura) VALUES (1, ?)`,
                    [temperatura]
                );
                console.log("Valores inseridos no banco: ", temperatura.toFixed(2));
            }
        }, 2000);
    } else {
        // Lista as portas seriais disponíveis e procura pelo Arduino
        const portas = await serialport.SerialPort.list();
        const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);

        if (!portaArduino) {
            throw new Error('O Arduino não foi encontrado em nenhuma porta serial');
        }

        // Configura a porta serial com o baud rate especificado
        const arduino = new serialport.SerialPort({
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        });

        // Evento quando a porta serial é aberta
        arduino.on('open', () => {
            console.log(`A leitura do Arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
        });

        // Processa os dados recebidos do Arduino
        arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
            console.log(data);
            const valores = data.split(';');
            const sensorTemperatura = parseInt(valores[0]);
            const sensorUmidade = parseFloat(valores[1]);

            // Armazena os valores dos sensores nos arrays correspondentes
            valoresTemperatura.push(sensorTemperatura);
            valoresUmidade.push(sensorUmidade);

            // Insere os dados no banco de dados (se habilitado)
            if (HABILITAR_OPERACAO_INSERIR) {
                await poolBancoDados.execute(
                    'INSERT INTO DadosSensores (FkTipoSensor, umidade) VALUES (2, ?)',
                    [sensorUmidade]
                );
                await poolBancoDados.execute(
                    'INSERT INTO DadosSensores (FkTipoSensor, temperatura) VALUES (1, ?)',
                    [sensorTemperatura]
                );
                console.log("Valores inseridos no banco: ", sensorUmidade + ", " + sensorTemperatura);
            }
        });

        // Evento para lidar com erros na comunicação serial
        arduino.on('error', (mensagem) => {
            console.error(`Erro no Arduino: ${mensagem}`);
        });
    }
};

// Função para criar e configurar o servidor web
const servidor = (valoresTemperatura, valoresUmidade) => {
    const app = express();

    // Configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // Inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // Define os endpoints da API para cada tipo de sensor
    app.get('/sensores/analogico', (_, response) => {
        return response.json(valoresTemperatura);
    });

    app.get('/sensores/digital', (_, response) => {
        return response.json(valoresUmidade);
    });
};


// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresTemperatura = [];
    const valoresUmidade = [];

    // inicia a comunicação serial
    await serial(
        valoresTemperatura,
        valoresUmidade
    );
    // inicia o servidor web
    servidor(
        valoresTemperatura,
        valoresUmidade
    );
})();