const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async create(req, res) {
    //Função para criação de um usuário
    try {
      const Usuario = await UsuarioModel.create(req.body); //Acesso às informações de usuário

      const { senha_usuario, ...novoUsuario } = Usuario.toObject(); //novoUsuario possui todas as informações de usuário, exceto a senha

      return res.status(200).json(novoUsuario); //Status de usuário criado - Usuário criado com sucesso
    } catch (error) {
      res.status(500).json({
        message: "Erro. Cadastro de usuário mal sucedido",
        error: error.message,
      });
    }
  }

  async read(req, res) {
    // Função de leitura da base de dados
    try {
      const usuarios = await UsuarioModel.find(); //Achar os usuários da tabela

      return res.status(200).json(usuarios); //Retorno de status do usuário - Requisição de sucesso
    } catch (error) {
      res.status(500).json({
        message: "Erro. Leitura de usuários mal sucedida",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    //Função para atualizar dados do usuário
    try {
      const { id } = req.params; //Identificação de usuário por id

      //Verificação de existência de usuário na database:
      //-----------------------------------------------------------
      const usuarioEncontrado = await UsuarioModel.findById(id); //Procura por usuário na database

      if (!usuarioEncontrado) {
        //Usuário não encontrado na base de dados
        return res.status(404).json({ message: "Usuario não encontrado!" });
      }
      //-----------------------------------------------------------

      const usuario = await usuarioEncontrado.set(req.body).save(); //Setando novos campos vindos no body da requisição
      //Função save retorna a 'usuario' os dados do usuário alterado

      return res.status(200).json(usuario); //Retorno de status do usuário - Usuário atualizado com sucesso
    } catch (error) {
      res.status(500).json({
        message: "Erro. Atualização de cadastro mal sucedida",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    //Função para deletar usuários
    try {
      const { id } = req.params; //Identificação de usuário por id

      //Verificação de existência de usuário na database:
      //-----------------------------------------------------------
      const usuarioEncontrado = await UsuarioModel.findById(id); //Procura por usuário na database

      if (!usuarioEncontrado) {
        //Usuário não encontrado na base de dados
        return res.status(404).json({ message: "Usuario não encontrado!" });
      }
      //-----------------------------------------------------------

      await UsuarioModel.findByIdAndDelete(id); //Deleta usuários por id

      return res.status(200).json("mensagem: Usuario deletado com sucesso!"); //Retorno de status do usuário - Deletado com sucesso
    } catch (error) {
      res.status(500).json({
        message: "Erro. Atualização de cadastro mal sucedida",
        error: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
