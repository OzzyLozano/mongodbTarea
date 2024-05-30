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

function addBook() {
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const rating = document.querySelector('#rating').value
  const pages = document.querySelector('#pages').value
  const genres = document.querySelector('#genres').value
  const book = {
    title: title,
    author: author,
    pages: pages,
    rating: rating,
    genres: genres
  }
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
      console.log('Libro publicado:', bookstore)
      // Aquí puedes realizar cualquier acción adicional después de que el libro se haya publicado correctamente
    })
    .catch(error => {
      console.error('Error al guardar los datos del libro:', error)
    })
}
