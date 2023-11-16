function verificaUsuario(req, res, next) {
  const usuarioId =
    req.params.id || req.params.id_usuarios || req.body.id_usuarios;

  if (req.usuarioId != usuarioId) {
    //Verifica se o usuário da requisição é equivalente ao usuário do token
    return res.status(401).json({ message: "Operação não autorizada" });
  }

  //console.log({ usuarioId: req.usuarioId });
  next();
}

module.exports = verificaUsuario;
