const express = require("express");
const rotas = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(rotas);
app.use("*", (req, res) => {
  res.status(404).json({ message: `Rota '${req.baseUrl}' não encontrada` }); //identificação de rota inexistente
});

module.exports = app;

//DpkuFeYypTO4TdrK

//mongodb+srv://fredericoferri:<password>@projetoweb.pqwji14.mongodb.net/?retryWrites=true&w=majority