
export const markupCardFund = (
    { title, url, img, img2 }, position) => 
    `<li class="support_list-item swiper-slide">
    <p class="support_number">${position}</p>
    <a class="support_link" href="${url}" target="_blank" rel="noopener noreferrer nofollow">
      <img
      srcset="${img} 1x, ${img2} 2x"
        src="${img}"
        alt="${title}"
        width="149"
        loading="lazy"
      />
    </a>
  </li>`;