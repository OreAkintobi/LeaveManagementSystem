$(document).ready(function() {
  // Parses in JSON database string values as an object
  var loggedInUser = JSON.parse(localStorage.getItem("logged-in-user"));

  // When edit button is clicked, user can edit values that are not greyed out
  $(".edit").click(function() {
    $("#leave-form :input").prop("readonly", false);
    $("#leave-form select").prop("disabled", false);
    $("#email").prop("disabled", true);
    $("#status").prop("disabled", true);
    $(".save").show();
    $(".edit").hide();
  });

  // Initializes save button click behaviour
  $(".save").click(function() {
    window.leaveRequest.typeOfLeave = $("#leave-type").val();
    window.leaveRequest.from = $("#start-date").val();
    window.leaveRequest.to = $("#end-date").val();
    // PUT request replaces previously entered data with newly entered data
    axios
      .put("http://localhost:3000/leaveRequests/" + id, window.leaveRequest)
      // then it changes the leave request form to its normal form and redirects user to home page
      .then(function(resp) {
        $(".edit").show();
        $(".save").hide();
        window.location = "/index.html";
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  // Initializes delete button click behaviour
  $(".delete").click(function() {
    // DELETE request grabs data and removes it from JSON database
    axios
      .delete("http://localhost:3000/leaveRequests/" + id)
      .then(function(resp) {
        // then redirects user to home page
        window.location = "/index.html";
      });
  });

  // Passes in data values of logged in user
  var idSearch = new URLSearchParams(window.location.search);
  var id = idSearch.get("id");

  // Initializes View Leave Request Page behaviour
  axios.get("http://localhost:3000/leaveRequests/" + id).then(function(resp) {
    window.leaveRequest = resp.data;
    // Checks if the email of the logged in user is NOT the same as the email in the leave request being viewed
    if (resp.data.email != loggedInUser.email) {
      // and ensures that user cannot delete or edit the request
      $(".edit").hide();
      $(".delete").hide();
    }
    // Shows user-specific leave request data
    $("#email").val(resp.data.email);
    $("#leave-type").val(resp.data.typeOfLeave);
    $("#start-date").val(resp.data.from);
    $("#end-date").val(resp.data.to);
    $("#status").val(resp.data.status);
    $("#leave-form :input").prop("readonly", true);
    $("#leave-form select").prop("disabled", true);
    $(".save").hide();
  });

  // Assigns instructions to system once submit button is clicked
  $("#leave-form").submit(function(event) {
    // Delays system reload
    event.preventDefault();
    var leaveValue = $("#leave-type").val();
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    // Initializes POST request on JSON server
    axios
      .post("http://localhost:3000/leaveRequests", {
        // then posts user-provided data to server
        email: loggedInUser.email,
        id: Date.now(),
        typeOfLeave: leaveValue,
        from: startDate,
        to: endDate
        // after which, the user is directed to the home page to view leave requests
      })
      .then(function(resp) {
        window.location = "/index.html";
      });
  });
});
