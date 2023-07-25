const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
});

const AuthModel = mongoose.model("auths", authSchema);

module.exports = AuthModel;
