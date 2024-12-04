var express = require("express");
var router = express.Router();

var salasController = require("../controllers/salasController"); 

// Rota para buscar salas de maturação por ID da empresa
router.get("/:empresaId", function (req, res) {
  console.log("oi")
  salasController.buscarSalasPorEmpresa(req, res);
});

// Rota para cadastrar uma nova sala de maturação
router.post("/cadastrar", function (req, res) {
  salasController.cadastrarSala(req, res);
});

module.exports = router;
