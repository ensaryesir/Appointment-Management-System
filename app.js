const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const methodOverride = require('method-override');

mongoose.connect('mongodb://127.0.0.1:27017/AppointmentManagementSystemDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

app.set('view engine', 'ejs'); // Görüntü motorunu tanımlama
app.set('views', path.join(__dirname, 'app_server', 'views')); // Görüntülerin bulunacağı klasörü belirttim
app.use(ejsLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = require('./app_server/routes/router');
app.use('/', router);

app.use('/public', express.static(path.join(__dirname, 'public'))); // Public klasörünü erişime açtık (bu işleme haritalama deniyor)


const port = 8000;
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor.`);
});