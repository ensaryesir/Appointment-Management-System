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
    alert("Tarayıcınızda bildirimler desteklenmiyor.");
    return false;
  }
  return true;
}

// The function required to request notification permission
async function askNotificationPermission() {
  if (!checkNotificationSupport()) {
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    sendNotificationsForUpcomingAppointments();
  } else {
    alert("Bildirim izni reddedildi.");
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
  const appointments = document.querySelectorAll("#appointments tbody tr");
  const currentDate = new Date();

  for (const appointment of appointments) {
    const dateCell = appointment.querySelector("td:first-child");
    const date = new Date(dateCell.textContent);
    const diffInDays = dateDifferenceInDays(date, currentDate);

    if (diffInDays === 1) {
      const timeCell = appointment.querySelector("td:nth-child(2)");
      const subjectCell = appointment.querySelector("td:nth-child(3)");
      const participantsCell = appointment.querySelector("td:nth-child(4)");

      const title = `Yarın ${timeCell.textContent} saatinde "${subjectCell.textContent}" randevunuz var.`;
      const message = `Katılımcılar: ${participantsCell.textContent}`;
      sendNotification(title, message);
    }
  }
}

// Bildirimi göndermek için gerekli işlev
function sendNotification(title, message) {
  if (!checkNotificationSupport()) {
    return;
  }

  // Web bildirimi oluşturuluyor
  const notification = new Notification(title, {
    body: message,
    icon: "icon.png", // İstediğiniz bir ikonun yolunu verin
  });

  // Bildirime tıklandığında yapılacak işlem (isteğe bağlı)
  notification.onclick = function () {
    // Bildirime tıklandığında bir şey yapmak istiyorsanız burada belirtebilirsiniz
    // Örneğin, kullanıcıyı belirli bir sayfaya yönlendirebilirsiniz.
    window.open("http://localhost:8000/appointments");
  };
}

// Bildirim isteğini tetiklemek için uygun bir olaya (örn. düğme tıklaması) dinleyici ekleyin
const notificationBtn = document.getElementById("webNotificationBtn");
notificationBtn.addEventListener("click", askNotificationPermission);
