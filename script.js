/* ============================================================
   SCRIPT PRINCIPAL — PRIME SERVIÇOS DE PINTURA
   Organização do arquivo:
   1. Configuração global
   2. Tema claro / escuro
   3. Menu mobile
   4. Rolagem suave para links internos
   5. Galeria arrastável (drag)
   6. Animações de entrada (scroll reveal)
   7. Barra de progresso de rolagem (rolo de tinta)
   ============================================================ */

/* ===== 1. CONFIGURAÇÃO GLOBAL ===== */

// Referências reutilizadas em várias partes do script,
// evitando repetir document.documentElement/document.body várias vezes.
const root = document.documentElement;
const body = document.body;

// Detecta se o usuário ativou "reduzir movimento" nas configurações
// do sistema operacional. Usado para desativar/simplificar animações
// e melhorar a acessibilidade para quem tem sensibilidade a movimento.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== 2. TEMA CLARO / ESCURO ===== */

const themeToggleBtn = document.querySelector('.theme-toggle');

// Recupera o tema salvo anteriormente pelo usuário (localStorage);
// caso não exista nenhum valor salvo, usa "light" como padrão.
const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Atualiza o atributo no <html>: todo o CSS que depende de
    // [data-theme="dark"] reage automaticamente a essa mudança.
    root.setAttribute('data-theme', newTheme);

    // Persiste a escolha do usuário para a próxima visita.
    localStorage.setItem('theme', newTheme);
  });
}

/* ===== 3. MENU MOBILE ===== */

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    // classList.toggle retorna true/false indicando se a classe
    // ficou ativa após a alternância — útil para sincronizar o
    // estado visual com os atributos de acessibilidade.
    const isOpen = mobileMenu.classList.toggle('open');

    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

    // Bloqueia a rolagem do fundo da página enquanto o menu
    // está aberto, evitando rolagem "dupla" (fundo + menu).
    body.style.overflow = isOpen ? 'hidden' : '';
  });
}

/* ===== 4. ROLAGEM SUAVE PARA LINKS INTERNOS ===== */

// Seleciona todos os links cujo href começa com "#" (âncoras internas,
// como #inicio, #servicos etc.) para interceptar o clique e animar a rolagem.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return; // se o alvo não existir na página, deixa o comportamento padrão

    event.preventDefault(); // cancela o salto instantâneo padrão do navegador

    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth', // respeita a preferência de movimento reduzido
      block: 'start',
    });

    // Fecha o menu mobile automaticamente ao navegar para uma seção.
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  });
});

/* ===== 5. GALERIA ARRASTÁVEL (DRAG) ===== */

const gallery = document.querySelector('.project-track');

if (gallery) {
  let dragActive = false;   // indica se o usuário está arrastando no momento
  let dragStart = 0;        // posição X do ponteiro no início do arraste
  let initialScroll = 0;    // scrollLeft da galeria no início do arraste

  gallery.addEventListener('pointerdown', (event) => {
    dragActive = true;
    dragStart = event.clientX;
    initialScroll = gallery.scrollLeft;

    // setPointerCapture garante que os eventos de movimento continuem
    // sendo recebidos por este elemento mesmo se o ponteiro sair dele.
    gallery.setPointerCapture(event.pointerId);
    gallery.classList.add('is-dragging'); // classe usada em CSS para trocar o cursor, por exemplo
  });

  gallery.addEventListener('pointermove', (event) => {
    if (!dragActive) return;
    // Move a galeria na direção oposta ao deslocamento do ponteiro,
    // simulando o efeito de "arrastar o conteúdo".
    gallery.scrollLeft = initialScroll - (event.clientX - dragStart);
  });

  // Qualquer um destes eventos encerra o arraste (soltar o botão,
  // cancelamento do ponteiro, ou o ponteiro saindo da área).
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => {
    gallery.addEventListener(type, () => {
      dragActive = false;
      gallery.classList.remove('is-dragging');
    });
  });
}

/* ===== 6. ANIMAÇÕES DE ENTRADA (SCROLL REVEAL) ===== */

// IntersectionObserver detecta quando um elemento entra na área visível
// da tela, sem precisar calcular posições manualmente a cada scroll
// (mais performático do que escutar o evento "scroll" diretamente).
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible'); // dispara a transição definida em CSS (.reveal.is-visible)
      observer.unobserve(entry.target);          // anima apenas uma vez por elemento
    });
  },
  { threshold: 0.1 } // considera "visível" quando 10% do elemento aparece na tela
);

// Se o usuário preferir movimento reduzido, os elementos já aparecem
// visíveis de imediato, sem a animação de entrada.
if (!reduceMotion) {
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

/* ===== 7. BARRA DE PROGRESSO DE ROLAGEM (ROLO DE TINTA) ===== */

/**
 * Calcula a porcentagem já rolada da página e atualiza a variável
 * CSS --scroll, usada tanto na largura da barra de progresso quanto
 * na posição horizontal do ícone do rolo de tinta (ver style.css).
 */
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = distance > 0 ? (window.scrollY / distance) * 100 : 0;
  root.style.setProperty('--scroll', `${percentage}%`);
}

// passive: true informa ao navegador que este listener não chama
// preventDefault(), permitindo otimizações de performance na rolagem.
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

// Ao terminar o carregamento total da página (imagens incluídas),
// esconde a tela de loading (classe is-loaded, ver style.css)
// e calcula o progresso inicial da rolagem.
window.addEventListener('load', () => {
  body.classList.add('is-loaded');
  updateProgress();
});
