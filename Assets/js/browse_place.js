window.onload = () => {
    setTimeout(() => {
      document.querySelector("body").classList.add("display");
    }, 4000);
  };
  
  
  // document.querySelector(".hamburger-menu").addEventListener("click", () => {
  //   document.querySelector(".container").classList.toggle("change");
  // });
    
  
  document.querySelector(".scroll-btn").addEventListener("click", () => {
    document.querySelector("html").style.scrollBehavior = "smooth";
    setTimeout(() => {
      document.querySelector("html").style.scrollBehavior = "unset";
    }, 1000);
  });


  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

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
