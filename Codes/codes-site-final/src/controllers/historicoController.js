var historicoModel = require("../models/historicoModel");

function buscarHistorico(req, res) {
    const idSala = req.params.idSala;

    if (!idSala) {
        res.status(400).send("O ID da sala de maturação é obrigatório!");
        return;
    }

    historicoModel.buscarHistorico(idSala)
        .then((resultados) => {
            if (resultados.length === 0) {
                res.status(404).send("Nenhum histórico encontrado para esta sala.");
            } else {
                res.json(resultados);
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar histórico:", erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    buscarHistorico,
};
