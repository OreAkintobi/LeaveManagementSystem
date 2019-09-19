$(document).ready(function() {
    var loggedInUser = JSON.parse(localStorage.getItem("logged-in-user"))
    if (loggedInUser === null) {
        window.location = "/login.html";
    }
})