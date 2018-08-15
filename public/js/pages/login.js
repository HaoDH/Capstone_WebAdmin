var db = firebase.firestore();

var email = document.getElementById("email");
var password = document.getElementById("password");

console.log("logged");
$("#submit").click(function () {
    console.log("Begin the login process");
});

function submit(){
    console.log(email + " : " +password);
}

