const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  subject: String,
  participants: [String],
});

const AppointmentModel = mongoose.model(
  "appointmentcollection",
  appointmentSchema
);

module.exports = AppointmentModel;
