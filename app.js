var http = require('http'); //http modülünü yükleme
var fs = require('fs'); //fs modülü dosya işlemlerinde kullanılır
var express = require('express'); //express modülünü yükleme
var path = require('path');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser'); 


app.set('view engine', 'ejs') //görüntü motorunu tanımlama
app.set('views', path.join(__dirname,'./app_server/views')); //görüntülerin bulunacağı klasörü belirttim
app.use(ejsLayouts);


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


var route = require('./app_server/router/router');
app.use('/',route);


app.use('/public',express.static(path.join(__dirname,'public'))); //public klasörünü erişime açtık (bu işleme haritalama deniyor )


app.listen(8000); //8000 portunda çalışır