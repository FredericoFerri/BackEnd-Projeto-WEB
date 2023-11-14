const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SessoesSchema = new Schema(
  {
    //horario_login: data,
    //tempo_login: data,
    id_usuarios: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const SessoesModel = mongoose.model("Sessoes", SessoesSchema);

module.exports = SessoesModel;
