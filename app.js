const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

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

// use the express-session middleware
app.use(
  session({
    secret: "mysecretkey", // Set a secure key
    resave: false,
    saveUninitialized: true,
    // Other session options can be added here
  })
);

const router = require("./app_server/routes/router");
app.use("/", router);

app.use("/public", express.static(path.join(__dirname, "public"))); // Accessing the Public folder (this process is called mapping)

app.use(methodOverride("_method"));

const port = 8000;
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor.`);
});
