$(document).ready(function() {
    // Parses in JSON database string values as an object
    var loggedInUser = JSON.parse(localStorage.getItem("logged-in-user"));

    $(".edit").click(function() {
        $("#leave-form :input").prop('readonly', false);
        $("#leave-form select").prop('disabled', false);
        $("#email").prop('disabled', true);
        $("#status").prop('disabled', true);
    });

    $(".delete").click(function() {
        axios.delete('http://localhost:3000/leaveRequests/' + id).then(function(resp) {
            window.location = "/home.html";
        })
    });

    // Passes in data values of logged in user
    var idSearch = new URLSearchParams(window.location.search);
    var id = idSearch.get('id');

    axios.get('http://localhost:3000/leaveRequests/' + id)
        .then(function(resp) {
            console.log(resp.data);
            console.log(loggedInUser);
            if (resp.data.email != loggedInUser.email) {
                $(".edit").hide();
                $(".delete").hide();
            }
            $("#email").val(resp.data.email);
            $("#leave-type").val(resp.data.typeOfLeave);
            $("#start-date").val(resp.data.from);
            $("#end-date").val(resp.data.to);
            $("#status").val(resp.data.status);
            $("#leave-form :input").prop('readonly', true);
            $("#leave-form select").prop('disabled', true);
        });

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