const currentPage = window.location.href;
const activeHomeLink = document.querySelector('.js-home-btn');
const activeShopLink = document.querySelector('.js-shopping-btn');

if (activeHomeLink.href === currentPage) {
  activeHomeLink.classList.add('is-active-btn');
}

if (activeShopLink.href === currentPage) {
  activeHomeLink.classList.remove('is-active-btn');
  activeShopLink.classList.add('is-active-btn');
}
