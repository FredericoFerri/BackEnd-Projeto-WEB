const SessoesModel = require("../Models/SessoesModel");

class SessoesController {
  async create(req, res) {
    //Função para criação de sessão
    try {
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
      const { id } = req.params; //Identificação de Sessão por id

      await SessoesModel.findByIdAndDelete(id); //Deleta Sessão por id

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
