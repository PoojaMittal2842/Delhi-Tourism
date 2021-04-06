function validate() {


    var email = document.forms["form1"]["email"].value;
    if (email == "") {
        alert("Please enter the email");
        return false;
    } else {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        var x = re.test(email);
        if (x) {} else {
            alert("Email id not in correct format");
            return false;
        }
    }

    var mobile = document.forms["form1"]["mobile"].value;
    if (mobile.length != 10) {
        alert("enter 10 characters for mobile number");
        return false;
    }
    if (mobile == "") {
        alert("Please enter the mobile");
        return false;
    } else {
        if (isNaN(mobile)) {
            alert("Mobile number not valid");
            return false;
        }
    }

}

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
