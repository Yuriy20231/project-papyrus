import { getBookById } from "./get-data";
import { Notify } from "notiflix";
import scrollLock from "scroll-lock";
import amazonPng from './../../img/icon-book-store/amazon.png';
import appleStorePng from './../../img/icon-book-store/apple-store.png';
import bookShopPng from './../../img/icon-book-store/book-shop.png';

const modalBtnCls = document.querySelector(".modal-btn");
const modal = document.querySelector(".backdrop");
const modalContentBody = document.querySelector(".modal-content-body");
const addToShopBtn = document.querySelector(".add-modal-btn");
const modalText = document.querySelector(".modal-text");
const bookItems = document.querySelector(".js-list-books");
const URL = "https://books-backend.p.goit.global/books/category?category=";
const bookGet = {
    getBookById
};

let shoppingList = [];
let shoppingBook = {};

shoppingList = JSON.parse(localStorage.getItem("shopping-trash"));

if (shoppingList === null) {
    shoppingList = [];
}

function disableScroll() {
    scrollLock.disablePageScroll();
}

function enableScroll() {
    scrollLock.enablePageScroll();
}

function modalCartBoock(book) {
    return `
    <div class="modal-content-card">
      <div class="modal-content-img">
        <img class='modal-content-pict' src="${book.bookImage}" alt="${book.title}"  />
      </div>
      <div class="modal-content-text">
        <h2 class="modal-content-titl"><b>${book.title}</b></h2>
        <p class="modal-content-autur"><b>${book.author}</b></p>
        <p class="modal-content-abst"><b>${book.description}</b></p>
        <ul class="modal-link">
          <li class="modal-link__item">
            <a class="modal-link amazon" href="${book.buyLinks[0].url}" target="_blank">
              <img class="modal-link-icon" src="${amazonPng}"19"></img>
            </a>
          </li>
          <li class="modal-link__item">
            <a class="modal-link apple" href="${book.buyLinks[1].url}" target="_blank">
              <img class="modal-link-icon" src="${appleStorePng}" alt="apple shop" width="33" height="32"></img>
            </a>
          </li>
          <li class="modal-link__item">
            <a class="modal-link shop" href="${book.buyLinks[2].url}" target="_blank">
              <img class="modal-link-icon" src="${bookShopPng}" alt="book shop" width="38" height="36"></img>
            </a>
          </li>
        </ul>
      </div>
    </div>`;
}

function renderBooksCard(book) {
    modalContentBody.innerHTML = modalCartBoock(book);
}

export async function openModal(bookId) {
    modalBtnCls.addEventListener("click", closeModal);
    modal.classList.remove("hi-backdrop");

    disableScroll();
    document.addEventListener("keydown", handleKeyDown);

    renderBooksCard(bookId);
    shoppingBook = bookId;
    let chosenBookIds =
        JSON.parse(localStorage.getItem("shopping-trash"))?.map((bookObj) => {
            return bookObj.id;
        }) ?? [];
    if (chosenBookIds.includes(bookId.id)) {
        addToShopBtn.textContent = "Remove from the shopping list";
        modalText.style.display = "block";
        addToShopBtn.classList.remove("openmodal-btn");
        addToShopBtn.classList.add("closemodal-btn");
    } else {
        addToShopBtn.textContent = "Add to shopping list";
        modalText.style.display = "none";
        addToShopBtn.classList.remove("closemodal-btn");
        addToShopBtn.classList.add("openmodal-btn");
    }
}

function closeModal() {
    modalBtnCls.removeEventListener("click", closeModal);
    modal.classList.add("hi-backdrop");
    enableScroll();
    document.removeEventListener("keydown", handleKeyDown);
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function handleKeyDown(e) {
    if (e.key === "Escape") {
        closeModal();
    }
}

addToShopBtn.addEventListener("click", toggleShoppingList);

function toggleShoppingList() {
    if (addToShopBtn.classList.contains("openmodal-btn")) {
        addToShoppingList();
    } else {
        removeFromShoppingList();
    }
}

function saveShoppingTrash() {
    shoppingList.push(shoppingBook);
    localStorage.setItem("shopping-trash", JSON.stringify(shoppingList));
    //onOpenFunc();
}

function addToShoppingList() {
    addToShopBtn.textContent = "Remove from the shopping list";
    modalText.style.display = "block";
    addToShopBtn.classList.remove("openmodal-btn");
    addToShopBtn.classList.add("closemodal-btn");
    saveShoppingTrash();
}

function removeFromShoppingList() {
    addToShopBtn.textContent = "Add to shopping list";
    modalText.style.display = "none";
    addToShopBtn.classList.remove("closemodal-btn");
    addToShopBtn.classList.add("openmodal-btn");
    removeShoppingTrash();
}

function removeShoppingTrash() {
    shoppingList = shoppingList.filter((item) => item.id !== shoppingBook.id);
    localStorage.setItem("shopping-trash", JSON.stringify(shoppingList));
}

export { shoppingList };
