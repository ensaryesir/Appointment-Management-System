var http = require('http'); //http modülünü yükleme
var fs = require('fs'); //fs modülü dosya işlemlerinde kullanılır

var express = require('express');
var path=require('path');
var app = express();
app.use('/public',express.static(path.join(__dirname,'public'))); //public klasörünü erişime açtık
                                                                 //bu işleme haritalama deniyor
app.get('/',function(req,res){
    fs.readFile('index.html',function(err,data){

        res.write(data); //fonk data parametresini kullanıcıya geri yolladım
        res.end('mesaj bitti');
        console.log('homeController');
    });
});

app.get('/login',function(req,res){
    fs.readFile('login.html',function(err,data){

        res.write(data); //fonk data parametresini kullanıcıya geri yolladım
        //res.end('mesaj bitti');
        console.log('loginController');
    });
});

//var yonlendirici = Object();

/*var homeController = function(req,res){
    fs.readFile('index.html',function(err,data){

        res.write(data); //fonk data parametresini kullanıcıya geri yolladım
        res.end('mesaj bitti');
        console.log('homeController');
    });
}*/

/*var loginController = function(req,res){
    fs.readFile('login.html',function(err,data){

        res.write(data); //fonk data parametresini kullanıcıya geri yolladım

        res.write('deneme');
        res.end('mesaj bitti');
        console.log('loginController');
    });
}*/

//express kullandığım için yonlendirici ve oluşturduğum controllerlara gerek yok
//yonlendirici['/']=homeController;
//yonlendirici['/login']=loginController;

/*var server = http.createServer(function(req,res){ 
//server oluştururken kullanıcının isteğine cevap verecek bir fonk belirlememiz gerekiyor
//bu fonk parametre veriyoruz. parametrenin ilki yapılan istek, ikincisi ise kullanıcıya verilen cevap

if (req.url in yonlendirici)
    yonlendirici[req.url](req,res);

/* //yonlendirici kullandığım için bunlara ihtiyacım kalmadı
    if(req.url=='/' || 'index'){ 
        homeController(req,res);
    }

    if(req.url=='/login'){ //kullanıcının isteği (/login) ise login safyasına git
        loginController(req,res);
    }
*/
//});

app.listen(8000); //8k portunda çalışır