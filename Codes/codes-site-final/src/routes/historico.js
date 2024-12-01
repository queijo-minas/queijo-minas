const express = require("express");
const router = express.Router();
const historicoController = require("../controllers/historicoController");

// Rota para buscar histórico com base no ID da sala
router.get("/:idSala", historicoController.buscarHistorico);

module.exports = router;
