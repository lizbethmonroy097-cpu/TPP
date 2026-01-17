let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
  index = (index + 1) % slides.length;
}

setInterval(showSlide, 5000);

const links = document.querySelectorAll("nav a");
const secciones = document.querySelectorAll("main section");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // evita que se mueva la página
    const id = link.getAttribute("href").substring(1);

    secciones.forEach(sec => sec.classList.remove("activo"));
    document.getElementById(id).classList.add("activo");
  });
});
// --- MODO OSCURO / CLARO ---
const modoToggle = document.getElementById("modoToggle");
const body = document.body;

// Cargar preferencia guardada
if (localStorage.getItem("modo") === "oscuro") {
  body.classList.add("dark-mode");
  modoToggle.textContent = "☀️";
}

// Cambiar modo al hacer clic
modoToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const esOscuro = body.classList.contains("dark-mode");
  modoToggle.textContent = esOscuro ? "☀️" : "🌙";
  localStorage.setItem("modo", esOscuro ? "oscuro" : "claro");
});
// --- MENÚ HAMBURGUESA ---
const menuToggle = document.getElementById("menuToggle");
const menuNav = document.getElementById("menuNav");

menuToggle.addEventListener("click", () => {
  menuNav.classList.toggle("active");

  // Cambiar el icono ☰ ↔ ✖
  if (menuNav.classList.contains("active")) {
    menuToggle.textContent = "✖";
  } else {
    menuToggle.textContent = "☰";
  }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    menuNav.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});
