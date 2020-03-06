function wishlistPage() {
  $("#detail-movie").show()
  fetchWishlistMovie()
}

function fetchWishlistMovie () {
  let token = localStorage.token
  $.ajax({
    url: 'http://localhost:3000/wishlists',
    method: 'GET'
    // headers : {
    //   token
    // }
  })
    .done(response => {
      $('#wishlist-movies').empty()
      response.forEach(movie => {
        let card = `
        <div class="card-movie">
            <h4>${movie.title} ${movie.year}</h4>
            <img src="${movie.image_url}">
            <div class="action-card">
  
                <a onclick="deleteMovie('${movie.id}')"><i class="fas fa-trash-alt"></i></a>
            </div>
        </div>
        `
        $('#wishlist-movies').append(card)
      })
    })
    .fail(err => {
      console.log(err)
    })
    always(() => {
      
    })
}

function deleteMovie(idMovie) {
  let token = localStorage.token
  alert('masuk')
  console.log(idMovie);
  
  $.ajax({
    url: 'http://localhost:3000/wishlists/' + idMovie,
    method: 'DELETE',
    // headers: {
    //   token
    // }
  })
    .done(response => {
      console.log('DELETE SUCCESS >>>>>>>>>>>>>>>>')
      wishlistPage()
    })
    .fail(err => {
      console.error(err)
    })

}

function selectionId (movieId) {
  let strId = movieId.slice(7)
  let arrId = strId.split('')
  let newArr= arrId.pop()
  let idMovie = arrId.join('')
  return idMovie
}


$(document).ready(function () {
  $('#wishlist-menu').on('click', function () {
    wishlistPage()
  })
})