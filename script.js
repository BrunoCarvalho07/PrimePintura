/* ===== CONFIGURAÇÃO GLOBAL ===== */
const root = document.documentElement;
const body = document.body;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== TEMA CLARO / ESCURO ===== */
const themeToggleBtn = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* ===== MENU MOBILE ===== */
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    body.style.overflow = isOpen ? 'hidden' : '';
  });
}

/* ===== ROLAGEM SUAVE PARA LINKS INTERNOS ===== */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  });
});

/* ===== GALERIA ARRASTÁVEL ===== */
const gallery = document.querySelector('.project-track');
if (gallery) {
  let dragActive = false;
  let dragStart = 0;
  let initialScroll = 0;

  gallery.addEventListener('pointerdown', (event) => {
    dragActive = true;
    dragStart = event.clientX;
    initialScroll = gallery.scrollLeft;
    gallery.setPointerCapture(event.pointerId);
    gallery.classList.add('is-dragging');
  });
  gallery.addEventListener('pointermove', (event) => {
    if (!dragActive) return;
    gallery.scrollLeft = initialScroll - (event.clientX - dragStart);
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => gallery.addEventListener(type, () => {
    dragActive = false;
    gallery.classList.remove('is-dragging');
  }));
}

/* ===== ANIMAÇÕES DE ENTRADA ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: .1 });

if (!reduceMotion) document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
else document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));

/* ===== PROGRESSO DE LEITURA COM ROLO DE TINTA ===== */
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = distance > 0 ? (window.scrollY / distance) * 100 : 0;
  root.style.setProperty('--scroll', `${percentage}%`);
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
window.addEventListener('load', () => { body.classList.add('is-loaded'); updateProgress(); });