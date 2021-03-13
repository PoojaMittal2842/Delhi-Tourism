let button = document.querySelector(".btn-primary");
button.addEventListener('click', function(e) {
    console.log("presses")
    let textarea = document.querySelector("#textarea")
    let fname = document.querySelector("#fname");
    let lname = document.querySelector("#lname");
    let userid = document.querySelector("#userid");
    let password = document.querySelector("#password");
    fname.value="";
    userid.value="";
    lname.value="";
    password.value="";
    textarea.value="";
})