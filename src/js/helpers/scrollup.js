const scrollUpBtnEl = document.querySelector(".scrollup");
scrollUpBtnEl.addEventListener("click", onScrollUpClick);

function onScrollUpClick() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
}
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 200) {
        // Якщо сторінка прокручена вниз, додати клас "show" до кнопки
        scrollUpBtnEl.classList.add("show");
    } else {
        // Якщо сторінка прокручена до верху, видалити клас "show" з кнопки
        scrollUpBtnEl.classList.remove("show");
    }
});
