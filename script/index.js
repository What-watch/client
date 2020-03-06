// function hideAll() {
//     $("#dashboard").hide()
//     $("#first").hide()
//     $("#second").hide()
//     $("#landing-page").hide()
// }


function fetchMoviesNow() {
    console.log('masuk fetch movies now')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/movies/now'
    })
        .done(movies => {
            console.log(`ini now`);
            console.log(movies)
            movies.forEach(movie => {
                // console.log(`ini movieee`)
                // console.log(movie)
                $("#listNow").append(`
                <div class="col-3 mb-3">
                    <div class="card text-center">
                    <img
                        src="${movie.poster_path}"
                        class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <button class="btn btn-primary" onclick="view()">View</button>
                    </div>
                    </div>
                </div>
                `)
            });

        })
        .fail(err => {                
            let msg = err.responseJSON.err
            let status = err.status
            swal(`Error ${status}`, `${msg}`, "error");
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
            movies.forEach(movie => {
                // console.log(`ini movieee`)
                $("#listUpcoming").append(`
                <div class="col-3 mb-3">
                    <div class="card text-center">
                    <img
                        src="${movie.poster_path}"
                        class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <button class="btn btn-primary" onclick="view('${movie.title}')">View</button>
                    </div>
                    </div>
                </div>
                `)
            });

        })
        .fail(err => {
            let msg = err.responseJSON.err
            let status = err.status
            swal(`Error ${status}`, `${msg}`, "error");
        })
}

function view (title) {
    console.log('nanananaana', title)
    $("#detail-movie").empty()
    $.ajax({
        url: 'http://localhost:3000/imdb/movies?search=' + title,
        method: 'GET'
    })
        .done(response => {

            console.log(response, '>>>>>>>>>>>>>>>>>')
            let division = `
            <div class="hero-movie">
                <img src="${response.Poster}">
            </div>
            <div class="my-detail-movie">
                <div class="detail-author">
                    <table class="table-detail-movie">
                        <tr>
                            <th>Title</th>
                            <td>${response.Title}</td>
                        </tr>
                        <tr>
                            <th>Director</th>
                            <td>${response.Director}</td>
                        </tr>
                        <tr>
                            <th>Production</th>
                            <td>${response.Production}</td>
                        </tr>
                        <tr>
                            <th>Year</th>
                            <td>${response.Year}</td>
                        </tr>
                        <tr>
                            <th>ImdbRating</th>
                            <td>${response.imdbRating}</td>
                        </tr>
                    </table>
                </div>
                <div class="sinopsis">
                    <h1>Sinopsis</h1>
                    <p>${response.Plot}</p>
                    <button onclick="addWishlist('${response.imdbID}')">Add wishlist</button>
                </div>
            </div>
            <div>
                <iframe width="966" height="543" src="https://www.youtube.com/embed/${response.linkYT}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            `
            $("#detail-movie").append(division)
            detailPage()

        })
        .catch(err => {
            console.log(err)
        })
}

function detailPage() {
    $('#dashboard').show()
    $("#detail-movie").show()
    $('#listMovies').hide()
    $('#wishlist-movies').hide()
    $('#loading-data').hide()  
}

function addWishlist(imdbID) {
    $.ajax({
        url: 'http://localhost:3000/wishlists',
        method: 'POST',
        data: {
            MovieId : imdbID
        },
        headers : {
            token : localStorage.token
        }
    })
        .done(response => {
            wishlistPage()
        })
        .fail(err => {
            console.log(err)
        })
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
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
            dashboardPage()
            console.log(result);
        })
}



function isLogin() {
    if(localStorage.token){
        // hideAll()
        // fetchMoviesNow()
        // fetchMoviesUpcoming()
        // $("#dashboard").show()
        dashboardPage()
    } else {
        // hideAll()
        // $("#landing-page").show()
        landingPage()

    }
}

function landingPage() {
    $("#landing-page").show()
    $("#dashboard").hide()
}

function dashboardPage() {
    $("#landing-page").hide()
    $("#dashboard").show()
    fetchMoviesNow()
    fetchMoviesUpcoming()
    
}

function wishlistPage() {
    // $("#detail-movie").show()
    // fetchWishlistMovie()
    // $("#listMovies").hide()
    // $('#detail-movie').hide()
    // $("#lodaing-data").hide()
    // $("#wishlist-movies").show()

    $('#dashboard').show()
    $("#detail-movie").hide()
    $('#listMovies').hide()
    $('#wishlist-movies').show()
    $('#loading-data').hide() 
    fetchWishlistMovie()
  }
  
  function fetchWishlistMovie () {
    let token = localStorage.token
    $.ajax({
      url: 'http://localhost:3000/wishlists',
      method: 'GET',
      headers : {
        token
      }
    })
      .done(response => {
        $('#wishlist-movies').empty()
        response.forEach(movie => {
          let card = `
          <div class="card-movie">
              <h4 style="color:white; ">${movie.title} ${movie.year}</h4>
              <img src="${movie.image_url}">
              <div class="action-card">
    
                  <a style="color:white;" onclick="deleteMovie('${movie.id}')"><i class="fas fa-trash-alt"></i></a>
              </div>
          </div>
          `
          $('#wishlist-movies').append(card)
        //   wishlistPage()
        })
      })
      .fail(err => {
        console.log(err)
      })
  }
  
  function deleteMovie(idMovie) {
    let token = localStorage.token
    alert('masuk')
    console.log(idMovie);
    
    $.ajax({
      url: 'http://localhost:3000/wishlists/' + idMovie,
      method: 'DELETE',
      headers: {
        token
      }
    })
      .done(response => {
        wishlistPage()
      })
      .fail(err => {
        console.error(err)
      })
  
  }

  function backHome() {
      console.log('BACK HOME')
    dashboardPage()
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
                dashboardPage()
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

    // WISHLIST 
    $('#wishlist-menu').on('click', function () {
        wishlistPage()
    })

    $("#logout").on('click', function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.clear()
        landingPage()   
    });
    })

    $("#home-nih").on('click', function() {
        $('#dashboard').show()
        $("#detail-movie").hide()
        $('#listMovies').show()
        $('#wishlist-movies').hide()
        $('#loading-data').hide() 
        // fetchWishlistMovie()
        // dashboardPage()
    })
})

