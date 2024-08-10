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
const close_dialog_btn = document.querySelector("close_dialog_btn");

open_dialog_btn.addEventListener("click", () => {
  dialog.showModal();
});

// close_dialog_btn.addEventListener("click", () => {
//   dialog.close();
// });

const myLibrary = [];

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
  event.preventDefault();
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
  setDataAttribute();
  console.log(newBook.read);
});

function addToPage() {
  const lastElement = myLibrary.at(-1);
  const newDiv = document.createElement("div");
  newDiv.classList.add("book-class");
  book_section.appendChild(newDiv);
  newDiv.textContent = lastElement.info();

  const removeBtn = document.createElement("button");
  newDiv.appendChild(removeBtn);
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "remove";
  removeBtn.addEventListener("click", (event) => {
    newDiv.remove();
    const targetElement = event.target;
    const dataValue = targetElement.getAttribute("data-id");
    myLibrary.splice(dataValue, 1);
  });

  const changeStatusBtn = document.createElement("button");
  newDiv.appendChild(changeStatusBtn);
  changeStatusBtn.classList.add("change-btn");
  changeStatusBtn.textContent = "change status";
  changeStatusBtn.addEventListener("click", (event) => {
    const targetElement = event.target;
    const dataValue = targetElement.getAttribute("data-id");
    myLibrary.at(dataValue).changeRead();
    newDiv.textContent = myLibrary.at(dataValue).info();
    newDiv.appendChild(removeBtn);
    newDiv.appendChild(changeStatusBtn);
  });
}

function setDataAttribute() {
  const element = document.querySelectorAll(".remove-btn");
  element.forEach((book, index) => {
    book.setAttribute("data-id", index);
  });
  const element2 = document.querySelectorAll(".change-btn");
  element2.forEach((book, index) => {
    book.setAttribute("data-id", index);
  });
}
