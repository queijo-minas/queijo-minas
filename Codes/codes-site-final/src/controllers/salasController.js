var salasModel = require("../models/salasModel");

function buscarSalasPorEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;

  salasModel.buscarSalasPorEmpresa(idEmpresa)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]); // Sem conteúdo
      }
    })
    .catch((erro) => {
      console.log("Erro ao buscar as salas: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarSala(req, res) {
  var { nomeLocal, descricaoLocal, capacidadeEstantes, areaSala, fkEmpresa } = req.body;

  // Validação simples
  if (!nomeLocal || !fkEmpresa) {
    res.status(400).send("Campos obrigatórios não preenchidos!");
  } else {
    salasModel.cadastrarSala(nomeLocal, descricaoLocal, capacidadeEstantes, areaSala, fkEmpresa)
      .then((resultado) => {
        res.status(201).json({ message: "Sala cadastrada com sucesso!", resultado });
      })
      .catch((erro) => {
        console.log("Erro ao cadastrar a sala: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarSalasPorEmpresa,
  cadastrarSala
};
