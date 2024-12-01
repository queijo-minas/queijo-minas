const historicoModel = require("../models/historicoModel");

// Função para obter o histórico de um local de maturação
exports.obterHistorico = async (req, res) => {
    const { fkLocalMaturacao } = req.params;

    try {
        const historico = await historicoModel.buscarHistorico(fkLocalMaturacao);

        if (historico.length > 0) {
            res.status(200).json(historico);
        } else {
            res.status(404).send("Nenhum dado encontrado para este local de maturação.");
        }
    } catch (error) {
        console.error("Erro ao obter histórico:", error);
        res.status(500).send("Erro ao obter histórico.");
    }
};

// Função para obter alertas de um local de maturação
exports.obterAlertas = async (req, res) => {
    const { fkLocalMaturacao } = req.params;

    try {
        const alertas = await historicoModel.buscarAlertas(fkLocalMaturacao);

        if (alertas) {
            res.status(200).json(alertas);
        } else {
            res.status(404).send("Nenhum alerta encontrado para este local de maturação.");
        }
    } catch (error) {
        console.error("Erro ao obter alertas:", error);
        res.status(500).send("Erro ao obter alertas.");
    }
};
