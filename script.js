// Swiper gallery functionality
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

(function () {
  emailjs.init("_3jkFqETDzCUuDT9I");
})();

// Site fade in and default RSVP form values set on page load
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
  document.getElementById("yes").checked = false;
  document.getElementById("no").checked = false;
  document.getElementById("plusone-yes").checked = false;
  document.getElementById("plusone-no").checked = false;
  document.getElementById("plusone-form").style.display = "none";
  document.getElementById("plusonename-form").style.display = "none";
  document.getElementById("plusone-name").value = "";
  document.getElementById("dietary-label").style.display = "none";
  document.getElementById("dietary").style.display = "none";
  document.getElementById("dietary").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("dietary").value = "";
});

// Sets all nav links up for dynamic scroll that accounts for the header height
const links = document.querySelectorAll(".scroll-link");
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    const headerHeight = document.querySelector("#nav-area").offsetHeight;
    const targetPos =
      target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({
      top: targetPos,
      behavior: "smooth",
    });
  });
});

// For toggling between attending yes/no
function togglePlusOne(value) {
  var dietaryLabel = document.getElementById("dietary-label");
  var dietaryForm = document.getElementById("dietary");
  var plusOneForm = document.getElementById("plusone-form");
  var plusOneNameFormDiv = document.getElementById("plusonename-form");
  var plusOneNameForm = document.getElementById("plusone-name");
  var yesRadio = document.getElementById("yes");
  var noRadio = document.getElementById("no");
  var yesPlusOneRadio = document.getElementById("plusone-yes");
  var noPlusOneRadio = document.getElementById("plusone-no");

  if (value === "yes") {
    plusOneForm.style.display = "block";
    dietaryLabel.style.display = "block";
    dietaryForm.style.display = "block";
    yesRadio.checked = true;
    noRadio.checked = false;
    scrollToRSVP();
  } else {
    plusOneForm.style.display = "none";
    plusOneNameFormDiv.style.display = "none";
    plusOneNameForm.value = "";
    dietaryLabel.style.display = "none";
    dietaryForm.style.display = "none";
    dietaryForm.value = "";
    yesRadio.checked = false;
    noRadio.checked = true;
    yesPlusOneRadio.checked = false;
    noPlusOneRadio.checked = false;
  }
}

// For toggling between plus one yes/no
function togglePlusOneName(value) {
  var plusOneNameFormDiv = document.getElementById("plusonename-form");
  var plusOneNameForm = document.getElementById("plusone-name");
  var yesRadio = document.getElementById("plusone-yes");
  var noRadio = document.getElementById("plusone-no");

  if (value === "yes") {
    plusOneNameFormDiv.style.display = "block";
    yesRadio.checked = true;
    noRadio.checked = false;
    document.getElementById("dietary-requirements-label").textContent =
      "Do either of you have any special dietary requirements?";
    scrollToRSVP();
  } else {
    plusOneNameFormDiv.style.display = "none";
    plusOneNameForm.value = "";
    yesRadio.checked = false;
    noRadio.checked = true;
    document.getElementById("dietary-requirements-label").textContent =
      "Do you have any special dietary requirements?";
  }
}

// RSVP submission functionality
window.onload = function () {
  document
    .getElementById("rsvp-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const fadeElements = document.querySelectorAll(".fade-on-submit");
      fadeElements.forEach((element) => {
        element.classList.add("faded");
      });
      document.getElementById("rsvp-loader").style.opacity = "1";
      emailjs.sendForm("service_i4w2zdg", "contact_form", this).then(
        function () {
          console.log("SUCCESS!");
          setTimeout(submitRSVP, 1000);
        },
        function (error) {
          console.log("FAILED...", error);
          setTimeout(submitError, 3000);
          window.location.href = "#rsvp-section";
        }
      );
    });
};

// Behavior when email is successful
function submitRSVP() {
  disableForm();
  const rsvpDesc = document.getElementById("rsvp-desc");
  rsvpDesc.classList.add("inactive");
  setTimeout(function () {
    rsvpDesc.textContent = "Thank you for your response!";
    rsvpDesc.classList.remove("inactive");
  }, 1000);
  scrollToRSVP();
}

// Behavior when email fails
function submitError() {
  disableForm();
  const rsvpDesc = document.getElementById("rsvp-desc");
  rsvpDesc.classList.add("inactive");
  setTimeout(function () {
    rsvpDesc.textContent =
      "Error submitting form. Please contact Jordan by emailing mail@jdsherrington.com to confirm your RSVP, or reload the page to try again.";
    rsvpDesc.style.color = "rgba(200, 0, 0, 1)";
    rsvpDesc.classList.remove("inactive");
  }, 1000);
  scrollToRSVP();
}

// Disables RSVP form when submitted
function disableForm() {
  document.getElementById("rsvp-form").classList.add("inactive");
  const fadeElements = document.querySelectorAll(".fade-on-submit");
  fadeElements.forEach((element) => {
    element.classList.remove("faded");
  });
}

function scrollToRSVP() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
}

// Scrolls to RSVP anchor when submitted
function scrollToSection() {
  const target = document.getElementById("rsvp-section");
  const headerHeight = document.querySelector("#nav-area").offsetHeight;
  const targetPos =
    target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  window.scrollTo({
    top: targetPos,
    behavior: "smooth",
  });
}
