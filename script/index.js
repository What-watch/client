function hideAll() {
    $("#dashboard").hide()
    $("#first").hide()
    $("#second").hide()
}

function fetchMoviesNow() {
    console.log('masuk fetch movies now')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/movies/now'
    })
        .done(movies => {
            console.log(`ini now`);
            console.log(movies)
            $("#listNow").append(`
            <div class="col-3 mb-3">
                <div class="card text-center">
                <img
                    src="https://www.idwpublishing.com/wp-content/uploads/2018/10/aHR0cDovL3d3dy5uZXdzYXJhbWEuY29tL2ltYWdlcy9pLzAwMC8yNDAvNzQ0L29yaWdpbmFsL1NwaWRlcm1hbjAxX2N2ckEuanBn.jpeg"
                    class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">The Amazing Spiderman - new Avengers</h5>
                    <p class="card-text">Author: J Michael S</p>
                    <button class="btn btn-primary" onclick="view()">View</button>
                </div>
                </div>
            </div>
            `)

        })
        .fail(err => {
            console.log(err)
        })
}

function fetchMoviesUpcoming() {
    console.log('masuk fetch movies upcoming')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/movies/upcoming'
    })
        .done(movies => {
            console.log(`ini upcoming`)
            console.log(movies)
            // movies.forEach(movie => {
                
            // });
        })
        .fail(err => {
            console.log(err)
        })
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function isLogin() {
    if(localStorage.token){
        hideAll()
        fetchMoviesNow()
        fetchMoviesUpcoming()
        $("#dashboard").show()
    } else {
        hideAll()
        $("#first").show()
    }
}

$(document).ready(function () {
    isLogin()

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


    // $("#dashboard").show()

    // end document ready
})

