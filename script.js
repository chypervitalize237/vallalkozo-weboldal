const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const year = document.getElementById("year");
const form = document.getElementById("themeForm");
const note = document.getElementById("formNote");
const bar = document.getElementById("scrollProgress");
const photo = document.getElementById("landPhoto");

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
  });
}

const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const targets = document.querySelectorAll(".hero .eyebrow, .hero h1, .hero .lede, .hero-actions, .section-head, .card, .steps li, .tile, .contact-form");
targets.forEach((el, i) => {
  el.classList.add("anim");
  el.style.setProperty("--d", `${Math.min(i % 6, 5) * 70}ms`);
});
if (motionOk && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach((el) => el.classList.add("is-in"));
}

function scene() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (bar && max > 0) bar.style.width = `${(y / max) * 100}%`;
  if (photo && motionOk) {
    const shift = Math.max(-60, Math.min(60, y * 0.06));
    photo.style.transform = `translate3d(0, ${-shift}px, 0)`;
  }
}
window.addEventListener("scroll", scene, { passive: true });
scene();
