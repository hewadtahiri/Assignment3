window.addEventListener("DOMContentLoaded", event => {
  // Activates Bootstrap scrollspy on the main nav element.
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapses responsive navbar when toggler is visible.
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

// Sets the minimum date for due_date input to today’s date.
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("due_date");
  if (input) {
    const today = new Date().toISOString().split("T")[0];
    input.setAttribute("min", today);
  }
});

// Displays the edit tasks section and applies date restriction
function show(id, title, description, due_date) {
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("due_date").value = due_date ? due_date.split("T")[0] : "";
  document.getElementById("form").action = `/tasks/edit/${id}`;
  document.getElementById("edit").style.display = "block";
}

// Hides the edit tasks section.
function hide() {
  document.getElementById("edit").style.display = "none";
}