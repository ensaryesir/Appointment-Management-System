const AppointmentModel = require("../models/appointmentModel");
const AuthModel = require("../models/AuthModel");

// listing appointments
exports.listAppointments = async (req, res) => {
    try {
      const appointments = await AppointmentModel.find();
      //console.log(appointments); // showing data in the console (depending in the request)
      res.render("appointments.ejs", { appointments: appointments });
    } catch (err) {
      console.error("Error fetching appointments:", err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  // create appointment
  exports.createAppointment = async (req, res) => {
    try {
      const { date, time, subject, participants } = req.body;
  
      const newAppointment = new AppointmentModel({
        date,
        time,
        subject,
        participants: participants
          .split(",")
          .map((participant) => participant.trim()),
      });
      await newAppointment.save();
  
      // After adding a new appointment, redirect to the appointments page
      res.redirect("/appointments");
    } catch (err) {
      console.error("Error adding appointment:", err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  // delete appointment
  exports.deleteAppointment = async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const deletedAppointment = await AppointmentModel.findOneAndDelete({
        _id: appointmentId,
      });
  
      if (!deletedAppointment) {
        return res.status(404).send("No appointment could be found.");
      }
  
      res.redirect("/appointments");
    } catch (err) {
      console.error("Error deleting appointment:", err);
      res.status(500).send("Internal Server Error");
    }
  };