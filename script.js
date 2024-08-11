// Seleciona elementos do DOM
const book_name = document.querySelector("#book_name");
const book_author = document.querySelector("#book_author");
const book_pages = document.querySelector("#book_pages");
const book_read_yes = document.querySelector("input#book_read_yes");
const book_read_no = document.querySelector("#book_read_no");
const radio_btn = document.querySelectorAll('input[name="book_read"]');
const submit_btn = document.querySelector("#submit_btn");
const book_section = document.querySelector(".book_section");
const dialog = document.querySelector("dialog");
const open_dialog_btn = document.querySelector(".open_dialog_btn");
const close_dialog_btn = document.querySelector(".close_dialog_btn");

// Abre o diálogo para adicionar um novo livro
open_dialog_btn.addEventListener("click", () => {
  dialog.showModal();
});

// Fecha o diálogo (comentado, mas pode ser usado para fechar o formulário)
close_dialog_btn.addEventListener("click", () => {
  dialog.close();
});

const myLibrary = []; // Array para armazenar os livros

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return (
      this.title +
      ", escrito por " +
      this.author +
      ", " +
      this.pages +
      " páginas" +
      ", " +
      this.read
    );
  };
}
Book.prototype.changeRead = function () {
  const readStatus = this.read;
  if (this.read === "lido") {
    this.read = "não lido";
  } else {
    this.read = "lido";
  }
};

submit_btn.addEventListener("click", () => {
  event.preventDefault(); // Evita o comportamento padrão do formulário
  let radioValue;
  radio_btn.forEach((button) => {
    if (button.checked) {
      radioValue = button.value;
    }
  });
  let newBook = new Book(
    book_name.value,
    book_author.value,
    book_pages.value,
    radioValue
  );

  myLibrary.push(newBook);
  addToPage();
});

function addToPage() {
  book_section.textContent = ""; // Clear current books
  myLibrary.forEach((book, index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-class");
    newDiv.textContent = book.info();

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "remove";
    removeBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      addToPage(); // Re-render the book list
    });

    const changeStatusBtn = document.createElement("button");
    changeStatusBtn.classList.add("change-btn");
    changeStatusBtn.textContent = "change status";
    changeStatusBtn.addEventListener("click", () => {
      book.changeRead();
      addToPage(); // Re-render the book list
    });

    newDiv.appendChild(removeBtn);
    newDiv.appendChild(changeStatusBtn);
    book_section.appendChild(newDiv);
  });
}
