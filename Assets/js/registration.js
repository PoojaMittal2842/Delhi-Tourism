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
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
      var countryCode = resp && resp.country ? resp.country : "us";
      success(countryCode);
    });
  },
});
