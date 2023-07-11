import Notiflix from 'notiflix';
import { addLoader, removeLoader } from '../helpers/loader';

export const listCategories = document.querySelector('.js-books-list');

export const titleSection = document.querySelector('.js-category-title');
export const BASE_URL = 'https://books-backend.p.goit.global/books/';

async function getBooksBestsellers() {
  addLoader();
  const resps = await fetch(`${BASE_URL}/top-books`);
  if (!resps.ok) {
    throw new Error();
  }
  return resps.json();
}

getBooksBestsellers()
  .then(resp => {
    listCategories.insertAdjacentHTML(
      'beforeend',
      createMarkupAllBestsellers(resp)
    );
    removeLoader();
  })
  .catch(() => {
    Notiflix.Notify.failure(`Sorry, search failed. Please try again.`);
  });

export function createMarkupAllBestsellers(arr) {
  const markup = arr
    .map(
      ({ list_name, books }) => `<li class="item-category">
         <h3 class="title-category">${list_name}</h3>
         <ul class="list-books js-list-books">${createMarkupOneCategory(
           books
         )}</ul>
        <button class="btn btn-seemore" data-category="${list_name}">See more</button>
  </li>`
    )
    .join('');
  return markup;
}

export function createMarkupOneCategory(arr_books) {
  return arr_books
    .map(
      ({ author, book_image, title, _id }) =>
        `<li class="item-book js-item-book js-book-card" data-id="${_id}">
          <div class="book-thumb js-item-book">
           <img class="pict-book js-item-book js-open-modal-click" src="${book_image}" loading="lazy" alt="${title}">
           <div class="book-overlay js-item-book js-open-modal-click">quick view</div>
          </div>
          <h4 class="title-book js-item-book">${title}</h4>
          <p class="author js-item-book">${author}</p>
         </li>`
    )
    .join('');
}
