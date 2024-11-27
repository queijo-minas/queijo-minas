
const express = require("express");
const router = express.Router();
const historicoController = require("../controllers/historicoController");

// Rota para obter histórico de uma sala de maturação
router.get("/historico/:fkLocalMaturacao", historicoController.obterHistorico);

module.exports = router;
