import axios from "axios";
import changeLastWordColor from "./helpers/last-word-color";
import { addLoader, removeLoader } from "./helpers/loader";
import { getBookById } from "./helpers/get-data";
import { openModal } from "./helpers/modal-window";

const URL = "https://books-backend.p.goit.global/books/category?category=";

const booksList = document.querySelector(".js-books-list");
const categoriesContainer = document.querySelector(".categories-list-js");

categoriesContainer.addEventListener("click", onCtegoryLinkClick);

async function getBooksByCategory(choisedCategory) {
    const response = await axios(`${URL}${choisedCategory}`);
    return response.data;
}

function onCtegoryLinkClick(e) {
    removeLoader();
    addLoader();
    if (e.target.nodeName !== "A") {
        return;
    }

    const selectedCategoryLink = document.querySelector(
        ".categories-list__item.is-active"
    );

    if (selectedCategoryLink) {
        selectedCategoryLink.classList.remove("is-active");
    }

    const parent = e.target.closest(".categories-list__item");
    parent.classList.add("is-active");

    const choisedCategory = e.target.textContent;
    getBooksByCategory(choisedCategory)
        .then((arr) => {
            if (arr.length === 0) {
                removeLoader();
                return;
            }
            const categoryTitleText = arr[0].list_name;
            const categoryTitle = document.querySelector(".js-category-title");
            categoryTitle.textContent = categoryTitleText;

            changeLastWordColor(categoryTitle);
            const markup = createMarkupForBooksByCategory(arr);
            booksList.innerHTML = markup;
        })
        .catch((error) => console.log(error))
        .finally(() => removeLoader());
}

function createMarkupForBooksByCategory(arr) {
    return arr
      .map(
        ({ book_image, title, list_name, author, _id }) => `
        <li class="book-list__item" data-id="${_id}" >
                <div class="book-thumb" >
                    <img
                    class="book-img"
                    src="${book_image}"
                    loading="lazy"
                    width="335"
                    alt="${title}"
                    />
                    <div class="book-overlay">quick view</div>
                </div>
                <h3 class="book-tittle">${title}</h3>
                <p class="book-author">${author}</p>
        </li>`
      )
      .join('');
}

document
    .querySelector(".js-books-list")
    ?.addEventListener("click", onBookClick);

function onBookClick(evt) {
    if (
        evt.target.classList.contains("js-books-list") ||
        evt.target.classList.contains("item-category") ||
        evt.target.classList.contains("js-item-book") ||
        evt.target.classList.contains("js-list-books") ||
        evt.target.nodeName === "BUTTON"
    ) {
        return;
    }

    const bookCard =
        evt.target.closest(".book-list__item") ??
        evt.target.closest(".item-book-select");

    const bookId = bookCard.dataset.id;
    getBookById(bookId).then((data) => openModal(data));
}
