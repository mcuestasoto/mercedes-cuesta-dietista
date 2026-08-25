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
const mobileClose = document.querySelector('[data-mobile-close]');
const allNavLinks = document.querySelectorAll('[data-nav-link]');

const openMenu = () => {
  if (!toggle || !mobileMenu) return;
  mobileMenu.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Cerrar menú');
};

const closeMenu = () => {
  if (!toggle || !mobileMenu) return;
  mobileMenu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menú');
};

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('is-open')) closeMenu();
    else openMenu();
  });
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

allNavLinks.forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

/* Active section highlighting */
const spySections = ['sobre-mi', 'como-trabajo', 'programa', 'testimonios', 'faq', 'contacto']
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

/* Testimonial carousel */
const viewport = document.querySelector('[data-carousel-viewport]');
const track = document.querySelector('[data-carousel-track]');
if (viewport && track) {
  const cards = Array.from(track.children);
  const dotsContainer = document.querySelector('[data-carousel-dots]');
  const prevButton = document.querySelector('[data-carousel-prev]');
  const nextButton = document.querySelector('[data-carousel-next]');
  const gap = 16;
  let slide = 0;
  let visible = 1;
  let maxSlide = 0;

  const measure = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    if (!cardWidth) return;
    visible = Math.max(1, Math.round((viewport.clientWidth + gap) / (cardWidth + gap)));
    maxSlide = Math.max(0, cards.length - visible);
    slide = Math.min(slide, maxSlide);
    render();
  };

  const buildDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxSlide; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ver opinión ${i + 1}`);
      dot.innerHTML = '<span></span>';
      dot.addEventListener('click', () => {
        slide = i;
        render();
      });
      dotsContainer.appendChild(dot);
    }
  };

  let lastMaxSlide = -1;
  const render = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slide * (cardWidth + gap)}px)`;
    if (maxSlide !== lastMaxSlide) {
      buildDots();
      lastMaxSlide = maxSlide;
    }
    if (dotsContainer) {
      Array.from(dotsContainer.children).forEach((dot, i) => {
        const isCurrent = i === slide;
        dot.classList.toggle('is-current', isCurrent);
        dot.setAttribute('aria-current', isCurrent ? 'true' : 'false');
      });
    }
    if (prevButton) prevButton.disabled = slide === 0;
    if (nextButton) nextButton.disabled = slide >= maxSlide;
  };

  const goTo = (index) => {
    slide = Math.max(0, Math.min(maxSlide, index));
    render();
  };

  if (prevButton) prevButton.addEventListener('click', () => goTo(slide - 1));
  if (nextButton) nextButton.addEventListener('click', () => goTo(slide + 1));

  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(slide + 1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(slide - 1); }
  });

  let touchStartX = null;
  viewport.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });
  viewport.addEventListener('touchend', (event) => {
    if (touchStartX == null) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (dx < -24) goTo(slide + 1);
    else if (dx > 24) goTo(slide - 1);
  });

  /* One trackpad swipe = one card. Ignores the inertia tail of wheel
     events after a swipe instead of using a fixed delay. */
  let wheelLastAx = null;
  let wheelLastAt = 0;
  let wheelPeakAx = 0;
  let wheelFired = false;
  let wheelFiredAt = 0;
  viewport.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.2) return;
    event.preventDefault();
    const now = Date.now();
    const ax = Math.abs(event.deltaX);
    if (ax < 2) { wheelLastAx = ax; wheelLastAt = now; return; }
    if (now - wheelLastAt > 100) { wheelFired = false; wheelPeakAx = 0; }
    wheelPeakAx = Math.max(wheelPeakAx, ax);
    const decayed = ax < wheelPeakAx * 0.35;
    const reaccelerated = wheelLastAx != null && ax > wheelLastAx * 1.8 + 3;
    if (!wheelFired || (decayed && reaccelerated && now - wheelFiredAt > 250)) {
      wheelFired = true;
      wheelFiredAt = now;
      wheelPeakAx = ax;
      if (event.deltaX > 0) goTo(slide + 1); else goTo(slide - 1);
    }
    wheelLastAx = ax;
    wheelLastAt = now;
  }, { passive: false });

  measure();
  window.addEventListener('resize', measure);
}
