# Appointment Management System

A modern and user-friendly appointment management system that allows you to effectively manage, track, and organize appointments.

## 🚀 Features

- 👥 User registration and login
- 📅 Create and manage appointments
- 📊 Appointment tracking
- 📱 Responsive design
- 🔒 Secure authentication
- 📨 Notification system

## 🛠️ Technologies

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Bootstrap
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** Web-push notifications

## 📦 Dependencies

The project uses the following npm packages:

```json
{
    "body-parser": "^1.20.2",
    "cookie-parser": "^1.4.6",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-ejs-layouts": "^2.5.1",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.1",
    "method-override": "^3.0.0",
    "mongod": "^2.0.0",
    "mongodb": "^5.7.0",
    "mongoose": "^7.4.1",
    "node-notifier": "^10.0.1",
    "nodemon": "^3.0.1",
    "path": "^0.12.7",
    "web-push": "^3.6.3"
}
```

These packages will be automatically installed with the `npm install` command.

## ⚙️ Installation Steps

### 1. Prerequisites Installation

#### MongoDB Installation
1. [Download MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Complete the installation
3. Open MongoDB Compass
4. Enter the following in the Connection URL field: `mongodb://localhost:27017`
5. Click "Connect"

#### Node.js Installation
1. [Download Node.js](https://nodejs.org/en/download/current)
2. Complete the installation
3. Verify the installation by typing in terminal/cmd:
   ```bash
   node -v
   ```

### 2. Project Setup

1. Clone the project:
   ```bash
   git clone https://github.com/your-username/Appointment-Management-System.git
   cd Appointment-Management-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up database collections:
   - Create a database named "AppointmentManagementSystemDb" in MongoDB Compass
   - Create two collections:
     - `appointmentcollections`
     - `auths`
   - For each collection:
     - Use "ADD DATA" > "Import JSON" option
     - Import the corresponding JSON files from the `AppointmentManagementSystemDb` folder

4. Run the project:
   ```bash
   npm start
   ```

5. Visit in your browser:
   ```
   http://localhost:8000/home
   ```

## 📝 Usage

1. Click "Login" on the homepage
2. If you don't have an account, use "Sign Up" option
3. After logging in, you can view and manage your appointments
4. Use "Add Appointment" option to create new appointments

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📸 Screenshots

![Home Page](/public/website/home.png)
*Home Page*

![About](/public/website/about.png)
*About*

![Appointments](/public/website/appointments.png)
*Appointments*

![Create Appointment](/public/website/create-appointment.png)
*Create Appointment*