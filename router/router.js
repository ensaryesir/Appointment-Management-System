var express = require('express');
var router = express.Router();
var controller=require('../controller/controller');

router.get('/home',controller.index);
router.get('/login',controller.login);
router.get('/AddAppointment',controller.AddAppointment);
router.get('/UpdateAppointment',controller.UpdateAppointment);
router.get('/DeleteAppointment',controller.DeleteAppointment);

module.exports = router;