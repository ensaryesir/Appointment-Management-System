const express = require('express');
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/AppointmentManagementSystemDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Database schema
const AppointmentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  date: Date
});

// Appointment model
const Appointment = mongoose.model('Appointment', AppointmentSchema);

// Express application
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET request for appointment form
app.get('/appointment', (req, res) => {
  res.sendFile(__dirname + '/appointment.html');
});

// POST request for appointment form
app.post('/appointment', (req, res) => {
  const { firstName, lastName, date } = req.body;

  const appointment = new Appointment({
    firstName,
    lastName,
    date
  });

  appointment.save()
    .then(() => {
      res.send('Appointment successfully saved');
    })
    .catch(err => {
      res.status(400).send('Unable to save appointment');
    });
});

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
