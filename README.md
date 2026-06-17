# Mercedes Cuesta Dietista

Landing personal para presentar mi perfil como dietista, explicar mi enfoque de trabajo y facilitar el contacto desde una web rápida, responsive y accesible.

## Objetivo

Crear una web clara y cuidada para comunicar mi trabajo en alimentación, composición corporal, rendimiento y hábitos sostenibles, manteniendo una estética coherente con mi marca personal de dietética.

## Stack

- HTML5
- CSS3
- JavaScript vanilla
- Deploy en Vercel

## Características

- Diseño responsive mobile-first.
- Navegación por secciones: Inicio, Sobre mí, Cómo trabajo y Contacto.
- Botón flotante de WhatsApp con mensaje predefinido y emojis generados de forma segura desde JavaScript.
- Enlace a Instagram y email.
- Colaboración FullGas en bloque secundario, con enlace marcado como `rel="sponsored"`.
- Open Graph personalizado para compartir en WhatsApp y redes.
- Metadatos SEO básicos y datos estructurados Schema.org.
- Páginas legales: aviso legal, privacidad y cookies.
- Sin Google Analytics, Meta Pixel, formularios propios ni scripts externos.
- Cabeceras de seguridad configuradas en Vercel.
- Animaciones suaves con soporte para `prefers-reduced-motion`.

## Paleta de marca

- `#FAF7F2` — fondo principal.
- `#A7C0B8` — color principal salvia.
- `#2F2F2D` — texto principal.
- `#EFE4D4` — detalle secundario.
- `#C9825C` — acento puntual.

## Estructura

```txt
mercedes-cuesta-dietista/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
├── assets/
│   ├── images/
│   └── logo/
├── pages/
│   ├── aviso-legal.html
│   ├── privacidad.html
│   └── cookies.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
└── README.md
```

## Accesibilidad y usabilidad

- HTML semántico.
- Un único `h1`.
- Enlaces y botones con nombres accesibles.
- Foco visible para navegación con teclado.
- Contraste cuidado según la paleta de marca.
- Tipografía minimalista basada en fuentes del sistema para mejorar rendimiento y privacidad.
- Objetivos táctiles amplios en móvil.
- Indicador de sección en versión móvil.

## Seguridad y privacidad

La web es estática y no recoge datos mediante formularios propios. No utiliza cookies analíticas ni publicitarias. Los enlaces externos a WhatsApp, Instagram y email abren servicios de terceros con sus propias políticas.

## Deploy

Proyecto desplegado en Vercel desde GitHub.

## Notas de diseño

La web prioriza una estética limpia y cálida: fondo crema, color principal salvia, texto oscuro suave, microinteracciones discretas y una estructura corta pensada para móvil y escritorio.


## WhatsApp

Los enlaces de WhatsApp usan un mensaje predefinido generado con JavaScript y `encodeURIComponent()` para conservar correctamente caracteres especiales y emojis.
