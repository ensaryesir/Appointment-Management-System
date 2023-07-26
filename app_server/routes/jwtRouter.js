const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const controller = require("../controller/controller");
const appointmentController = require("../controller/appointmentController");
const jwtAuthController = require("../controller/jwtAuthController");

//The router.get() method defines a route that handles a GET request coming to a specific URL path.
//In other words, it allows the server to respond to a GET request made by a client, either through a web browser or an API client, to a particular URL address.
//When such a GET request is received, it triggers a specific function on the server-side, and as a result, the server can return a webpage or data to the client.

router.get("/home", controller.home);
router.get("/login-operations", controller.loginOperations);

//The router.post() method defines a route that handles a POST request coming to a specific URL path.
//In contrast to the router.get() method that handles GET requests, the router.post() method is designed to handle data submissions from clients to the server.
router.post("/login-operations", jwtAuthController.loginOrRegisterUser);

function authenticateToken(req, res, next) {
  const token = req.cookies.token; // We receive the token from the cookie

  if (!token) {
    return res.status(401).json({ error: "Unauthorized access." });
  }

  jwt.verify(token, "secretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.user = user; // If the token is verified, we add the user information to the request object
    next();
  });
}

router.get(
  "/appointments",
  authenticateToken,
  appointmentController.listAppointments,
  appointmentController.createAppointment,
  appointmentController.deleteAppointment
);

router.get("/logout", jwtAuthController.logoutUser);

router.post("/appointments", appointmentController.createAppointment);
router.delete("/appointments/:id", appointmentController.deleteAppointment);

module.exports = router;
