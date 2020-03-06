function hideAll() {
    $("#listMovies").hide()
}

function fetchMoviesNow() {
    console.log('masuk fetch movies now')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/movies/now'
    })
        .done(movies => {
            console.log(movies)
        })
        .fail(err => {
            console.log(err)
        })
}

function fetchMoviesUpcoming() {
    console.log('masuk fetch movies upcoming')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/movies/now'
    })
        .done(movies => {
            console.log(movies)
        })
        .fail(err => {
            console.log(err)
        })
}

$(document).ready( () => {
    hideAll()
    fetchMoviesNow()
})