document.addEventListener('DOMContentLoaded', function() {
  const filterButton = document.querySelector(".btn_submit");

  filterButton.addEventListener("click", () => {
    const selectedGenre = document.querySelector("#genre").value;
    fetch(`http://localhost:3000/books?genre=${selectedGenre}`)
      .then(response => response.json())
      .then(books => {
        // Actualizar la interfaz de usuario con los libros obtenidos
        console.log(books);
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
      });
  });
});
