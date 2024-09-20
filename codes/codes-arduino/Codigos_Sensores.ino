
// BLOCO 1 (DECLARAÇÃO BIBLIOTECA DHT, PORTAS E VARIAVEIS DE DADOS)

// CÓDIGO SENSORES DE TEMPERATURA (LM35) E DE UMIDADE E TEMPERATURA (DHT11)

  #include "DHT.h" //TRAZ A BIBLIOTECA DOS SENSORES "DHT"

  #define TIPO_SENSOR DHT11 //DEFINE O SENSOR QUE SERÁ UTILIZADO (DHT11) 

  // LM35
  const int PINO_SENSOR_TEMPERATURA = A0; //CONSTANTE QUE INDICA A PORTA QUE SERÁ UTILIZADA NO SENSOR LM35 (A0)

  float temperaturaCelsius; //VARIÁVEL QUE ARMAZENARA A TEMPERATURA DO SENSOR LM35

  // DHT11
  const int PINO_SENSOR_DHT11 = A1; //CONSTANTE QUE INDICA A PORTA QUE SERÁ UTILIZADA NO SENSOR DHT11(A1)

  DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR); //CRIA UMA VARIÁVEL "DHT" PARA O SENSOR DHT11


// BLOCO 2 (EXECUÇÃO DESTE CÓDIGO QUANDO O ARDUINO FOR DETECTADO)
  void setup() { //EXECUTADA QUANDO O CODIGO É INICIADO

      Serial.begin(9600); //DEFINE A TAXA DE BITS POR SEGUNDO UTILIZADA NA TRANSCRIÇÃO DE DADOS 

      sensorDHT.begin(); //INICIALIZA O SENSOR DHT11
      }



// BLOCO 3 ("LOOP" DE EXECUÇÃO E PRINT DAS DADOS NA PLOTAGEM)

  void loop() { //EXECUTARÁ O CÓDIGO ENQUANTO ESTA CONDIÇÃO FOR VERDADEIRA

      int valorLeitura = analogRead(PINO_SENSOR_TEMPERATURA); //OBTÉM O VALOR DE TEMPERATURA RECEBIDO NA PORTA REFERIDA 

      temperaturaCelsius = (valorLeitura * 5.0 / 1023.0) / 0.01; // CONVERTE A TEMPERATURA PARA CELSIUS

      float umidade = sensorDHT.readHumidity(); //OBTÉM A UMIDADE DO SENSOR DHT11


      if (isnan(umidade) || isnan(temperaturaCelsius)) {
          Serial.println("Erro ao ler os dados do sensor"); //SE AS VARIÁVEIS NÃO FOREM UM NÚMERO, PRINTARÁ A SEGUINTE MENSAGEM
      } else {
          
          //SE TUDO ESTIVE CORRETO, PRINTARÁ OS DADOS DE UMIDADE DO SENSOR DE DHT11 E DADOS DE TEMPERATURA DO SENSOR LM35 
          Serial.print("UmidadeMin:");
          Serial.print(80); // METRICAS DE UMIDADE MINIMA
          Serial.print(" ");
          Serial.print("Umidade:");
          Serial.print(umidade); //DADOS DO SENSOR DE UMIDADE
          Serial.print(" ");
          Serial.print("TemperaturaMáx:");
          Serial.print(18); // METRICAS DE TEMPERATURA MAXIMA
          Serial.print(" ");
          Serial.print("TemperaturaMin:");
          Serial.print(15); // METRICAS DE TEMPERATURA MINIMA 
          Serial.print(" ");
          Serial.print("Temperatura:");
          Serial.println(temperaturaCelsius); // DADOS DO SENSOR DE TEMPERATURA
      }

      delay(1000); //AGUARDARÁ UM SEGUNDO ANTES DE FAZER O PROXÍMO PRINT
  }


