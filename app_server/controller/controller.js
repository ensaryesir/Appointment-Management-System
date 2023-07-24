const AppointmentModel = require('../models/appointmentModel');

module.exports.home = function(req,res){
    res.render('home');
};

module.exports.login = function(req,res){
    res.render('login');
};

/*module.exports.appointments = function(req,res){
    res.render('appointments');
};*/

module.exports.loginOperations = function(req,res){
    res.render('login-operations');
};
/****************************************************************************************/

module.exports.loginPost = function(req,res){ //e-posta ve şifre girildikten sonra appointments sayfasına atması için
    console.log(req.body);
    res.redirect('appointments');  //res.render yerine res.redirect kullanarak yönlendirdiğimiz sayfada o sayfanın url sinin yazmasını sağlıyoruz.
}

/******************************************************************************************/

// Randevuları listeleme
exports.listAppointments = async (req, res) => {
    try {
      const appointments = await AppointmentModel.find();
      console.log(appointments); // Verileri konsola yazdırma (isteğe bağlı)
      res.render('appointments.ejs', { appointments: appointments });
    } catch (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  