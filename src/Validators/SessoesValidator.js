const { default: mongoose } = require("mongoose");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");

//PADRÃO DE SESSÃO
//id_usuarios: {
//    type: Schema.Types.ObjectId,
//    ref: "Usuarios",
//  }

//-----------------------------------------------------------

//Validação para criação de sessão
const create = validateRequest({
  body: z.object({
    id_usuarios: z.custom(
      mongoose.isValidObjectId,
      "O id do usuário não é válido"
    ),
  }),
});

//Validação para deletar sessão
const destroy = validateRequest({
  //Validar os parâmetros
  params: z.object({
    id_usuarios: z.custom(
      mongoose.isValidObjectId,
      "O id do usuário não é válido"
    ),
  }),
});
module.exports = { create, destroy };
