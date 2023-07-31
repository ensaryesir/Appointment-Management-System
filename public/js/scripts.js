window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// delete appointment script
function deleteAppointment(appointmentId) {
  // Confirm ile kullanıcıya silme işlemini onaylama şansı verilebilir
  if (confirm("Bu randevuyu silmek istediğinizden emin misiniz?")) {
    // Fetch veya AJAX ile DELETE isteği gönderin
    fetch("/appointments/" + appointmentId, {
      method: "DELETE",
    });
    window.location.reload();
  }
}

//logout script
function logoutUser() {
  // When the "Logout" link is clicked, do not send a request to the backend
  fetch("/logout", {
    method: "GET",
    credentials: "same-origin", // To send it together with cookies
  })
    .then((response) => {
      if (response.redirected) {
        // If the backend redirects us to the "/home" page, redirect the page to that URL
        window.location.href = "/home";
      }
    })
    .catch((error) => {
      console.error("Logout işlemi başarısız oldu:", error);
      // If the logout process fails, you can display an error message
    });
}

function redirectToLogin() {
  const currentURL = window.location.href;
  const loginURL = "/login-operations";
  window.location.href = loginURL;
}

//*****************************************************************************************************************************/

// The necessary function to check whether the user supports notifications in the browser
function checkNotificationSupport() {
  if (!("Notification" in window)) {
    // If browser does not support notifications, show an alert
    alert("Notifications are not supported in your browser.");
    return false;
  }
  return true;
}

// The function required to request notification permission
async function askNotificationPermission() {
  if (!checkNotificationSupport()) {
    return;
  }

  // Request permission to show notifications
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    // If permission is granted, send notifications for upcoming appointments
    sendNotificationsForUpcomingAppointments();
  } else {
    // If permission is denied, show an alert
    alert("Notification permission denied.");
  }
}

// Function to calculate date difference in days
function dateDifferenceInDays(date1, date2) {
  const diffInMilliseconds = Math.abs(date1 - date2);
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return diffInDays;
}

// Function to send notifications for upcoming appointments
async function sendNotificationsForUpcomingAppointments() {
  // Get all appointments from the table
  const appointments = document.querySelectorAll("#appointments tbody tr");
  const currentDate = new Date(); // Current date

  for (const appointment of appointments) {
    const dateCell = appointment.querySelector("td:first-child");
    const date = new Date(dateCell.textContent); // Appointment date

    // Calculate the difference in days between the appointment date and the current date
    const diffInDays = dateDifferenceInDays(date, currentDate);

    // If the appointment is one day away, send a notification
    if (diffInDays === 1) {
      const timeCell = appointment.querySelector("td:nth-child(2)");
      const subjectCell = appointment.querySelector("td:nth-child(3)");
      const participantsCell = appointment.querySelector("td:nth-child(4)");

      const title = `You have an appointment "${subjectCell.textContent}" tomorrow at ${timeCell.textContent}.`;
      const message = `Participants: ${participantsCell.textContent}`;
      sendNotification(title, message);
    }
  }
}

// Function to send a notification
function sendNotification(title, message) {
  if (!checkNotificationSupport()) {
    return;
  }

  // Create a web notification
  const notification = new Notification(title, {
    body: message,
    icon: "icon.png", // Provide the path of an icon you want to use
  });

  // Action to be performed when the notification is clicked (optional)
  notification.onclick = function () {
    // You can specify an action to be taken when the notification is clicked
    // For example, you can redirect the user to a specific page.
    window.open("http://localhost:8000/appointments");
  };
}

// Add a listener to trigger the notification request on a suitable event (e.g., button click)
const notificationBtn = document.getElementById("webNotificationBtn");
notificationBtn.addEventListener("click", askNotificationPermission);
