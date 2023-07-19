var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');

router.use(function(req, res, next){
    req.deneme = 'middleware deneme';
    next(); //middleware oluşturursak bir sonrakine geçiş için next kullanmamız lazım
});

router.get('/home',controller.home);
router.get('/login',controller.login);
router.get('/appointments',controller.appointments);

//router.get('/layout',controller.layout);
/***************************************************************************************/

router.post('/login',controller.loginPost); //home sayfasındaki post işlemi

module.exports = router;