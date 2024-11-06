var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}





function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;
  var nomeFantasia = req.body.nomeFantasia;
  var telefone = req.body.telefone;
  var representanteLegal = req.body.representanteLegal;
  var email = req.body.email;
  var cpf = req.body.cpfRepresentante;
  var senhaEmpresa = req.body.senhaEmpresa;  

  if (!cnpj || !razaoSocial || !nomeFantasia || !telefone || !representanteLegal || !email || !cpf || !senhaEmpresa) {
      return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios para a empresa!" });
  }

  empresaModel.cadastrar(razaoSocial, nomeFantasia, cnpj, telefone, representanteLegal, email, cpf, senhaEmpresa)
      .then((resultado) => {
          res.status(201).json(resultado);
      })
      .catch((erro) => {
          console.error("Erro ao cadastrar empresa:", erro);
          res.status(500).json({ mensagem: "Erro ao cadastrar empresa", erro: erro.sqlMessage });
      });
}
module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar, 
  listar,
};
