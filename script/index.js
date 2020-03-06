function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: "http://localhost:3000/users/goologin",
        method: "POST",
        headers: {
            token: id_token
        }
    })
        .done(result => {
            // $(".g-signin2").hide()
            localStorage.setItem("token", result)
            // afterLogin()
            console.log(result);
        })
}

$(document).ready(function () {
    $("#register-btn").on("click", function () {
        $("#first").hide()
        $("#second").show()
    })
    $("#login-btn").on("click", function () {
        $("#first").show()
        $("#second").hide()
    })

    /// login form
    $("#form-login").on("submit", function () {
        event.preventDefault()
        $("#login-page").hide()

        let email = $("#email-log").val()
        let password = $("#password-log").val()
        $.ajax({
            url: "http://localhost:3000/users/login",
            method: "POST",
            data: {
                email,
                password
            }
        })
            .done(result => {
                localStorage.setItem("token", result)
                swal({
                    title: "Good job!",
                    text: "You are Login now",
                    icon: "success",
                    button: "Oke",
                });
            })
            .fail(err => {
                let msg = err.responseJSON.err
                let status = err.status
                swal(`Error ${status}`, `${msg}`, "error");
            })
    })

    /// register form

    $("#form-register").on("submit", function (event) {
        event.preventDefault()
        let fullname = $("#fullname-reg").val()
        let email = $("#email-reg").val()
        let password = $("#password-reg").val()
        let no_hp = $("#no_hp-reg").val()
        $.ajax({
            url: "http://localhost:3000/users/register",
            method: "POST",
            data: {
                fullname,
                email,
                password,
                no_hp
            }
        })
            .done(result => {
                swal({
                    title: "Good job!",
                    text: "Register is success",
                    icon: "success",
                    button: "Please Login",
                });
                $("#first").show()
                $("#second").hide()
                console.log(result);

                console.log('success');
            })
            .fail(err => {
                let msg = err.responseJSON.err
                let status = err.status
                swal(`Error ${status}`, `${msg}`, "error");
            })
            .always(() => {
                console.log('loading now');
            })
    })

    // $("#logout-btn").on("click", function (event) {
    //     event.preventDefault()
    //     localStorage.removeItem("token")
    // })

    $("#dashboard").hide()

    // end document ready
})
function signOut() {
    localStorage.removeItem("token")
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
