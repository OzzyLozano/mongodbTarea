document.addEventListener("DOMContentLoaded", function() {
  let uri = 'http://localhost:3000/books'
  fetch(uri)
    .then(response => response.json())
    .then(bookstore => {
      const bookList = document.getElementById("book-list");

      bookstore.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Autor: " + book.author;

        const rating = document.createElement("p");
        rating.textContent = "Rating: " + book.rating;

        const pages = document.createElement("p");
        pages.textContent = "Páginas: " + book.pages;

        const genres = document.createElement("p");
        genres.textContent = "Géneros: " + book.genres.join(", ");

        const reviews = document.createElement("div");
        reviews.classList.add("review");
        reviews.innerHTML = "<h3>Reseñas:</h3>";
        book.reviews.forEach(review => {
          const reviewP = document.createElement("p");
          reviewP.textContent = review.name + ": " + review.body;
          reviews.appendChild(reviewP);
        });

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(rating);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(genres);
        bookDiv.appendChild(reviews);

        bookList.appendChild(bookDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
});
