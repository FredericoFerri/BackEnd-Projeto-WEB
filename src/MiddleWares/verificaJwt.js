const jwt = require("jsonwebtoken");

function verificaJwt(req, res, next) {
  //Constante que armazena o header
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    //Caso authHeader não armazene o header
    return res
      .status(403)
      .json({ message: "Header de autorização não encontrado!" });
  }

  //FORMATO TOKEN: { authHeader: 'Bearer valordotoken' }
  const [bearer, token] = authHeader.split(" ");

  //Testar os parâmetros Bearer e token
  if (!/^Bearer$/.test(bearer)) {
    return res
      .status(403)
      .json({ message: "Header de autorização mal formatado!" });
  }
  if (!token) {
    return res.status(403).json({ message: "Token JWT não encontrado!" });
  }

  //Teste de validação de token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, usuario) => {
    if (err) {
      return res.status(403).json({ message: "Token JWT inválido!" });
    }

    req.usuarioId = usuario._id;
    next();
  });

  //console.log({ bearer, token });
}

module.exports = verificaJwt;
