var path=require('path');

module.exports.index = function(req,res){
    //res.sendFile(path.join(__dirname,'../../view/index.html'));
    res.render('index');
};

module.exports.login = function(req,res){
    //res.sendFile(path.join(__dirname,'../../view/login.html'));
    res.render('login');
};

module.exports.AddAppointment = function(req,res){
    //res.sendFile(path.join(__dirname,'../../view/AddAppointment.html'));
    res.render('AddAppointment');
};

module.exports.UpdateAppointment = function(req,res){
    //res.sendFile(path.join(__dirname,'../../view/UpdateAppointment.html'));
    res.render('UpdateAppointment');
};

module.exports.DeleteAppointment = function(req,res){
    //res.sendFile(path.join(__dirname,'../../view/DeleteAppointment.html'));
    res.render('DeleteAppointment');
};

module.exports.layout = function(req,res){
    res.render('layout');
}