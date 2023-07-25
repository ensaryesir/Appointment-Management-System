const AppointmentModel = require("../models/appointmentModel");
const AuthModel = require("../models/AuthModel");

module.exports.home = function (req, res) {
  res.render("home");
};

module.exports.login = function (req, res) {
  res.render("login");
};

module.exports.loginOperations = function (req, res) {
  res.render("login-operations");
};

/****************************************************************************************/

/*module.exports.loginPost = function (req, res) {
  // after entering the email and password, go to the appointments page
  console.log(req.body);
  res.redirect("appointments"); // using res.redirect instead of res.render, we ensure that the url of that page is written on the page we redirect to.
};*/

exports.loginOrRegisterUser = async (req, res) => {
  try {
    const { email, password, action } = req.body;

    // Eğer action "login" ise kullanıcı girişini işle
    if (action === "login") {
      const user = await AuthModel.findOne({ email });

      // Kullanıcıyı bulamazsa hata döndürün
      if (!user) {
        return res.status(404).json({ error: "Kullanıcı bulunamadı." });
      }

      // Parolayı doğrulayın
      if (user.password === password) {
        // Başarılı giriş durumunda /appointments sayfasına yönlendirin
        res.redirect("/appointments");
      } else {
        res.status(401).json({ error: "Geçersiz parola." });
      }
    }
    // Eğer action "register" ise yeni kullanıcıyı kaydet
    else if (action === "register") {
      const { name } = req.body;
      const newUser = new AuthModel({ email, name, password });
      await newUser.save();

      res.redirect("/appointments");
    } else {
      res.status(400).json({ error: "Geçersiz işlem." });
    }
  } catch (err) {
    console.error("Kullanıcı girişi/kaydı hatası:", err);
    res.status(500).json({ error: "İşlem sırasında bir hata oluştu." });
  }
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
