let myLibrary = [];

const libraryContainer = document.querySelector(".cards")

// adding books to the library
function showBooks(){
  // emptying the container to fill it again with new list of books
  libraryContainer.replaceChildren();
  myLibrary.forEach(book => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add('card');
    bookDiv.innerHTML = `<dl>
    <div class="book-list">
            <dt>Title:</dt>
            <dd>${book.title}</dd>
    </div>
    <div class="book-list">
            <dt>Author:</dt>
            <dd>${book.author}</dd>
    </div>
    <div class="book-list">
            <dt>Pages:</dt>
            <dd>${book.pages}</dd>
    </div>
    <div class="book-list">
            <dt>I read the book:</dt>
            <dd>${book.read ? 'Yes' : 'No'}</dd>
    </div> 
    </dl>
    <div class="buttons">
      <button class="readbutton" data-index="${myLibrary.indexOf(book)}">Toggle Read</button>
      <button class="removebutton" data-index="${myLibrary.indexOf(book)}">Remove</button>
    </div>
      `;
    libraryContainer.appendChild(bookDiv)
});
}
showBooks();


const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".addbook");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector(".submit-button");

const form = document.querySelector(".form");



submitButton.addEventListener("click", (event) => {
  // creating a form data to get input values
  var formData = new FormData(form);

  // preventing submit button default behavior
  event.preventDefault();
  // closing the modal
  dialog.close();
  // adding the book
  addBookToLibrary(Object.fromEntries(formData))
  // adding books to the library
  form.reset()
  showBooks()
});



// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

function Book(entry) {
  this.title = entry.title
  this.author = entry.author
  this.pages = entry.pages
  this.read = (entry.read) ? true : false
  
}

Book.prototype.toggle = function(index) {
  myLibrary[index].read = !myLibrary[index].read 
  showBooks();
}


function addBookToLibrary(entry) {
  let book = new Book(entry)
  // do stuff here
  myLibrary.push(book)
}


// remove button event listener
const div = document.querySelector(".cards")


div.addEventListener('click',(e) => {
    console.log(e)
    if(e.target.className === 'removebutton') {
      const dataIndex = e.target.getAttribute('data-index');
      myLibrary = myLibrary.filter(function(item) {
        return item !== myLibrary[dataIndex]
      })
      showBooks();
    } else if (e.target.className === 'readbutton'){
      const dataIndex = e.target.getAttribute('data-index');
      myLibrary[dataIndex].toggle(dataIndex)
    }
})


