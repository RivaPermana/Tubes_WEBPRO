$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();

        var username = $('#name').val();
        var password = $('#pass').val();

        const takeUsername = localStorage.getItem('username');
        const takePassword = localStorage.getItem('password');

        if (password.length < 6) {
            alert('Password must be at least 6 characters!');
            return;
        }else if (username === takeUsername && password === takePassword) {
            alert('Login Successful!');
            window.location.href = 'home.html'
        }else {
            alert('Wrong Password or Username!');
        }
    });
});
