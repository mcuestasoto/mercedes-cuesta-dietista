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

/* Testimonial carousel: scroll nativo + scroll-snap, sin autoplay. El
   swipe/arrastre lo da gratis el navegador; los botones solo mueven
   un slide. El estado (texto y disabled) se recalcula también cuando
   el usuario hace scroll a mano, no solo al pulsar un botón. */
const carouselViewport = document.querySelector('[data-carousel-viewport]');
const carouselTrack = document.querySelector('[data-carousel-track]');
if (carouselViewport && carouselTrack) {
  const slides = Array.from(carouselTrack.children);
  const prevButton = document.querySelector('[data-carousel-prev]');
  const nextButton = document.querySelector('[data-carousel-next]');
  const status = document.querySelector('[data-carousel-status]');

  const step = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(carouselTrack).gap) || 0;
    return slideWidth + gap;
  };

  const update = () => {
    const index = Math.min(slides.length - 1, Math.max(0, Math.round(carouselViewport.scrollLeft / step())));
    if (status) status.textContent = `Testimonio ${index + 1} de ${slides.length}`;
    if (prevButton) prevButton.disabled = carouselViewport.scrollLeft <= 1;
    if (nextButton) {
      const maxScroll = carouselViewport.scrollWidth - carouselViewport.clientWidth;
      nextButton.disabled = carouselViewport.scrollLeft >= maxScroll - 1;
    }
  };

  const goTo = (direction) => carouselViewport.scrollBy({ left: direction * step(), behavior: 'smooth' });

  if (prevButton) prevButton.addEventListener('click', () => goTo(-1));
  if (nextButton) nextButton.addEventListener('click', () => goTo(1));

  let scrollTimeout;
  carouselViewport.addEventListener('scroll', () => {
    window.clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(update, 120);
  }, { passive: true });

  window.addEventListener('resize', update);
  update();
}

/* WhatsApp floating button visibility: nunca en páginas legales/404
   (ya usan el mismo main.js, así que se detectan por su <main
   class="legal-main"> compartido, en vez de duplicar lógica por
   página). En la Home, aparece cuando el CTA del hero deja de verse y
   se oculta de nuevo al llegar a Contacto — y se queda oculto el
   resto de la página (footer incluido), no solo mientras Contacto
   está en pantalla. Basado en IntersectionObserver, no en un scroll
   fijo, para que el punto de aparición/ocultación se adapte a
   cualquier alto de sección. */
const fab = document.querySelector('[data-whatsapp-fab]');
const heroCta = document.querySelector('.hero__actions [data-whatsapp-link]');
const contactoSection = document.getElementById('contacto');

if (fab && !document.querySelector('.legal-main') && heroCta && contactoSection && 'IntersectionObserver' in window) {
  let heroVisible = true;
  let pastContacto = false;

  const render = () => {
    fab.classList.toggle('is-visible', !heroVisible && !pastContacto);
  };

  new IntersectionObserver((entries) => {
    heroVisible = entries[0].isIntersecting;
    render();
  }).observe(heroCta);

  new IntersectionObserver((entries) => {
    const entry = entries[0];
    pastContacto = entry.isIntersecting || entry.boundingClientRect.top < 0;
    render();
  }, { rootMargin: '0px 0px -40% 0px' }).observe(contactoSection);
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
