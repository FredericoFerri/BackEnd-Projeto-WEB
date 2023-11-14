const mongoose = require("mongoose");

//Senha aparente NÃO é boa prática
async function startDB() {
  await mongoose.connect(
    "mongodb+srv://fredericoferri:DpkuFeYypTO4TdrK@projetoweb.pqwji14.mongodb.net/?retryWrites=true&w=majority"
  );
}

module.exports = startDB;
