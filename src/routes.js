const { Router } = require("express");
const UsuarioController = require("./Controllers/UsuarioController");
const SessoesController = require("./Controllers/SessoesController");
const AuthController = require("./Controllers/AuthController");

const UsuarioValidator = require("./Validators/UsuarioValidator");
const SessoesValidator = require("./Validators/SessoesValidator");
const AuthValidator = require("./Validators/AuthValidator");

const verificaJwt = require("./MiddleWares/verificaJwt");

const rotas = Router(); //Inicialização das rotas

//USUÁRIOS
//---------------------------------------------------------------
rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", verificaJwt, UsuarioController.read);
rotas.delete(
  "/usuarios/:id",
  verificaJwt,
  UsuarioValidator.destroy,
  UsuarioController.delete
);
rotas.put(
  "/usuarios/:id",
  verificaJwt,
  UsuarioValidator.update,
  UsuarioController.update
);
//---------------------------------------------------------------

//SESSÕES
//---------------------------------------------------------------
rotas.post(
  "/sessoes",
  verificaJwt,
  SessoesValidator.create,
  SessoesController.create
);
rotas.get("/sessoes", verificaJwt, SessoesController.read);
rotas.delete(
  "/sessoes/:id_usuarios",
  verificaJwt,
  SessoesValidator.destroy,
  SessoesController.delete
);
//---------------------------------------------------------------

//Autenticação
rotas.post("/login", AuthValidator.login, AuthController.login);

module.exports = rotas;
