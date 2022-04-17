//DOM objects
const form = document.querySelector("#add-book-form");
const modal = document.getElementById("modal");
const newBtn = document.getElementById("new-book-btn");
const closeBtn = document.getElementById("close-btn");
const deleteBtn = document.getElementById("delete-btn");
const readBtn = document.createElement("button");

//event listeners
newBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
deleteBtn.addEventListener("click", deleteBook);
readBtn.addEventListener("click", updateBook);

//constructors
let myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R.Tolkin",
    pages: 295,
    read: false,
  },
  JSON.parse(localStorage.getItem("myLibrary")),
];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

//helper function
function addNewBookToLibrary(newBook) {
  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
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
function addBook(i) {
  const bookGrid = document.querySelector("book-grid");
  bookGrid.appendChild(bookCard);
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-index", `${i}`);

  const title = document.getElementById("title").value;
  const titleNode = document.createElement("p");
  titleNode.classList.add("book-title");
  titleNode.innerHTML = `${title}`;
  bookCard.appendChild(titleNode);

  const author = document.getElementById("author").value;
  const authorNode = document.createElement("p");
  authorNode.innerHTML = `${author}`;
  bookCard.appendChild(authorNode);

  const pages = document.getElementById("pages").value;
  const pagesNode = document.createElement("p");
  pagesNode.innerHTML = `${pages} pages`;
  bookCard.appendChild(pagesNode);

  const btnsGroup = document.createElement("div");
  const isRead = document.getElementById("read").value;

  readBtn.classList.add("normal-btn");
  btnsGroup.appendChild(readBtn);

  if (isRead.value === false) {
    readBtn.textContent = "Not read";
    readBtn.style.backgroundColor = "#f77f00";
    readBtn.style.color = "ffffff";
  } else {
    readBtn.textContent = "Read";
    readBtn.style.backgroundColor = "#0cce6b";
    readBtn.style.color = "ffffff";
  }

  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("normal-btn");
  btnsGroup.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(item), 1);
  });

  addNewBookToLibrary();
  closeModal();
}

function updateBook() {
  readBtn.addEventListener("click", () => {
    if (isRead.value === false) {
      readBtn.innerHTML = "Read";
      readBtn.style.backgroundColor = "#0cce6b";
      readBtn.style.color = "ffffff";
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    } else {
      readBtn.innerHTML = "Not read";
      readBtn.style.backgroundColor = "#f77f00";
      readBtn.style.color = "ffffff";
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }
  });
}

function deleteBook() {
  bookGrid.removeChild(bookCard);
  myLibrary.splice(bookCard, 1);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
