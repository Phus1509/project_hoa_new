$(document).ready(function() {
    $('#registerForm').submit(function(event) {
        event.preventDefault();
        var username = $('#staticUsername').val();
        var password = $('#inputPassword').val();
        var email = $('#staticEmail').val();
        $.ajax({
            url: 'http://localhost:5000/user/register-user',
            method: 'POST',
            data: {
                username,
                password,
                email
            },
            success: function(response) {
                window.location.href = "login.html"
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    })
})