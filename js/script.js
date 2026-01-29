// Carousel
let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
  if (!slides.length) return;
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
  index = (index + 1) % slides.length;
}

if (slides.length) {
  setInterval(showSlide, 5000);
}

// Navegación entre secciones (nav y footer)
const links = document.querySelectorAll("nav a");
const footerLinks = document.querySelectorAll("footer a[href^='#']");
const secciones = document.querySelectorAll("main section");

function anchorClickHandler(e) {
  // permite que el mismo manejador sirva para enlaces del nav y del footer
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('#')) return;
  const id = href.substring(1);

  const target = document.querySelector(`main section#${id}`);
  if (target) {
    secciones.forEach(sec => sec.classList.remove("activo"));
    target.classList.add("activo");
    target.scrollIntoView({ behavior: "smooth" });
  } else {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  // si el menú móvil está abierto, cerrarlo
  if (menuNav && menuNav.classList.contains('active')) {
    menuNav.classList.remove('active');
    if (menuToggle) menuToggle.textContent = '☰';
  }
}

links.forEach(link => link.addEventListener('click', anchorClickHandler));
footerLinks.forEach(link => link.addEventListener('click', anchorClickHandler));

// --- MODO OSCURO / CLARO ---
const modoToggle = document.getElementById("modoToggle");
const body = document.body;

if (modoToggle) {
  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "oscuro") {
    body.classList.add("dark-mode");
    modoToggle.textContent = "☀️";
  } else {
    body.classList.remove("dark-mode");
    modoToggle.textContent = "🌙";
  }

  modoToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const esOscuro = body.classList.contains("dark-mode");
    modoToggle.textContent = esOscuro ? "☀️" : "🌙";
    localStorage.setItem("modo", esOscuro ? "oscuro" : "claro");
  });
} else {
  console.warn("Botón de modo (modoToggle) no encontrado en el DOM.");
}

// --- MENÚ HAMBURGUESA ---
const menuToggle = document.getElementById("menuToggle");
const menuNav = document.getElementById("menuNav");

if (menuToggle && menuNav) {
  menuToggle.addEventListener("click", () => {
    menuNav.classList.toggle("active");
    menuToggle.textContent = menuNav.classList.contains("active") ? "✖" : "☰";
  });

  menuNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuNav.classList.remove("active");
      menuToggle.textContent = "☰";
    });
  });
}