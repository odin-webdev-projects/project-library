function criarBiblioteca() {
  const form = document.querySelector("#form");
  const livro = document.querySelector("#livro");
  const autor = document.querySelector("#autor");
  const paginas = document.querySelector("#paginas");
  const bookItens = document.querySelector(".bookItens");
  const bibliotecaArray = [];

  document.querySelector("#root").addEventListener("click", (e) => {
    if (e.target.classList.contains("fechar")) {
      const radio = document.querySelector('input[name="lidoStatus"]:checked');
      const div = document.querySelector(".visibleModal");
      div.className = "invisibleModal";
      livro.value = "";
      autor.value = "";
      paginas.value = "";
      radio.checked = false;
    }
  });

  form.addEventListener("submit", () => {
    const radio = document.querySelector('input[name="lidoStatus"]:checked');
    event.preventDefault();
    if (!radio) {
      form.reportValidity();
    } else {
      criarDiv(livro.value, autor.value, paginas.value, radio.value);

      const obj = {
        livro: livro.value,
        autor: autor.value,
        paginas: paginas.value,
        radio: radio.value,
      };

      bibliotecaArray.push(obj);
      console.log(bibliotecaArray);
    }
  });

  function criarDiv(livro, autor, paginas, radio) {
    const div = document.createElement("div");
    const indexAtual = bibliotecaArray.length;
    div.innerHTML = `${livro} escrito por ${autor}, ${paginas} paginas (${radio})`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "deletar";
    deleteButton.addEventListener("click", () => {
      div.remove();
      if (bibliotecaArray.length === 1) {
        bibliotecaArray.splice(0, 1);
      } else {
        bibliotecaArray.splice(indexAtual, 1);
      }

      console.log(bibliotecaArray);
    });
    div.appendChild(deleteButton);
    bookItens.appendChild(div);
  }
}

document.querySelector(".openModal").addEventListener("click", () => {
  const div = document.querySelector(".invisibleModal");
  div.className = "visibleModal";
});
criarBiblioteca();
