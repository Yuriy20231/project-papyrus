import { fundsArray } from './fund-array';
import { markupCardFund } from './markup-support';
import Swiper from 'swiper';


const supportListEl = document.querySelector('.support_list-js');
const btnSwiperEl = document.querySelector('.swiper-button-next');

let position = 0;

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const markupSetFunds = fundsArray
  .map((el, i) => {
    position = addLeadingZero(i + 1);

    return markupCardFund(el, position);
  })
  .join('');

supportListEl.innerHTML = markupSetFunds;

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  spaceBetween: 20,
  slidesPerView: 'auto',
  rewind: true,

  navigation: {
    nextEl: '.swiper-button-next',
  },
});

swiper.update();

btnSwiperEl.addEventListener('click', () => {
  swiper.slideNext();

});

