function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  if (page === "" || page === "/") {
    return "index.html";
  }

  return page;
}

function setActiveNavLink() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.classList.remove("active");

    const anchor = link.querySelector("a");
    if (anchor) {
      const href = anchor.getAttribute("href");

      if (href === currentPage) {
        link.classList.add("active");
      }
    }
  });
}

function showError(inputId, errorId, msg) {
  var input = document.getElementById(inputId);
  var error = document.getElementById(errorId);
  error.textContent = msg;
  if (msg) {
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
  }
}

function validateName() {
  var name = document.getElementById("name").value.trim();
  if (name === "") {
    showError("name", "name-error", "Name is required.");
    return false;
  }
  if (name.length < 2) {
    showError("name", "name-error", "Name must be at least 2 characters.");
    return false;
  }
  showError("name", "name-error", "");
  return true;
}

function validateEmail() {
  var email = document.getElementById("email").value.trim();
  if (email === "") {
    showError("email", "email-error", "Email is required.");
    return false;
  }
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    showError("email", "email-error", "Please enter a valid email.");
    return false;
  }
  showError("email", "email-error", "");
  return true;
}

function validateMessage() {
  var message = document.getElementById("message").value.trim();
  if (message === "") {
    showError("message", "message-error", "Message is required.");
    return false;
  }
  if (message.length < 10) {
    showError(
      "message",
      "message-error",
      "Message must be at least 10 characters.",
    );
    return false;
  }
  showError("message", "message-error", "");
  return true;
}

function setupContactForm() {
  var form = document.querySelector(".contact-form");
  if (!form) return;

  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var messageInput = document.getElementById("message");
  var statusEl = document.getElementById("form-status");

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var okName = validateName();
    var okEmail = validateEmail();
    var okMessage = validateMessage();

    if (!okName || !okEmail || !okMessage) {
      statusEl.textContent = "Please fix the errors above.";
      statusEl.className = "form-status error";
      return;
    }

    statusEl.textContent = "Sending...";
    statusEl.className = "form-status";

    var submitBtn = form.querySelector(".btn-submit");
    submitBtn.disabled = true;

    var formData = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          statusEl.textContent = "Message sent successfully!";
          statusEl.className = "form-status success";
          form.reset();
        } else {
          statusEl.textContent = "Error sending message. Please try again.";
          statusEl.className = "form-status error";
        }
        submitBtn.disabled = false;
      })
      .catch(function () {
        statusEl.textContent = "Error sending message. Please try again.";
        statusEl.className = "form-status error";
        submitBtn.disabled = false;
      });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  setActiveNavLink();
  setupContactForm();
});
