$(document).ready(function () {
    $('#registerForm').submit(function (e) {
        e.preventDefault();

        var username = $('#name').val();
        var email = $('#email').val();
        var password = $('#pass').val();
        var confirmPassword = $('#conpass').val();

        if (password.length < 6) {
            alert('Password must be at least 6 characters!');
            return;
        }else if (password !== confirmPassword) {
            alert('Password do not match!');
            return;
        }

        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('conPassword', confirmPassword);

        alert('Register Successful!');

        window.location.href = 'login.html'
    });
});
