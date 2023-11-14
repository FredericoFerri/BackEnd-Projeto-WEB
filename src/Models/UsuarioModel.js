const mongoose = require("mongoose");
const { string } = require("zod");
const bcrypt = require("bcrypt");

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
  const user = this;

  if (user.isModified("senha_usuario")) {
    const salt = await bcrypt.genSalt(); //Criando a base da criptografia
    const hash = await bcrypt.hash(user.senha_usuario, salt); //Criptografia de senha_usuario

    user.senha_usuario = hash;

    //console.log({ salt, hash });
  }
  next();
});

const UsuarioModel = mongoose.model("Usuarios", UsuarioSchema);

module.exports = UsuarioModel;
