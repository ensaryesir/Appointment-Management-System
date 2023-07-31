const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");
const webpush = require('web-push');
const Notification = require('node-notifier');

// Local MongoDb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/AppointmentManagementSystemDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

app.set("view engine", "ejs"); // Defining the image engine
app.set("views", path.join(__dirname, "app_server", "views")); // Specifying the folder where the images will be located
app.use(ejsLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  session({
    secret: "mysecretkey", // Set a secure key
    resave: false,
    saveUninitialized: true,
    // Other session options can be added here
  })
);

const jwtRouter = require("./app_server/routes/jwtRouter");
app.use("/", jwtRouter);

app.use("/public", express.static(path.join(__dirname, "public"))); // Accessing the Public folder (this process is called mapping)

app.use(methodOverride("_method"));

const publicVapidKey = 'BMYo01tmY4u3KYkOr_uR_NdonUF_1wafEzVc1CUBizk589YzG9K4hmeEiJG7J-zGwA4suxstRTz7rMrWCUP84AQ';
const privateVapidKey = 'EJbDcDJSTfF8jJd5dtc_ihAwYa_MqhgpBsbmctATFFw';

//setting vapid keys details
webpush.setVapidDetails('mailto:yesirensar@gmail.com', publicVapidKey,privateVapidKey);

const port = 8000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});
