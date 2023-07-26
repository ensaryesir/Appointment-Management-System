const AppointmentModel = require("../models/appointmentModel");
const AuthModel = require("../models/AuthModel");
const jwt = require("jsonwebtoken");

function generateJWT(user) {
  const secretKey = "secretKey"; // Set a secure key
  const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" }); // we are creating a valid token for 1 hour
  return token;
}

function verifyJWT(token) {
  const secretKey = "secretKey"; // We verify the token using the same secret key
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken.user;
  } catch (err) {
    return null; // If the token cannot be verified, we will return null
  }
}

exports.loginOrRegisterUser = async (req, res) => {
  try {
    const { email, password, action } = req.body;

    // If action is "login", process user login
    if (action === "login") {
      const user = await AuthModel.findOne({ email });

      // If user not found, return an error
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Verify the password
      if (user.password === password) {
        const token = generateJWT(user);
        res.cookie("token", token, { httpOnly: true }); // We send the token as an HTTP only cookie

        // If login is successful, redirect to the /appointments page
        res.redirect("/appointments");
      } else {
        // If the password is incorrect, return an error
        res.status(401).json({ error: "Invalid password." });
      }
    }
    // If action is "register", save the new user in the database
    else if (action === "register") {
      const existingUser = await AuthModel.findOne({ email });
      if (existingUser) {
        // If you already have a user by email, return the error
        return res.status(409).json({ error: "E-mail is already registered." });
      }
      const { name } = req.body;
      const newUser = new AuthModel({ email, name, password });
      await newUser.save();

      const token = generateJWT(newUser);
      res.cookie("token", token, { httpOnly: true }); // We send the token as an HTTP only cookie

      // After successful registration, redirect to the /appointments page
      res.redirect("/appointments");
    } else {
      // If the action is invalid, return an error
      res.status(400).json({ error: "Invalid action." });
    }
  } catch (err) {
    console.error("Error during user login/registration:", err);
    res.status(500).json({ error: "An error occurred during the process." });
  }
};

exports.logoutUser = (req, res) => {
  // If the user has the token, perform the logout process by invalidating the token
  if (req.cookies.token) {
    // Invalidate the token
    res.clearCookie("token");
    // When the logout process is successful, redirect to the home page
    res.redirect("/home");
  } else {
    res.status(401).json({ error: "Unauthorized access." });
  }
};
