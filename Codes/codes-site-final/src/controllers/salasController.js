var salasModel = require("../models/salasModel");

function buscarSalasPorEmpresa(req, res) {
  const idEmpresa = req.params.empresaId
  console.log(idEmpresa)
  
    if (!idEmpresa) {
      return res.status(400).send("O ID da empresa é obrigatório!");
    }

     salasModel.buscarSalasPorEmpresa(idEmpresa).then(function (resultado) {
       if (resultado.length > 0) {
        console.log("foi aqui",resultado)
         res.status(200).json(resultado);
       } else {
         res.status(204).send("Nenhuma sala encontrada para a empresa especificada.");
       }
     })

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
