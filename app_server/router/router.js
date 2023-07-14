var express = require('express');
var router = express.Router();
var controller=require('../controller/controller');

router.use(function(req, res, next){
    req.deneme = 'middleware deneme';
    next(); //middleware oluşturursak bir sonrakine geçiş için next kullanmamız lazım
});

router.get('/index',controller.index);
router.get('/login',controller.login);
router.get('/AddAppointment',controller.AddAppointment);
router.get('/UpdateAppointment',controller.UpdateAppointment);
router.get('/DeleteAppointment',controller.DeleteAppointment);

router.get('/layout',controller.layout)

module.exports = router;