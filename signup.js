$(document).ready(function() {
    $("#signup").submit(function(event) {
        event.preventDefault();
        var emailValue = $("#email").val();
        var password = $("#password").val();
        console.log(emailValue);
        console.log(password);
        axios.get('http://localhost:3000/users')
            .then(function(resp) {
                data = resp.data;
                for (let i = 0; i < data.length; i++) {
                    if (emailValue === data[i].email) {
                        alert("Email does not exist");
                        return;
                    }
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    });
});