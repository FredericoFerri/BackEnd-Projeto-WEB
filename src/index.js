const app = require("./app");
const Loaders = require("./Loaders/index");

Loaders.start();

app.listen(8000, () => console.log("Servidor rodando!"));
