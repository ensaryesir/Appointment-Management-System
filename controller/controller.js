var path=require('path');

module.exports.index = function(req,res){
    console.log(req.deneme); //middleware ile console a yazıyı çağırdım
    res.sendFile(path.join(__dirname,'../view/index.html'));
};

module.exports.login = function(req,res){
    res.sendFile(path.join(__dirname,'../view/login.html'));
};

module.exports.AddAppointment = function(req,res){
    res.sendFile(path.join(__dirname,'../view/AddAppointment.html'));
};

module.exports.UpdateAppointment = function(req,res){
    res.sendFile(path.join(__dirname,'../view/UpdateAppointment.html'));
};

module.exports.DeleteAppointment = function(req,res){
    res.sendFile(path.join(__dirname,'../view/DeleteAppointment.html'));
};

