$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        var username = $('#staticEmail').val();
        var password = $('#inputPassword').val();
        $.ajax({
            url: 'http://localhost:5000/user/login-user',
            method: 'POST',
            data: {
                username,
                password
            },
            success: function(response) {
                var id = response.data.id
                var myObject = { id: response.data.id, username: response.data.username };
                var jsonString = JSON.stringify(myObject);
                localStorage.setItem('info_user', jsonString);
                window.location.href = "Flower.html"
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    })
})