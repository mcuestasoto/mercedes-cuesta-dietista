const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-nav-toggle]');
const menu = document.querySelector('[data-nav-menu]');
const navLinks = document.querySelectorAll('[data-nav-link]');
const sections = document.querySelectorAll('[data-section]');
const revealItems = document.querySelectorAll('.reveal');

const closeMenu = () => {
  if (!toggle || !menu) return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menú');
  menu.classList.remove('is-open');
};

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    menu.classList.toggle('is-open', !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const onScroll = () => {
  if (header) {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', isActive);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });

  sections.forEach((section) => activeObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
