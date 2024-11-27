const historicoModel = require("../models/historicoModel");

// Função para obter histórico de uma sala de maturação
async function obterHistorico(req, res) {
    const { fkLocalMaturacao } = req.params;

    // Verifica se o ID da sala foi fornecido
    if (!fkLocalMaturacao) {
        return res.status(400).send("ID da sala de maturação não fornecido.");
    }

    try {
        // Chama o model para buscar os dados do histórico
        const historico = await historicoModel.obterHistorico(fkLocalMaturacao);

        // Verifica se há dados no histórico
        if (historico.length === 0) {
            return res.status(404).send("Nenhum histórico encontrado para esta sala de maturação.");
        }

        res.status(200).json(historico); // Retorna o histórico em formato JSON
    } catch (error) {
        console.error("Erro ao obter histórico:", error);
        res.status(500).send("Erro ao tentar buscar o histórico.");
    }
}

module.exports = {
    obterHistorico,
};
