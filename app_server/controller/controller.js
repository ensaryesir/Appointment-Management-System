const AppointmentModel = require('../models/appointmentModel');

module.exports.home = function(req,res){
    res.render('home');
};

module.exports.login = function(req,res){
    res.render('login');
};

module.exports.loginOperations = function(req,res){
    res.render('login-operations');
};
/****************************************************************************************/

module.exports.loginPost = function(req,res){ // after entering the email and password, go to the appointments page
    console.log(req.body);
    res.redirect('appointments');   // using res.redirect instead of res.render, we ensure that the url of that page is written on the page we redirect to.  
}

/******************************************************************************************/

// listing appointments
exports.listAppointments = async (req, res) => {
    try 
    {
      const appointments = await AppointmentModel.find();
      //console.log(appointments); // showing data in the console (depending in the request)
      res.render('appointments.ejs', { appointments: appointments });
    } 
    catch (err) 
    {
      console.error('Error fetching appointments:', err);
      res.status(500).send('Internal Server Error');
    }
};

// create appointment
exports.createAppointment = async (req, res) => {
    try 
    {
      const { date, time, subject, participants } = req.body;
  
      const newAppointment = new AppointmentModel({
        date,
        time,
        subject,
        participants: participants.split(',').map(participant => participant.trim()),
      });
      await newAppointment.save();

      // After adding a new appointment, redirect to the appointments page
        res.redirect('/appointments');
    } 
    catch (err) 
    {
        console.error('Error adding appointment:', err);
        res.status(500).send('Internal Server Error');
    }
};