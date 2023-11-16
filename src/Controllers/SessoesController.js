const SessoesModel = require("../Models/SessoesModel");
const UsuarioModel = require("../Models/UsuarioModel");

class SessoesController {
  async create(req, res) {
    //Função para criação de sessão
    try {
      const usuarioEncontrado = await UsuarioModel.findById(
        req.body.id_usuarios
      ); //Verifica se o id do body da req. pertence a um usuário existente

      if (!usuarioEncontrado) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      const Sessoes = await SessoesModel.create(req.body); //Acesso às informações de sessão

      return res.status(200).json(Sessoes); //Status de sessão criado - sessão criado com sucesso
    } catch (error) {
      res.status(500).json({
        message: "Erro. Criação de sessão mal sucedida",
        error: error.message,
      });
    }
  }

  async read(req, res) {
    // Função de leitura da base de dados
    try {
      const Sessoes = await SessoesModel.find().populate(
        "id_usuarios",
        "-senha_usuario"
      ); //Achar a Sessão da tabela e dados do usuário cadastrado na sessão

      return res.status(200).json(Sessoes); //Retorno de status de Sessão - Requisição de sucesso
    } catch (error) {
      res.status(500).json({
        message: "Erro. Leitura de sessão mal sucedida",
        error: error.message,
      });
    }
  }

  update(req, res) {}

  async delete(req, res) {
    //Função para deletar sessão
    try {
      const { id_usuarios } = req.params; //Identificação de Sessão por id

      const sessaoEncontrada = await SessoesModel.findOne({ id_usuarios }); //Procurando uma sessão referente ao id_usuario

      if (!sessaoEncontrada) {
        return res.status(404).json({ message: "Sessão não encontrada!" });
      }

      await sessaoEncontrada.deleteOne();

      return res.status(200).json("mensagem: Sessão deletada com sucesso!"); //Retorno de status de Sessão - Deletado com sucesso
    } catch (error) {
      res.status(500).json({
        message: "Erro. Deletar sessão mal sucedida",
        error: error.message,
      });
    }
  }
}

module.exports = new SessoesController();
