const UsuarioModel = require("../Models/UsuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async login(req, res) {
    //Controlador de Login
    try {
      //Verificação de dados de login cliente
      //---------------------------------------------------------------------------
      const { email_usuario, senha_usuario } = req.body;
      const UsuarioEncontrado = await UsuarioModel.findOne({
        email_usuario,
      }).select("+senha_usuario"); //Procura pelos dados de login nos registros

      if (!UsuarioEncontrado) {
        //Se o email da requisição não bater com nenhum do banco de dados
        return res.status(403).json({ message: "Email e/ou senha inválidos" });
      }

      //Verifica se as senhas são correspondentes
      const isCorrespondente = await bcrypt.compare(
        senha_usuario,
        UsuarioEncontrado.senha_usuario
      );

      if (!isCorrespondente) {
        return res.status(403).json({ message: "Email e/ou senha inválidos" });
      }
      //---------------------------------------------------------------------------

      //Envio de token JWT para cliente
      //---------------------------------------------------------------------------
      const { senha_usuario: hashedSenha, ...usuario } =
        UsuarioEncontrado.toObject(); //Criação de objeto com base no resultado da query

      const token = jwt.sign({ usuario }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }); //Definição de token jwt

      //console.log({ UsuarioEncontrado });

      res.status(200).json({ token });
      //---------------------------------------------------------------------------
    } catch (error) {
      res.status(500).json({
        message: "Erro. Leitura de usuários mal sucedida",
        error: error.message,
      });
    }
  }
}

module.exports = new AuthController();
