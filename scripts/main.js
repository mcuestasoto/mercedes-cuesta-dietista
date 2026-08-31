/* Header/Footer are loaded asynchronously by include.js; wait for them
   before querying anything that lives inside those partials. */
(window.partialsReady || Promise.resolve()).then(() => {

/* Fuente única para el enlace de WhatsApp: header, hero, flotante,
   Contacto y footer generaban la misma URL por separado en el HTML,
   con riesgo de que alguna copia se desincronizase (mensaje distinto,
   emoji mal codificado...). Aquí se construye una sola vez y se aplica
   a todos los [data-whatsapp-link], sea cual sea su href estático. */
const WHATSAPP_PHONE = '34614821010';
const WHATSAPP_MESSAGE = 'Hola Mercedes 🙂 he visto tu web y me gustaría empezar';
const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.querySelectorAll('[data-whatsapp-link]').forEach((el) => el.setAttribute('href', WHATSAPP_URL));

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
      const isActive = link.getAttribute('href') === `/#${current}`;
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
  const progress = document.querySelector('[data-carousel-progress]');

  const step = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(carouselTrack).gap) || 0;
    return slideWidth + gap;
  };

  /* Mismos breakpoints que .testimonial-carousel__slide en main.css
     (1/2/3 visibles): de ahi sale cuantas "posiciones" reales tiene el
     carrusel (total - visibles + 1), no el numero de testimonios. */
  const mqTablet = window.matchMedia('(min-width: 701px)');
  const mqDesktop = window.matchMedia('(min-width: 1025px)');
  const visibleItems = () => (mqDesktop.matches ? 3 : mqTablet.matches ? 2 : 1);
  const positionCount = () => Math.max(1, slides.length - visibleItems() + 1);

  let lines = [];
  let builtFor = 0;
  const buildProgress = () => {
    if (!progress) return;
    const count = positionCount();
    if (count === builtFor) return;
    builtFor = count;
    progress.innerHTML = '';
    lines = Array.from({ length: count }, () => {
      const span = document.createElement('span');
      progress.appendChild(span);
      return span;
    });
  };

  const currentIndex = () => Math.min(positionCount() - 1, Math.max(0, Math.round(carouselViewport.scrollLeft / step())));

  /* Pinta tarjeta, líneas y botones a la vez a partir de un índice ya
     decidido: al pulsar una flecha no esperamos a que el scroll
     termine para saber qué línea activar, así se siente como una
     única interacción en vez de "la card llega y luego cambia la
     línea". El listener de scroll de más abajo llama a esto mismo
     para mantenerlo sincronizado también con el swipe manual. */
  const renderState = (index) => {
    buildProgress();
    if (status) status.textContent = `Testimonio ${index + 1} de ${slides.length}`;
    lines.forEach((line, i) => line.classList.toggle('is-active', i === index));
    if (prevButton) prevButton.disabled = index <= 0;
    if (nextButton) nextButton.disabled = index >= positionCount() - 1;
  };

  const update = () => renderState(currentIndex());

  /* Duración/easing propios en vez de scrollBy(behavior:"smooth")
     (cuya duración real varía por navegador y no se deja fijar):
     así el desplazamiento dura siempre lo mismo que se tarda en
     encender la línea siguiente, sin overshoot ni rebote. */
  const CAROUSEL_DURATION = 220;
  let scrollFrame = null;
  const animateScrollTo = (targetLeft) => {
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    const startLeft = carouselViewport.scrollLeft;
    const delta = targetLeft - startLeft;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || Math.abs(delta) < 1) {
      carouselViewport.scrollLeft = targetLeft;
      return;
    }
    /* scroll-snap-type:mandatory (necesario para el swipe táctil) pelea
       con ir moviendo scrollLeft a mano: el navegador reencaja de golpe
       al punto de snap más cercano en cada frame, y la animación se ve
       como un salto instantáneo en vez de un desplazamiento. Se
       desactiva solo mientras dura esta animación propia y se
       restaura al terminar, que es cuando ya estamos exactamente sobre
       un punto de snap de todas formas. */
    carouselViewport.style.scrollSnapType = 'none';
    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / CAROUSEL_DURATION);
      carouselViewport.scrollLeft = startLeft + delta * easeOutCubic(t);
      if (t < 1) {
        scrollFrame = requestAnimationFrame(tick);
      } else {
        scrollFrame = null;
        carouselViewport.style.scrollSnapType = '';
      }
    };
    scrollFrame = requestAnimationFrame(tick);
  };

  const goTo = (direction) => {
    const target = Math.min(positionCount() - 1, Math.max(0, currentIndex() + direction));
    renderState(target);
    animateScrollTo(target * step());
  };

  if (prevButton) prevButton.addEventListener('click', () => goTo(-1));
  if (nextButton) nextButton.addEventListener('click', () => goTo(1));

  /* rAF en vez de debounce: al deslizar con el dedo, un debounce solo
     actualiza la línea cuando el scroll se detiene del todo (incluida
     la inercia nativa), lo que se siente con retraso. Aquí la línea
     seguía la posición real fotograma a fotograma mientras se arrastra. */
  let scrollUpdateFrame = null;
  carouselViewport.addEventListener('scroll', () => {
    if (scrollUpdateFrame) return;
    scrollUpdateFrame = requestAnimationFrame(() => {
      scrollUpdateFrame = null;
      update();
    });
  }, { passive: true });

  window.addEventListener('resize', update);
  update();
}

/* WhatsApp floating button visibility: nunca en páginas legales/404
   (ya usan el mismo main.js, así que se detectan por su <main
   class="legal-main"> compartido, en vez de duplicar lógica por
   página). En la Home: oculto mientras el CTA del hero está visible;
   visible en el resto, incluida Contacto (que tiene su propio "Quiero
   empezar", pero eso no debe apagar el flotante); oculto de nuevo en
   cuanto el footer entra en el viewport.

   Contacto es más corto que la mayoría de pantallas, así que en
   muchas resoluciones de escritorio el footer ya asoma por debajo
   mientras Contacto sigue siendo el contenido principal en pantalla
   — si solo mirásemos "¿el footer intersecta?" el flotante se
   apagaría antes de tiempo. Por eso se observan los tres puntos
   (hero, Contacto y footer): mientras Contacto siga total o
   parcialmente visible, el footer asomando no cuenta todavía. */
const fab = document.querySelector('[data-whatsapp-fab]');
const heroCta = document.querySelector('.hero__actions [data-whatsapp-link]');
const contactoEl = document.getElementById('contacto');
const footerEl = document.querySelector('.footer');

if (fab && !document.querySelector('.legal-main') && heroCta && contactoEl && footerEl && 'IntersectionObserver' in window) {
  let heroVisible = true;
  let contactoVisible = false;
  let footerVisible = false;

  const render = () => {
    const shouldShow = !heroVisible && (contactoVisible || !footerVisible);
    fab.classList.toggle('is-visible', shouldShow);
  };

  new IntersectionObserver((entries) => {
    heroVisible = entries[0].isIntersecting;
    render();
  }).observe(heroCta);

  new IntersectionObserver((entries) => {
    const entry = entries[0];
    /* No basta con "intersecta": en páginas altas, el final de
       Contacto queda a la vista junto al footer entero (footer más
       corto que la pantalla), y eso no debe contarse como "seguimos
       en Contacto" — solo cuenta si su borde superior sigue cerca de
       la parte de arriba de la pantalla. */
    contactoVisible = entry.isIntersecting && entry.boundingClientRect.top > -(window.innerHeight * 0.15);
    render();
  }).observe(contactoEl);

  new IntersectionObserver((entries) => {
    footerVisible = entries[0].isIntersecting;
    render();
  }).observe(footerEl);
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
    } catch {
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
