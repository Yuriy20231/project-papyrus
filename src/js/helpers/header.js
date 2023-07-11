const menuBtn = document.querySelector("#mobile-menu-btn");

const mobileMenu = document.querySelector(".js-mobile-menu");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("is-menu-open");
    mobileMenu.classList.toggle("is-menu-open");
});

const themeSwitcher = document.getElementById("themeSwitcher");
const container = document.querySelector(".header");
const checkbox = document.querySelector("#themeSwitcher > input");

const theme = localStorage.getItem("theme") ?? "light";
if (theme === "dark") {
    document.documentElement.setAttribute("theme", "dark");
    checkbox.checked = true;
} else {
    document.documentElement.removeAttribute("theme");
    checkbox.checked = false;
}

themeSwitcher.addEventListener("change", toggleTheme);

function toggleTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute("theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.removeAttribute("theme");
        localStorage.setItem("theme", "light");
    }
}
