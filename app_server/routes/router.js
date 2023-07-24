const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/home', controller.home);
router.get('/login', controller.login);
//router.get('/appointments', controller.appointments);
router.get('/login-operations', controller.loginOperations);

router.post('/login', controller.loginPost);

// Randevuları listeleme route'u
router.get('/appointments', controller.listAppointments);

// Randevu silme route'u
//router.delete('/appointments/:id', controller.deleteAppointment);

module.exports = router;
