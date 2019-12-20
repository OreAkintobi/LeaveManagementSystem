// Closes system when no one is logged in
$(document).ready(function() {
    var loggedInUser = JSON.parse(localStorage.getItem("logged-in-user"))
        // System checks if any user data is located on local storage
    if (loggedInUser === null) {
        // then takes the unlogged user to the login page to log in
        window.location = "/login.html";
    }
})