$(document).ready(function() {
    var loggedInUser = JSON.parse(localStorage.getItem("logged-in-user"));
    $("#email").val(loggedInUser.email);
    $("#leave-form").submit(function(event) {
        event.preventDefault();
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