const express = require("express");
const router = express.Router();
const historicoController = require("../controllers/historicoController");

// Rota para obter o histórico de um local de maturação
router.get("/historico/:fkLocalMaturacao", historicoController.obterHistorico);

// Rota para obter alertas de um local de maturação
router.get("/alertas/:fkLocalMaturacao", historicoController.obterAlertas);

module.exports = router;
