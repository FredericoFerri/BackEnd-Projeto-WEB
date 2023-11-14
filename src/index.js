const dotenv = require("dotenv");
const app = require("./app");
const Loaders = require("./Loaders/index");

dotenv.config();
Loaders.start();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Servidor rodando!"));
