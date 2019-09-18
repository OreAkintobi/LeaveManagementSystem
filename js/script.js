// REQUIREMENTS (V4)
$(document).ready(function() {
    axios.get('http://localhost:3000/leaveRequests').then(function(resp) {
        var data = resp.data;
        for (let i = 0; i < data.length; i++) {
            $("#leaveRequestData").html("<tr>" + "<td>" + "</td>" +
                "<td>" + data[i].email + "</td>" + "<td>" + data[i].typeOfLeave + "</td>" + "<td>" + data[i].from + "</td>" + "<td>" + data[i].to + "</td>" + "<td>" + "</td>" + "</tr>");
        }
        event.preventDefault();
    });
});


// leaveRequests.addRequest should add objects
var leaveRequests = {
    requests: [],
    displayRequests: function() {
        console.log("Current Leave Requests:", this.requests);
    },
    addRequest: function(request) {
        this.requests.push({
            request: request,
            approved: false
        });
        this.displayRequests();
    },
    // leaveRequests.changeRequest should change the request property
    changeRequest: function(position, request) {
        this.requests[position].request = request;
        this.displayRequests();
    },
    deleteRequest: function(position) {
        this.requests.splice(position, 1);
        this.displayRequests();
    },
    // leaveRequests.toggleApproval should change the approved property
    toggleApproval: function(position) {
        var request = this.requests[position];
        request.approved = !request.approved;
        this.displayRequests();
    }
}