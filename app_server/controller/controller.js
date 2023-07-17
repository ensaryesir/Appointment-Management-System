var path=require('path');

module.exports.home = function(req,res){
    res.render('home');
};

module.exports.login = function(req,res){
    res.render('login');
};

module.exports.addAppointment = function(req,res){
    res.render('add-appointment');
};

module.exports.updateAppointment = function(req,res){
    res.render('update-appointment');
};

module.exports.appointments = function(req,res){
    res.render('appointments');
};

/*module.exports.layout = function(req,res){
    //res.sendFile(path.join(__dirname,'../../view/DeleteAppointment.html'));
    res.render('layout');
};*/

/****************************************************************************************/

module.exports.loginPost = function(req,res){ //e-posta ve şifre girildikten sonra appointments sayfasına atması için
    console.log(req.body);
    res.render('appointments');
}