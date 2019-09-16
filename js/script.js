// REQUIREMENTS (V4)

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

leaveRequests.addRequest("request1");
leaveRequests.addRequest("request2");
leaveRequests.deleteRequest(4);
leaveRequests.toggleApproval(0);

// UP NEXT:
// Approve/Disapprove leave request.
// Sign up
// Login