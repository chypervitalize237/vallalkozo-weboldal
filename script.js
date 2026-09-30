const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const year = document.getElementById("year");
const form = document.getElementById("themeForm");
const note = document.getElementById("formNote");
const glow = document.getElementById("cursorGlow");
const bar = document.getElementById("scrollProgress");
const layers = document.querySelectorAll("[data-depth]");

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
const targets = document.querySelectorAll(".hero .eyebrow, .hero h1, .hero .lede, .hero-actions, .stats > div, .section-head, .card, .steps li, .tile, .contact-form, .site-header, .site-footer");
targets.forEach((el, i) => {
  el.classList.add("anim");
  el.style.setProperty("--d", `${Math.min(i % 8, 7) * 80}ms`);
});
if (motionOk && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach((el) => el.classList.add("is-in"));
}

let mx = 0, my = 0, tx = 0, ty = 0;
const content = document.querySelectorAll(".hero, .section, .site-header");
function scene() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? y / max : 0;
  if (bar && max > 0) bar.style.width = `${p * 100}%`;
  layers.forEach((layer) => {
    const depth = Number(layer.dataset.depth || 0);
    const grow = Number(layer.dataset.scale || 0);
    const x = tx * 90 * depth;
    const shiftY = y * depth * 0.92 + ty * 48 * depth;
    const z = -180 * (1 - Math.min(depth, 1));
    const s = 1 + grow * (p * 1.4 + Math.abs(tx) * 0.35);
    layer.style.transform = `translate3d(${x}px, ${shiftY}px, ${z}px) scale(${s})`;
  });
  content.forEach((el, i) => {
    const local = Math.min(Math.max((y - el.offsetTop + 120) * 0.06, -40), 80);
    el.style.transform = `translate3d(${tx * -10}px, ${-local * (0.35 + i * 0.04)}px, 0)`;
  });
}
function loop() {
  tx += (mx - tx) * 0.08;
  ty += (my - ty) * 0.08;
  scene();
  if (motionOk) requestAnimationFrame(loop);
}
if (motionOk) {
  window.addEventListener("pointermove", (event) => {
    mx = event.clientX / window.innerWidth - 0.5;
    my = event.clientY / window.innerHeight - 0.5;
    if (glow) {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }
  }, { passive: true });
  loop();
} else scene();
