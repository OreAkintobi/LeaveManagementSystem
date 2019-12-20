// Stores details of user logging in on local storage
function login(userData) {
  localStorage.setItem("logged-in-user", JSON.stringify(userData));
}
// Removes details of user as they are logging out
function logout() {
  localStorage.removeItem("logged-in-user");
}

$(document).ready(function() {
  // Logs out any logged-in user before allowing new sign-ups/logins
  logout();
  // Initializes sign-up behavior
  $("#signup").submit(function(event) {
    event.preventDefault();
    var emailValue = $("#email").val();
    var password = $("#password").val();
    // Gets user data from JSON
    axios
      .get("http://localhost:3000/users")
      .then(function(resp) {
        var data = resp.data;
        // Checks if available user data matches entered data
        for (let i = 0; i < data.length; i++) {
          if (emailValue === data[i].email) {
            $(".email-exists").text("Email already exists");
            $(".email-exists").css("color", "red");
            return;
          }
        }
        // Posts new user data to JSON
        axios
          .post("http://localhost:3000/users", {
            id: Date.now(),
            email: emailValue,
            password: password,
            isAdmin: false
          })
          .then(function(resp) {
            login(resp.data);
            window.location = "/index.html";
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  // Initializes sign-up behavior
  $("#login").submit(function(event) {
    event.preventDefault();
    var emailValue = $("#email").val();
    var password = $("#password").val();
    // Gets user data from JSON
    axios.get("http://localhost:3000/users").then(function(resp) {
      var userFound = false;
      var data = resp.data;
      // Checks if available user email and password matches entered data
      for (let i = 0; i < data.length; i++) {
        if (emailValue === data[i].email && password === data[i].password) {
          // Then logs them in
          login(data[i]);
          userFound = true;
          window.location = "/index.html";
        }
      }
      // Notifies user when user data is unavailable
      if (!userFound) {
        $(".email-exists").text("Wrong username or password");
        $(".email-exists").css("color", "red");
        return;
      }
    });
  });
});
