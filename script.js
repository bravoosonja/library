const modal = document.getElementById("modal");
const addBtn = document.getElementById("add-book-btn");
const closeBtn = document.getElementById("close-btn");

function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

addBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
