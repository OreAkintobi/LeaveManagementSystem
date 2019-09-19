$(document).ready(function() {
    // Parses in JSON database string values as an object
    var loggedInUser = JSON.parse(localStorage.getItem("logged-in-user"));
    // Passes in data values of logged in user
    $("#email").val(loggedInUser.email);
    // Assigns instructions to system once submit button is clicked
    $("#leave-form").submit(function(event) {
        // Delays system reload
        event.preventDefault();
        // Initializes variables for values being entered into form
        var leaveValue = $("#leave-type").val();
        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();
        console.log(leaveValue);
        console.log(startDate);
        console.log(endDate);
        // Initializes POST request on active database
        axios.post('http://localhost:3000/leaveRequests', {
            // Grabs the values entered below and posts them onto server
            email: loggedInUser.email,
            id: Date.now(),
            typeOfLeave: leaveValue,
            from: startDate,
            to: endDate,
            status: "Pending",
        }).then(function(resp) {
            console.log(leaveValue);
            console.log(startDate);
            console.log(endDate);
            // Redirects user to Homepage
            window.location = "/home.html";
        })
    })
})