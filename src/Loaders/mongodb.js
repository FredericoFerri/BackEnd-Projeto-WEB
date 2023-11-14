const mongoose = require("mongoose");

//Senha aparente NÃO é boa prática
async function startDB() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = startDB;
