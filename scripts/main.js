const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-nav-toggle]');
const menu = document.querySelector('[data-nav-menu]');
const navLinks = document.querySelectorAll('[data-nav-link]');
const sections = document.querySelectorAll('[data-section]');
const revealItems = document.querySelectorAll('.reveal');
const whatsappLinks = document.querySelectorAll('[data-whatsapp-link]');
const sectionIndicator = document.querySelector('[data-section-indicator]');

const whatsappEmoji = {
  avocado: String.fromCodePoint(0x1f951),
  sparkle: String.fromCodePoint(0x2728),
  whiteHeart: String.fromCodePoint(0x1f90d),
};

const whatsappMessage = `Hola Mercedes ${whatsappEmoji.avocado}${whatsappEmoji.sparkle} Vengo de tu web y quería más info. Gracias ${whatsappEmoji.whiteHeart}`;
const whatsappUrl = `https://wa.me/34614821010?text=${encodeURIComponent(whatsappMessage)}`;
const indicatorOffset = 140;

const updateIndicatorVisibility = () => {
  if (!sectionIndicator) return;
  const isMobile = window.matchMedia('(max-width: 680px)').matches;
  sectionIndicator.classList.toggle('is-visible', isMobile && window.scrollY > indicatorOffset);
};

const updateSectionIndicator = (section) => {
  if (!sectionIndicator || !section) return;
  const label = section.getAttribute('data-section-name') || section.querySelector('h1, h2')?.textContent || 'Inicio';
  sectionIndicator.textContent = label;
};

whatsappLinks.forEach((link) => {
  link.setAttribute('href', whatsappUrl);
});

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

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      const target = href && href.startsWith('#') ? document.querySelector(href) : null;
      if (!target) {
        closeMenu();
        return;
      }

      event.preventDefault();
      closeMenu();

      const headerHeight = header ? header.offsetHeight : 0;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 2);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      history.pushState(null, '', href);
      updateSectionIndicator(target);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const onScroll = () => {
  if (header) {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  updateIndicatorVisibility();
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', updateIndicatorVisibility, { passive: true });

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      updateSectionIndicator(entry.target);
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', isActive);
      });
    });
  }, { rootMargin: '-28% 0px -62% 0px', threshold: 0.01 });

  sections.forEach((section) => activeObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}


const copyCodeButton = document.querySelector('[data-copy-code]');
const copyFeedback = document.querySelector('[data-copy-feedback]');

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
};

if (copyCodeButton) {
  copyCodeButton.addEventListener('click', async () => {
    const code = copyCodeButton.getAttribute('data-copy-code');
    try {
      await copyText(code);
      if (copyFeedback) copyFeedback.textContent = 'Código copiado.';
    } catch (error) {
      if (copyFeedback) copyFeedback.textContent = `Código: ${code}`;
    }
    window.setTimeout(() => {
      if (copyFeedback) copyFeedback.textContent = '';
    }, 2200);
  });
}
