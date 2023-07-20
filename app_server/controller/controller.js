var path=require('path');

module.exports.home = function(req,res){
    res.render('home');
};

module.exports.login = function(req,res){
    res.render('login');
};

module.exports.appointments = function(req,res){
    res.render('appointments');
};

/****************************************************************************************/

module.exports.loginPost = function(req,res){ //e-posta ve şifre girildikten sonra appointments sayfasına atması için
    console.log(req.body);
    res.redirect('appointments');  //res.render yerine res.redirect kullanarak yönlendirdiğimiz sayfada o sayfanın url sinin yazmasını sağlıyoruz.
}