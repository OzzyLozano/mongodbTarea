let pagination = 0
let uri = 'http://localhost:3000/books?page=' + pagination

function showAllBooks() {
  uri = 'http://localhost:3000/all-books'
  fetchBooks(uri)
  document.querySelector("#back-btn").style.display = 'none'
  document.querySelector("#next-btn").style.display = 'none'
}

// pagination
function getTotalBooks() {
  return fetch('http://localhost:3000/total-books')
    .then(response => response.json())
    .then(totalBooks => {
      return totalBooks
    })
    .catch(error => {
      console.error('Error al obtener la cantidad total de libros:', error)
    })
}
function nextPage() {
  document.querySelector("#back-btn").disabled = false;
  getTotalBooks().then(totalBooks => {
    if ((pagination + 1) < (totalBooks.totalBooks/3)) {
      pagination += 1
      uri = 'http://localhost:3000/books?page=' + pagination
      fetchBooks(uri)
      if (totalBooks.totalBooks == ((pagination * 3) + 1) || totalBooks.totalBooks == ((pagination * 3) + 2) || totalBooks.totalBooks == ((pagination * 3) + 3)) 
        document.querySelector("#next-btn").disabled = true
    } else {
      document.querySelector("#next-btn").disabled = true
    }
  }).catch(error => {
    console.error('Error al obtener la cantidad total de libros:', error)
  })
  console.log(uri)
}
function previousPage() {
  document.querySelector("#next-btn").disabled = false
  if (pagination - 1 < 0) {
    document.querySelector("#back-btn").disabled = true
  } else {
    pagination -= 1
    uri = 'http://localhost:3000/books?page=' + pagination
    fetchBooks(uri)
  }
  if (pagination == 0) document.querySelector("#back-btn").disabled = true
  console.log(uri)
}

function fetchBooks(url) {
  fetch(url)
    .then(response => response.json())
    .then(bookstore => {
      const bookList = document.getElementById("book-list")
      bookList.innerHTML = ''

      bookstore.forEach(book => {
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

        bookDiv.appendChild(title)
        bookDiv.appendChild(author)
        bookDiv.appendChild(rating)
        bookDiv.appendChild(pages)
        bookDiv.appendChild(genres)
        bookDiv.appendChild(reviews)

        bookList.appendChild(bookDiv)
      })
    })
    .catch(error => {
      console.error('Error fetching JSON:', error)
    })
}

document.addEventListener("DOMContentLoaded", () => fetchBooks(uri));
