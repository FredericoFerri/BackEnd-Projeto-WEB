const { Router } = require("express");
const UsuarioController = require("./Controllers/UsuarioController");
const SessoesController = require("./Controllers/SessoesController");

const UsuarioValidator = require("./Validators/UsuarioValidator");
const SessoesValidator = require("./Validators/SessoesValidator");

const rotas = Router(); //Inicialização das rotas

//Usuarios
rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", UsuarioController.read);
rotas.delete(
  "/usuarios/:id",
  UsuarioValidator.destroy,
  UsuarioController.delete
);
rotas.put("/usuarios/:id", UsuarioValidator.update, UsuarioController.update);

//Sessoes
rotas.post("/sessoes", SessoesValidator.create, SessoesController.create);
rotas.get("/sessoes", SessoesController.read);
rotas.delete(
  "/sessoes/:id",
  SessoesValidator.destroy,
  SessoesController.delete
);

module.exports = rotas;
