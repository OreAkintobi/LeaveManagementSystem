$(document).ready(function() {
    $("#leaveRequestData").on('click', '.reject', function(event) {
        updateStatus($(event.target).data("id"), 'Rejected');
    });
    $("#leaveRequestData").on('click', '.approve', function(event) {
        updateStatus($(event.target).data("id"), 'Approved');
    });
    // Initializes GET request on active database
    axios.get('http://localhost:3000/leaveRequests').then(function(resp) {
        var data = resp.data;
        window.leaveRequests = resp.data;
        var userCheck = JSON.parse(window.localStorage["logged-in-user"]);

        var rows = "";
        // Dynamic addition of user Leave Requests from active database and adds buttons
        for (let i = 0; i < data.length; i++) {
            // If user logged in is Admin,
            if (userCheck.isAdmin === true) {
                // Display all leave requests and buttons
                rows += `<tr><td></td><td>${data[i].email}</td><td>${data[i].typeOfLeave}</td><td>${data[i].from}</td><td>${data[i].to}</td><td>${data[i].status}</td><td><button type='button' class='btn btn-success approve' data-id='${data[i].id}'>Approve</button><button type='button' class='btn btn-danger reject' data-id='${data[i].id}'>Reject</button><a class='btn btn-primary edit-button' href='/viewLeaveRequest.html?id=${data[i].id}' role='button'>View</a></td></tr>`;
            } else if (userCheck.email === data[i].email) {
                // Otherwise, display user's leave request and View button only
                rows = `<tr><td></td><td>${data[i].email}</td><td>${data[i].typeOfLeave}</td><td>${data[i].from}</td><td>${data[i].to}</td><td>${data[i].status}</td><td><a class='btn btn-primary edit-button' href='/viewLeaveRequest.html?id=${data[i].id}' role='button'>View</a></td></tr>`;
            }
        }
        $("#leaveRequestData").html(rows);
        // Delays automatic refresh 
        event.preventDefault();
    });
});

function updateStatus(id, status) {
    var newLeaveRequest;
    for (let i = 0; i < window.leaveRequests.length; i++) {
        if (window.leaveRequests[i].id === id) {
            newLeaveRequest = window.leaveRequests[i];
        }
    }
    newLeaveRequest.status = status;
    axios.put("http://localhost:3000/leaveRequests/" + id, newLeaveRequest)
        .then(function(resp) {
            alert("Leave Request Updated!");
            location.reload(true);
        }).catch(function(error) {
            console.log(error);
        })
}