const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");

const login = validateRequest({
  body: z.object({
    //Validação de email e senha
    email_usuario: z
      .string({ required_error: "O email é obrigatório" })
      .email("O email é inválido"),
    senha_usuario: z.string({ required_error: "A senha é obrigatória" }),
  }),
});

module.exports = {
  login,
};
