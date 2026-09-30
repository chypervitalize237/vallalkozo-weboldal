const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const year = document.getElementById("year");
const form = document.getElementById("themeForm");
const note = document.getElementById("formNote");

if (year) year.textContent = new Date().getFullYear();

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    note.hidden = false;
    note.classList.add("is-in");
  });
}

const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const targets = document.querySelectorAll(
  ".hero .eyebrow, .hero h1, .hero .lede, .hero-actions, .stats > div, .section-head, .card, .steps li, .tile, .contact-form, .site-header, .site-footer"
);

targets.forEach((el, i) => {
  el.classList.add("anim");
  el.style.setProperty("--d", `${Math.min(i % 8, 7) * 80}ms`);
});

if (motionOk && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach((el) => el.classList.add("is-in"));
}
