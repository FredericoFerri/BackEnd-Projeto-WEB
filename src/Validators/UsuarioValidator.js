const { default: mongoose } = require("mongoose");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");

//PADRÃO DE CADASTRO DE USUÁRIO
//{
//	"email_usuario": "teste@teste.com",
//	"senha_usuario": "teste_123",
//	"nome_usuario": "Fulano Siclano",
//	"cargo_usuario": "Piloto",
//	"departamento_usuario": "Aviacao"
//}

//-----------------------------------------------------------

//Validação da criação de usuário
const create = validateRequest({
  body: z.object({
    nome_usuario: z.string({ required_error: "O nome é obrigatório" }),
    email_usuario: z
      .string({ required_error: "O email é obrigatório" })
      .email("O email é inválido"),
    senha_usuario: z.string({ required_error: "A senha é obrigatória" }),
    cargo_usuario: z.string({ required_error: "O cargo é obrigatório" }),
    departamento_usuario: z.string({
      required_error: "O departamento é obrigatório",
    }),
  }),
});

//Validação para deletar usuário
const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
  }),
});

//Validação para atualização de dados
const update = validateRequest({
  //Validar o body da requisição
  body: z.object({
    nome_usuario: z.string().optional(),
    email_usuario: z.string().email("O email é inválido").optional(),
    senha_usuario: z.string().optional(),
    cargo_usuario: z.string().optional(),
    departamento_usuario: z.string().optional(),
  }),
  //Validar os parâmetros
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
  }),
});

module.exports = { create, destroy, update };
