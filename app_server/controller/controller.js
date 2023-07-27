const AppointmentModel = require("../models/appointmentModel");
const AuthModel = require("../models/AuthModel");

module.exports.home = function (req, res) {
  res.render("home");
};

module.exports.loginOperations = function (req, res) {
  res.render("login-operations");
};
