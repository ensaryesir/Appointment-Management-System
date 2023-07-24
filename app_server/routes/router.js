var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');

router.get('/home',controller.home);
router.get('/login',controller.login);
router.get('/appointments',controller.appointments);
router.get('/login-operations',controller.loginOperations);

router.post('/login',controller.loginPost); //home sayfasındaki post işlemi

module.exports = router;