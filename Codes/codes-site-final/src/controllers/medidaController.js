var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idAquario = req.params.idAquario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idAquario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoReal(req, res) {
    var idDadosSensor = req.params.idDadosSensor;

    console.log(`Recuperando medidas em tempo real para o sensor: ${idDadosSensor}`);

    medidaModel.buscarMedidasEmTempoReal(idDadosSensor)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar medidas em tempo real:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}




function buscarTempoForaIdeal(req, res) {
    var fkSensor = req.params.fkSensor;

    medidaModel.calcularTempoForaIdeal(fkSensor).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(404).send("Nenhum dado encontrado para o sensor informado.");
        }
    }).catch((erro) => {
        console.error("Erro ao buscar os tempos fora da média ideal:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    buscarUltimasMedidas,
    buscarTempoForaIdeal,
    buscarMedidasEmTempoReal, 
};
