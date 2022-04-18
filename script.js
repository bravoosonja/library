//DOM objects
const form = document.querySelector("#add-book-form");
const modal = document.getElementById("modal");
const newBtn = document.getElementById("new-book-btn");
const closeBtn = document.getElementById("close-btn");
const addBtn = document.getElementById("add-book-btn");

//event listeners
newBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
addBtn.addEventListener("click", addBookToLibrary);
window.addEventListener("onload", populateLibrary);

//constructors
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

//local storage
function saveBookToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getBooksFromLocalStorage() {
  if (myLibrary === null) {
    myLibrary = [];
  } else {
    const booksFromStorage = JSON.parse(localStorage.getItem("books"));
    myLibrary = booksFromStorage;
    populateLibrary();
  }
}

// modal
function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  form.reset();
}

//main functions
let myLibrary = [];

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;
  newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  saveBookToLocalStorage();
  createBookCard(newBook);
  closeModal();
}

function populateLibrary() {
  const booksGrid = document.getElementById("books-grid");
  booksGrid.querySelectorAll("div").forEach((n) => n.remove());

  for (i = 0; i < myLibrary.length; i++) {
    createBookCard(myLibrary[i]);
  }
}

const createBookCard = (newBook) => {
  const booksGrid = document.getElementById("books-grid");
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const btnsGroup = document.createElement("div");
  const readBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  title.classList.add("book-title");
  btnsGroup.classList.add("btns-container");
  readBtn.classList.add("normal-btn");
  deleteBtn.classList.add("normal-btn");

  title.textContent = `${newBook.title}`;
  author.textContent = `${newBook.author}`;
  pages.textContent = `${newBook.pages} pages`;
  deleteBtn.textContent = "Delete";

  if (newBook.isRead === true) {
    readBtn.textContent = "Read";
    readBtn.style.backgroundColor = "#affc41";
    readBtn.style.color = "ffffff";
  } else if (newBook.isRead === false) {
    readBtn.textContent = "Not read";
    readBtn.style.backgroundColor = "#eefc57";
    readBtn.style.color = "ffffff";
  }

  deleteBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(newBook), 1);
    saveBookToLocalStorage();
    populateLibrary();
  });

  //toggle Read
  readBtn.addEventListener("click", () => {
    newBook.isRead = !newBook.isRead;
    saveBookToLocalStorage();
    populateLibrary();
  });

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  btnsGroup.appendChild(readBtn);
  btnsGroup.appendChild(deleteBtn);
  booksGrid.appendChild(bookCard);
  bookCard.appendChild(btnsGroup);
};

const addBook = () => {
  const newBook = getBookFromInput();
  myLibrary.addBook(newBook);
  saveBookToLocalStorage();
  updateBooks();
};
