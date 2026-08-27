/* Header/Footer are loaded asynchronously by include.js; wait for them
   before querying anything that lives inside those partials. */
(window.partialsReady || Promise.resolve()).then(() => {

/* Header height, kept in sync so sticky-scroll offsets stay accurate on wrap */
const header = document.querySelector('[data-header]');
const syncHeaderHeight = () => {
  if (!header) return;
  document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
};
syncHeaderHeight();
window.addEventListener('resize', syncHeaderHeight);
if ('ResizeObserver' in window && header) {
  new ResizeObserver(syncHeaderHeight).observe(header);
}

/* Mobile menu */
const toggle = document.querySelector('[data-nav-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const allNavLinks = document.querySelectorAll('[data-nav-link]');

const openMenu = () => {
  if (!toggle || !mobileMenu) return;
  mobileMenu.classList.add('is-open');
  toggle.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Cerrar menú');
};

const closeMenu = () => {
  if (!toggle || !mobileMenu) return;
  mobileMenu.classList.remove('is-open');
  toggle.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menú');
};

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('is-open')) closeMenu();
    else openMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!mobileMenu.classList.contains('is-open')) return;
    if (mobileMenu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });
}

allNavLinks.forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

/* Active section highlighting */
const spySections = ['como-trabajo', 'programa', 'sobre-mi', 'testimonios', 'preguntas-frecuentes', 'contacto']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (spySections.length) {
  const updateActiveSection = () => {
    const line = window.innerHeight * 0.3;
    let current = '';
    spySections.forEach((section) => {
      if (section.getBoundingClientRect().top <= line) current = section.id;
    });
    allNavLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  updateActiveSection();
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', updateActiveSection);
}

/* FAQ accordion */
document.querySelectorAll('[data-faq-item]').forEach((item) => {
  const question = item.querySelector('[data-faq-question]');
  if (!question) return;
  question.addEventListener('click', () => {
    const isOpen = item.classList.toggle('is-open');
    question.setAttribute('aria-expanded', String(isOpen));
  });
});

/* WhatsApp floating button visibility */
const fab = document.querySelector('[data-whatsapp-fab]');
if (fab) {
  const onScroll = () => {
    fab.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.75);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Copy promo code */
const copyButton = document.querySelector('[data-copy-code]');
if (copyButton) {
  const copyLabel = copyButton.querySelector('[data-copy-label]');
  const defaultLabel = copyLabel ? copyLabel.textContent : '';
  let copyTimeout;

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  };

  copyButton.addEventListener('click', async () => {
    const code = copyButton.getAttribute('data-copy-code');
    try {
      await copyText(code);
    } catch (error) {
      /* clipboard unavailable; label still confirms the code below */
    }
    copyButton.classList.add('is-copied');
    if (copyLabel) copyLabel.textContent = 'Código copiado';
    window.clearTimeout(copyTimeout);
    copyTimeout = window.setTimeout(() => {
      copyButton.classList.remove('is-copied');
      if (copyLabel) copyLabel.textContent = defaultLabel;
    }, 2200);
  });
}

});
