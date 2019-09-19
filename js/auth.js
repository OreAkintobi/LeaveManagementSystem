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
        axios.get('http://localhost:3000/users')
            .then(function(resp) {
                var data = resp.data;
                for (let i = 0; i < data.length; i++) {
                    if (emailValue === data[i].email) {
                        alert("Email is already taken");
                        return;
                    }
                }
                axios.post('http://localhost:3000/users', {
                    id: Date.now(),
                    email: emailValue,
                    password: password,
                    isAdmin: false,
                }).then(function(resp) {
                    login(resp.data);
                    window.location = "/home.html";
                }).catch(function(error) {
                    console.log(error);
                });

            })
            .catch(function(error) {
                console.log(error);
            });
    });
    $("#login").submit(function(event) {
        event.preventDefault();
        var emailValue = $("#email").val();
        var password = $("#password").val();
        axios.get('http://localhost:3000/users')
            .then(function(resp) {
                var userFound = false;
                var data = resp.data;
                for (let i = 0; i < data.length; i++) {
                    if (emailValue === data[i].email && password === data[i].password) {
                        login(data[i]);
                        userFound = true;
                        window.location = "/home.html";
                    }
                }
                if (!userFound) {
                    alert("Invalid password");
                    return;
                }
            })
    })
});