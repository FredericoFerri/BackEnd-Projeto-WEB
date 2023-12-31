const mongoose = require("mongoose");
const { string } = require("zod");
const bcrypt = require("bcrypt");
const SessoesModel = require("./SessoesModel");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  email_usuario: {
    type: String,
    unique: true,
  },
  senha_usuario: {
    type: String,
    select: false,
  },
  nome_usuario: {
    type: String,
    unique: true,
  },
  cargo_usuario: String,
  departamento_usuario: String,
});

UsuarioSchema.pre("save", async function (next) {
  //Função executada antes de se salvar um novo usuário
  const usuario = this;

  //Alteração aqui!
  if (usuario.isModified("senha_usuario")) {
    const salt = await bcrypt.genSalt(); //Criando a base da criptografia
    const hash = await bcrypt.hash(usuario.senha_usuario, salt); //Criptografia de senha_usuario

    usuario.senha_usuario = hash;

    //console.log({ salt, hash });
  }
  next();
});

UsuarioSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    //Função para deletar qualquer sessão associada a um usuário a ser deletado
    const usuario = this; //Usuário a ser deletado

    console.log("Sessão de usuário ${usuario._id} a ser deletada!");
    return SessoesModel.deleteOne({ id_usuarios: usuario._id }); //Deletando a sessão referente ao id do user a ser deletado
  }
);

const UsuarioModel = mongoose.model("Usuarios", UsuarioSchema);

module.exports = UsuarioModel;
