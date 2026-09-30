const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}
