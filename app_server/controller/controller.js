const AppointmentModel = require("../models/appointmentModel");
const AuthModel = require("../models/AuthModel");

module.exports.home = function (req, res) {
  res.render("home");
};

module.exports.loginOperations = function (req, res) {
  res.render("login-operations");
};

/****************************************************************************************/

exports.loginOrRegisterUser = async (req, res) => {
  try {
    const { email, password, action } = req.body;

    // If action is "login", process user login
    if (action === "login") {
      const user = await AuthModel.findOne({ email });

      // If user not found, return an error
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Verify the password
      if (user.password === password) {

        req.session.user = user; // creating a user session
        console.log("There is a user session:", req.session.user);

        // If login is successful, redirect to the /appointments page
        res.redirect("/appointments");
      } else {
        // If the password is incorrect, return an error
        res.status(401).json({ error: "Invalid password." });
      }
    }
    // If action is "register", save the new user in the database
    else if (action === "register") {
      const { name } = req.body;
      const newUser = new AuthModel({ email, name, password });
      await newUser.save();
     
      req.session.newUser = newUser; // creating a user session
      console.log("There is a user session:", req.session.user);

      // After successful registration, redirect to the /appointments page
      res.redirect("/appointments");
    } else {
      // If the action is invalid, return an error
      res.status(400).json({ error: "Invalid action." });
    }
  } catch (err) {
    console.error("Error during user login/registration:", err);
    res.status(500).json({ error: "An error occurred during the process." });
  }
};

/******************************************************************************************/

// Function for logout operation
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session termination error:", err);
    } else {
      console.log("The session was successfully terminated.");
    }
    res.redirect("/home");
  });
};

/******************************************************************************************/

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
      return res.status(404).send("Randevu bulunamadı.");
    }

    res.redirect("/appointments");
  } catch (err) {
    console.error("Error deleting appointment:", err);
    res.status(500).send("Internal Server Error");
  }
};
/******************************************************************************************/