import axios from 'axios';
import { addLoader, removeLoader } from './helpers/loader';

const URL = 'https://books-backend.p.goit.global/books/category-list';

const categoriesContainer = document.querySelector('.categories-list-js');

//  Отримуємо масив зі списком категорії з бекенду
const getCategoriesList = async () => {
  const response = await axios(URL);
  return response.data;
};

// Функція створення розмітки для меню з категоріями
function createMurkupForCategoryList(arr) {
  return arr
    .map(
      el =>
        `<li class="categories-list__item"><a href="#books-scroll">${el.list_name}</a></li>`
    )
    .join('');
}

// Рендер розмітки
getCategoriesList()
  .then(categoriesListArray =>
    categoriesContainer.insertAdjacentHTML(
      'beforeend',
      createMurkupForCategoryList(categoriesListArray)
    )
  )
  .catch(error => console.log(error));
