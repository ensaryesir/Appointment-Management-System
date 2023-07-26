/*!
 * Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
 */
//
// Scripts
//

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
