// For country picker (Ref-https://www.jqueryscript.net/form/country-picker-flags.html)
// $("#country_selector").countrySelect({
//   defaultCountry: "in",
//   responsiveDropdown: true,
// });

// For country tel code picker (Ref-https://github.com/jackocnr/intl-tel-input)
// const phoneInputField = document.querySelector("#phone");
// const phoneInput = window.intlTelInput(phoneInputField, {
//   utilsScript:
//     "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
//   initialCountry: "auto",
//   geoIpLookup: function (success, failure) {
//     $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
//       var countryCode = resp && resp.country ? resp.country : "us";
//       success(countryCode);
//     });
//   },
// });

const toggleSwitch=document.querySelector('.togglebtn');
        const text=$('#light-dark-text');
        const icon=$('#light-dark-icon');
        function darkMode(){
            text.text("Dark");
            icon.attr('class','fa fa-moon-o');
        }
        function lightMode() {
            text.text("Light");
            icon.attr('class','fa fa-sun-o');
        }
        function switchTheme(event) {
        if (event.target.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            darkMode();
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            lightMode();
        }
        }
        toggleSwitch.addEventListener("change", switchTheme);
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);

        if (currentTheme === "dark") {
            toggleSwitch.checked = true;
            darkMode();
        }
        }

