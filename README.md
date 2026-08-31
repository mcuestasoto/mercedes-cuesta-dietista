# Mercedes Cuesta · Dietista online

Landing page profesional para una dietista online, en producción: **https://mercedes-cuesta-dietista.vercel.app**

Proyecto real para un cliente, construido con HTML, CSS y JavaScript **sin frameworks ni paso de build**, como ejercicio deliberado de ir directo a la plataforma web y cuidar el detalle en rendimiento, accesibilidad y SEO sin la capa de abstracción de una librería.

![CI](https://github.com/mcuestasoto/mercedes-cuesta-dietista/actions/workflows/ci.yml/badge.svg)

## Puntos destacados

- **Accesibilidad real, no solo etiquetas.** Navegación completa por teclado, `focus-visible` propio, `aria-expanded`/`aria-controls` en acordeón y menú móvil, `aria-live` en el carrusel, skip link funcional, contraste AA verificado en cada combinación de color (documentado en comentarios junto a cada token en `styles/main.css`).
- **Rendimiento medido, no asumido.** Imagen del Hero servida en AVIF/WebP/JPEG con `srcset`/`sizes` y `fetchpriority`, tipografía autoalojada en WOFF2 (cero peticiones a Google Fonts), y CLS controlado por debajo de 0.07 comprobado con `PerformanceObserver`.
- **Interacciones a mano, sin librería de UI.** Carrusel de testimonios con scroll nativo + `scroll-snap`, animación propia por `requestAnimationFrame` con `easeOutCubic` para los botones de flecha (evitando el conflicto entre `scroll-snap-type` y una animación manual de `scrollLeft`), acordeón de FAQ y menú móvil sin dependencias, todo respetando `prefers-reduced-motion`.
- **SEO y metadata cuidados de verdad.** JSON-LD (`WebSite`, `Person`, `FAQPage`) sincronizado con el contenido visible, Open Graph y Twitter Card completos, `canonical` por página, sitemap y `robots.txt`.
- **Seguridad a nivel de cabeceras.** CSP con hash SHA-256 para el único script inline permitido, HSTS, `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy` configurados en `vercel.json`.
- **Arquitectura sin build**, pero no sin estructura: header, footer y el enlace "volver al inicio" viven una sola vez en `partials/` y se inyectan por `fetch()` en cada página (`scripts/include.js`), evitando duplicar HTML entre la Home, las páginas legales y el 404.

## Stack

HTML5 semántico, CSS moderno (custom properties, `grid`, `color-mix()`, `clip-path`) y JavaScript vanilla (ES2022, sin `build step`). Sin React/Vue, sin bundler, sin dependencias en producción — una decisión consciente para un sitio de este tamaño, no una limitación.

Como herramientas de desarrollo sí se usan **ESLint**, **Stylelint** y **html-validate**, con su propio workflow de CI en GitHub Actions (ver badge arriba).

## Estructura

```txt
mercedes-cuesta-dietista/
├── index.html
├── 404.html
├── styles/
│   └── main.css
├── scripts/
│   ├── include.js      # carga header/footer/back-to-home compartidos
│   └── main.js
├── partials/
│   ├── header.html
│   ├── footer.html
│   └── back-to-home.html
├── assets/
│   ├── images/          # AVIF/WebP/JPEG responsive
│   ├── fonts/            # Montserrat autoalojada (WOFF2)
│   └── logo/
├── pages/
│   ├── aviso-legal.html
│   ├── privacidad.html
│   └── cookies.html
├── .github/workflows/ci.yml
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json           # cabeceras de seguridad (CSP, HSTS...)
└── package.json          # solo devDependencies: eslint, stylelint, html-validate
```

## Desarrollo local

```sh
npm install        # instala eslint, stylelint y html-validate (solo dev)
npm run lint        # corre los tres linters
npm run serve       # sirve el proyecto en http://localhost:8000
```

El proyecto usa `fetch()` para cargar header/footer, así que hace falta servirlo con un servidor estático — abrir `index.html` directamente con `file://` no cargará esas partes.

## Notas del proyecto

- Web estática sin formularios, sin analítica y sin pasarela de pago; el contacto se resuelve por WhatsApp/email/Instagram.
- No usa cookies propias; el detalle está en [`pages/cookies.html`](pages/cookies.html).

## Sobre el código y el contenido

Este repositorio se comparte con fines de portfolio, para mostrar cómo se aborda un proyecto frontend real de principio a fin. El diseño, los textos y las imágenes pertenecen a la titular del negocio (Mercedes Cuesta); no está autorizada su reutilización fuera de este contexto.
