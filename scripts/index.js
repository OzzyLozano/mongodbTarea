VirtualSelect.init({ 
  ele: 'select',
  search: true,
  searchGroup: false,
  searchByStartsWith: false,
  placeholder: 'Seleccione al menos 1 género',
})

document.querySelector("#save-book").addEventListener("click", function(event){
  event.preventDefault()
});

function reload() {
  window.location.reload();
}

function addBook() {
  let names = ['yoshi', 'Mario', 'luigi', 'peach', 'bowser']
  let bodys = ['I loved it!', 'Seen better', 'So so', 'One of my favs', 'Meh']
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const rating = document.querySelector('#rating').value
  const pages = document.querySelector('#pages').value
  const genres = document.querySelector('#genres').value

  const returnReviews = (lim) => {
    const reviewList = []
    for (let i = 0; i < (lim + 1); i++) {
      reviewList.push({
        name: names[Math.floor(Math.random() * names.length)],
        body: bodys[Math.floor(Math.random() * bodys.length)]
      })      
    }
    return reviewList
  }

  const book = {
    title: title,
    author: author,
    pages: pages,
    rating: rating,
    genres: genres,
    reviews: returnReviews(Math.floor(Math.random() * 3))
  }
  console.log(returnReviews)
  console.log(book)
  bookJSON = JSON.stringify(book)
  console.log(bookJSON)

  let uri = 'http://localhost:3000/post-book'
  fetch(uri, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: bookJSON
  })
    .then(response => response.json())
    .then(bookstore => {
      // manejamos la adicion del libro
      console.log('Libro publicado:', bookstore)
      const modal = document.querySelector('#modal')
      modal.style.display = 'none'
      const popup = document.querySelector('#myModal')
      popup.style.display = 'block'
      // Cerrar modal al hacer clic en la "x"
      const closeBtn = document.querySelector('.close')
      closeBtn.onclick = () => {
        popup.style.display = 'none'
      }
    })
    .catch(error => {
      console.error('Error al guardar los datos del libro:', error)
    })
}

function deleteBook() {
  const bookId = document.querySelector('#book-id').value
  console.log(bookId)

  let uri = `http://localhost:3000/delete-book/${bookId}`
  fetch(uri, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('error:', response.error);
      }
      // Aquí puedes manejar la respuesta si es necesario
      console.log('Libro Eliminado');
    })
    .catch(error => {
      console.error('Ocurrió un problema en su solicitud:', error);
    });
}

function searchBook() {
  const title = document.querySelector('#search-title').value

  const url = `http://localhost:3000/search-book/${encodeURIComponent(title)}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(book => {
      // Manejar el libro encontrado
      console.log('Book found:', book)
      const bookList = document.getElementById("book-found")
      bookList.innerHTML = ''

        const bookDiv = document.createElement("div")
        bookDiv.classList.add("book")

        const title = document.createElement("h2")
        title.textContent = book.title

        const author = document.createElement("p")
        author.textContent = "Autor: " + book.author

        const rating = document.createElement("p")
        rating.textContent = "Rating: " + book.rating

        const pages = document.createElement("p")
        pages.textContent = "Páginas: " + book.pages

        const genres = document.createElement("p")
        genres.textContent = "Géneros: " + book.genres.join(", ")

        const reviews = document.createElement("div")
        reviews.classList.add("review")
        reviews.innerHTML = "<h3>Reseñas:</h3>"
        book.reviews.forEach(review => {
          const reviewP = document.createElement("p")
          reviewP.textContent = review.name + ": " + review.body
          reviews.appendChild(reviewP)
        })
        const id = document.createElement("h3")
        id.textContent = 'Id:' + book._id

        bookDiv.appendChild(title)
        bookDiv.appendChild(author)
        bookDiv.appendChild(rating)
        bookDiv.appendChild(pages)
        bookDiv.appendChild(genres)
        bookDiv.appendChild(reviews)
        bookDiv.appendChild(id)

        bookList.appendChild(bookDiv)
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}
