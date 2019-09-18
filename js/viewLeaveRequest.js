$(document).ready(function() {
    // Parses in JSON database string values as an object
    var loggedInUser = JSON.parse(localStorage.getItem("logged-in-user"));
    // Passes in data values of logged in user
    $("#email").val(loggedInUser.email);
    $("#leave-type").val(loggedInUser.typeOfLeave);
    $("#start-date").val(loggedInUser.from);
    $("#end-date").val(loggedInUser.to);
    // Assigns instructions to system once submit button is clicked
    $("#leave-form").submit(function(event) {
        // Delays system reload
        event.preventDefault();
        // Initializes variables for 
        var leaveValue = $("#leave-type").val();
        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();
        console.log(leaveValue);
        console.log(startDate);
        console.log(endDate);
        axios.post('http://localhost:3000/leaveRequests', {
            email: loggedInUser.email,
            id: Date.now(),
            typeOfLeave: leaveValue,
            from: startDate,
            to: endDate,
        }).then(function(resp) {
            console.log(leaveValue);
            console.log(startDate);
            console.log(endDate);
            window.location = "/home.html";
        })
    })
})