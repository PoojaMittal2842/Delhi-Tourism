// For country picker (Ref-https://www.jqueryscript.net/form/country-picker-flags.html)
$("#country_selector").countrySelect({
  defaultCountry: "in",
  responsiveDropdown: true,
});

// For country tel code picker (Ref-https://github.com/jackocnr/intl-tel-input)
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  initialCountry: "in",
});

// For changing themes
const toggleSwitch = document.querySelector(".togglebtn");

function switchTheme(event) {
  document.querySelector(".tumbler").classList.toggle("tumbler--night-mode");
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    document.querySelector(".tumbler").classList.add("tumbler--night-mode");
    toggleSwitch.checked = true;
  } else {
    document.querySelector(".tumbler").classList.remove("tumbler--night-mode");
  }
}
