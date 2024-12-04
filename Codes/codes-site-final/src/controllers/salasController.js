var salasModel = require("../models/salasModel");

async function buscarSalasPorEmpresa(req, res) {
  try {
    const idEmpresa = req.params.idEmpresa;

    if (!idEmpresa) {
      return res.status(400).send("O ID da empresa é obrigatório!");
    }

    const resultado = await salasModel.buscarSalasPorEmpresa(idEmpresa);

    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhuma sala encontrada para a empresa especificada.");
    }
  } catch (erro) {
    console.error("Erro ao buscar salas: ", erro);
    res.status(500).json({ error: erro.sqlMessage || "Erro no servidor." });
  }
}


function cadastrarSala(req, res) {
  var { nomeLocal, descricaoLocal, capacidadeEstantes, areaSala, fkEmpresa } = req.body;

  // Validação
  if (!nomeLocal || !fkEmpresa) {
    return res.status(400).send("Os campos nomeLocal e fkEmpresa são obrigatórios!");
  }

  if (capacidadeEstantes && isNaN(capacidadeEstantes)) {
    return res.status(400).send("O campo capacidadeEstantes deve ser numérico.");
  }

  // Chama o modelo
  salasModel.cadastrarSala(nomeLocal, descricaoLocal, capacidadeEstantes, areaSala, fkEmpresa)
    .then((resultado) => {
      res.status(201).json({ message: "Sala cadastrada com sucesso!", resultado });
    })
    .catch((erro) => {
      console.error("Erro ao cadastrar a sala: ", erro);
      res.status(500).json({ error: erro.sqlMessage });
    });
}


module.exports = {
  buscarSalasPorEmpresa,
  cadastrarSala
};
