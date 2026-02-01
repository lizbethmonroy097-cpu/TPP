// Carousel (accesible)
let index = 0;
const slides = document.querySelectorAll(".slide");
const carousel = document.querySelector('.carousel');
const carouselToggle = document.getElementById('carouselToggle');
let carouselInterval = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showSlide() {
  if (!slides.length) return;
  slides.forEach((slide, i) => {
    const isActive = i === index;
    slide.classList.toggle('active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
    // marcar el caption para ser anunciado por lectores de pantalla
    const caption = slide.querySelector('.caption');
    if (caption) caption.setAttribute('aria-hidden', String(!isActive));
  });
}

function nextSlide() {
  if (!slides.length) return;
  index = (index + 1) % slides.length;
  showSlide();
}

function startCarousel() {
  if (prefersReducedMotion) return; // no autoplay cuando usuario pide reducir movimiento
  stopCarousel();
  carouselInterval = setInterval(nextSlide, 5000);
  if (carouselToggle) {
    carouselToggle.textContent = 'Pausa';
    carouselToggle.setAttribute('aria-pressed', 'false');
  }
}

function stopCarousel() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

function pauseCarousel() {
  stopCarousel();
  if (carouselToggle) {
    carouselToggle.textContent = 'Reanudar';
    carouselToggle.setAttribute('aria-pressed', 'true');
  }
}

function resumeCarousel() {
  if (!prefersReducedMotion) startCarousel();
}

// Inicializar estado
showSlide();
if (!prefersReducedMotion) startCarousel();

// pausa al interactuar con el carrusel (hover / focus)
if (carousel) {
  carousel.addEventListener('mouseenter', pauseCarousel);
  carousel.addEventListener('mouseleave', resumeCarousel);
  carousel.addEventListener('focusin', pauseCarousel);
  carousel.addEventListener('focusout', resumeCarousel);
}

if (carouselToggle) {
  carouselToggle.addEventListener('click', () => {
    const pressed = carouselToggle.getAttribute('aria-pressed') === 'true';
    if (pressed) resumeCarousel(); else pauseCarousel();
  });
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
    // mover foco al contenido para usuarios de teclado/lectores
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
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
    const isActive = menuNav.classList.toggle("active");
    menuToggle.textContent = isActive ? "✖" : "☰";
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  menuNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuNav.classList.remove("active");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}