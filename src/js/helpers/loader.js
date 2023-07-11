function addLoader() {
  document
    .querySelector('body')
    .insertAdjacentHTML(
      'afterbegin',
      '<div class="js-loader"><div></div><div></div><div></div><div></div></div>'
    );
}

function removeLoader() {
  document.querySelector('.js-loader')?.remove();
}

export { addLoader, removeLoader };
