const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const controller = require("../controller/controller");
const appointmentController = require("../controller/appointmentController");
const sessionAuthController = require("../controller/sessionAuthController");

//The router.get() method defines a route that handles a GET request coming to a specific URL path.
//In other words, it allows the server to respond to a GET request made by a client, either through a web browser or an API client, to a particular URL address.
//When such a GET request is received, it triggers a specific function on the server-side, and as a result, the server can return a webpage or data to the client.

router.get("/home", controller.home);
router.get("/login-operations", controller.loginOperations);

//The router.post() method defines a route that handles a POST request coming to a specific URL path.
//In contrast to the router.get() method that handles GET requests, the router.post() method is designed to handle data submissions from clients to the server.
router.post("/login-operations", sessionAuthController.loginOrRegisterUser);

router.get(
  "/appointments",
  (req, res, next) => {
    if (req.session.user || req.session.newUser) {
      next();
    } else {
      res.status(403).json({ error: "Unauthorized access." });
    }
  },
  appointmentController.listAppointments,
  appointmentController.createAppointment,
  appointmentController.deleteAppointment
);

router.get("/logout", sessionAuthController.logoutUser);

router.post("/appointments", appointmentController.createAppointment);
router.delete("/appointments/:id", appointmentController.deleteAppointment);

module.exports = router;
