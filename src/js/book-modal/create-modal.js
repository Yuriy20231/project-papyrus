import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import icon from '../../images/icon.svg';

function createMarkup(product) {
  basicLightbox
    .create(
      `<div class="book-modal">
    <img src="${product.book_image}" alt="${product.title}" class="book-modal-img"/>
    <div class='book-modal-details'>
        <h2 class="book-modal-title">${product.title}</h2>
        <h3 class="book-modal-author">${product.author}</h3>
        <p class='book-modal-desc'>${product.description}</p>
        <ul class='icon-book-modal-list'>
        <li>
            <a href="${product.buy_links[0].url}">
            <svg class='icon-book-modal-amazon'><use href="${icon}#icon-amazon"></use></svg>
            </a>
        </li>
        <li>
            <a href="${product.buy_links[1].url}">
            <svg class='icon-book-modal-ibooks'><use href="${icon}#icon-ibooks"></use></svg>
            </a>
        </li>
        <li>
            <a href="${product.buy_links[4].url}">
            <svg class='icon-book-modal-bookshop'><use href="${icon}#icon-bookshop"></use></svg>
            </a>
        </li>
        </ul>
    </div>
    <button class='book-modal-btn js-add' id='js-book-modal-btn'></button>
    <p class='book-modal-buy'>Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
    </div>`
    )
    .show();
}

export { createMarkup };
