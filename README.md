# Mercedes Cuesta · Web profesional

Sitio web profesional en producción para mi actividad como dietista online, desarrollado con HTML, CSS y JavaScript.

🌐 **Demo:** https://mercedes-cuesta-dietista.vercel.app

[![Preview de la web profesional de Mercedes Cuesta](assets/images/og-image.png)](https://mercedes-cuesta-dietista.vercel.app)

![CI](https://github.com/mcuestasoto/mercedes-cuesta-dietista/actions/workflows/ci.yml/badge.svg)

## Sobre el proyecto

Proyecto frontend real desarrollado sin frameworks ni paso de build, con foco en una implementación ligera, accesible y fácil de mantener.

La web incluye navegación responsive, componentes interactivos, páginas legales, SEO técnico, optimización de recursos y despliegue en Vercel.

## Aspectos técnicos destacados

- **Accesibilidad:** HTML semántico, navegación por teclado, estados `focus-visible`, skip link, soporte de `prefers-reduced-motion` y atributos ARIA en los componentes interactivos.
- **Responsive:** layouts adaptados a distintos tamaños de pantalla e imágenes responsive mediante `srcset` y `sizes`.
- **Rendimiento:** imágenes en AVIF, WebP y JPEG, tipografía WOFF2 autoalojada y carga optimizada de recursos.
- **SEO:** metadatos Open Graph y Twitter Card, datos estructurados JSON-LD, canonical, sitemap y `robots.txt`.
- **Seguridad:** Content Security Policy, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y otras cabeceras configuradas en Vercel.
- **Arquitectura:** partials compartidos para header, footer y navegación auxiliar, cargados mediante JavaScript para evitar duplicación entre páginas.
- **Calidad de código:** ESLint, Stylelint y html-validate integrados en GitHub Actions.

## Stack

- HTML5
- CSS3
- JavaScript
- Vercel
- GitHub Actions

Sin frameworks ni dependencias de producción.

## Estructura

```txt
mercedes-cuesta-dietista/
├── index.html
├── 404.html
├── styles/
│   └── main.css
├── scripts/
│   ├── include.js
│   └── main.js
├── partials/
│   ├── header.html
│   ├── footer.html
│   └── back-to-home.html
├── assets/
│   ├── images/
│   ├── fonts/
│   └── logo/
├── pages/
│   ├── aviso-legal.html
│   ├── privacidad.html
│   └── cookies.html
├── .github/workflows/ci.yml
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
└── package.json
```

## Desarrollo local

```sh
npm install
npm run lint
npm run serve
```

El proyecto utiliza `fetch()` para cargar elementos compartidos, por lo que debe servirse mediante un servidor local en lugar de abrir `index.html` directamente con `file://`.

## Sobre el contenido

El repositorio se publica como proyecto de portfolio para mostrar el desarrollo técnico de una web profesional en producción.

El diseño, los textos y las imágenes pertenecen a Mercedes Cuesta y no están autorizados para su reutilización fuera de este contexto.
