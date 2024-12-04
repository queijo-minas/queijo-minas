// Definindo ambiente e caminho do arquivo .env
var ambiente_processo = 'desenvolvimento'; 
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

// Importação das dependências
var express = require("express");
var cors = require("cors");
var path = require("path");

// Definição da porta e do host a partir das variáveis de ambiente
var PORTA_APP = process.env.APP_PORT || 3333;
var HOST_APP = process.env.APP_HOST || 'localhost';

var app = express();


var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var salasRouter = require("./src/routes/salas");
var empresasRouter = require("./src/routes/empresas");
var historicoRouter = require("./src/routes/historico");
var bobiaRouter = require('./src/routes/bobia');

var medidaRouter = require("./src/routes/medidas");




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresas", empresasRouter);
app.use("/salas", salasRouter);
app.use("/historico", historicoRouter);
app.use('/bobia', bobiaRouter);





app.use("/medidas", medidaRouter);




app.get('/bobia', (req, res) => {
    res.sendFile(__dirname + '/public/bobia.html');
});

// Outras rotas...







app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
