# Mercedes Cuesta | Dietista

Landing personal de Mercedes Cuesta para presentar su perfil como dietista online, explicar su enfoque de trabajo y facilitar el contacto desde una web rápida, clara, responsive, accesible y preparada para indexación en Google.

## Objetivo

Comunicar de forma sencilla el trabajo en alimentación, hábitos, composición corporal y rendimiento, con especial foco SEO en búsquedas de marca y búsquedas locales/intencionales como:

- Mercedes Cuesta dietista
- Mercedes Cuesta dietista online
- dietista online Sevilla
- dietista online Tomares
- alimentación, hábitos, composición corporal y rendimiento
- nutrición deportiva y hábitos sostenibles

## Stack

- HTML5
- CSS3
- JavaScript vanilla
- Deploy en Vercel desde GitHub

## Estructura final

```txt
mercedes-cuesta-dietista/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── mercedes-hero.jpg
│   │   ├── mercedes-hero.webp
│   │   ├── mercedes-ipad.jpg
│   │   ├── mercedes-ipad.webp
│   │   └── og-image.png
│   └── logo/
│       ├── apple-touch-icon.png
│       ├── favicon.ico
│       ├── favicon.png
│       ├── icon-192.png
│       ├── icon-512.png
│       └── mc-mark-brand.png
├── pages/
│   ├── aviso-legal.html
│   ├── privacidad.html
│   └── cookies.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
├── .gitignore
└── README.md
```

## Limpieza de archivos

Incluye la imagen principal del hero, la imagen de apoyo en la sección “Cómo trabajo”, el Open Graph y los iconos/logo necesarios para favicon y manifest.


El proyecto mantiene únicamente los archivos necesarios para producción. Se han eliminado variantes antiguas de logos, imágenes no usadas, versiones alternativas de Open Graph y recursos que no estaban referenciados.

## SEO incluido

- `title` optimizado para búsqueda: `Mercedes Cuesta | Dietista online en Sevilla y Tomares`.
- Open Graph y Twitter Card con el texto deseado para compartir: `Mercedes Cuesta | Dietista` y `Alimentación, hábitos, composición corporal y rendimiento ✨`.
- Meta description orientada a búsqueda local y online.
- Canonical absoluto apuntando a la home.
- `robots.txt` permitiendo rastreo e incluyendo sitemap.
- `sitemap.xml` con la URL indexable principal y `lastmod` actualizado.
- Datos estructurados JSON-LD con `WebSite`, `WebPage`, `Person`, `ProfessionalService` y `BreadcrumbList`.
- Contenido visible con términos relevantes sin keyword stuffing: dietista online, Sevilla, Tomares, España, alimentación, hábitos, composición corporal, rendimiento, nutrición deportiva, educación nutricional y antropometría.
- Páginas legales con `noindex, follow` para que no compitan con la home en resultados.
- Enlace `rel="me"` hacia Instagram para reforzar conexión de marca.

## Accesibilidad y usabilidad

- HTML semántico.
- Un único `h1`.
- Enlaces y botones con nombres accesibles.
- Foco visible para navegación con teclado.
- Contraste cuidado según la paleta de marca.
- Objetivos táctiles amplios en móvil.
- Menú móvil que se cierra al hacer clic fuera o al pulsar Escape.
- Animaciones suaves con soporte para `prefers-reduced-motion`.

## Seguridad y privacidad

La web es estática y no recoge datos mediante formularios propios. No utiliza Google Analytics, Meta Pixel, cookies analíticas ni cookies publicitarias. Los enlaces externos a WhatsApp, Instagram, email y FullGas abren servicios de terceros con sus propias políticas.

Las cabeceras de seguridad están configuradas en `vercel.json`, incluyendo:

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`

La CSP permite los recursos propios de la web y el JSON-LD inline mediante hash SHA-256 actualizado.

## Legal

Incluye páginas independientes de:

- Aviso legal
- Política de privacidad
- Política de cookies

La web no incluye contratación directa, pasarela de pago, precios públicos, formularios propios ni captación directa de datos desde la página. Si en el futuro se añade formulario, analítica, píxeles publicitarios, reserva online o pasarela de pago, habrá que actualizar privacidad, cookies, aviso legal y consentimiento.

## Indexación en Google

Pasos recomendados tras publicar:

1. Publicar la versión final en Vercel.
2. Añadir la URL de la web en la bio de Instagram.
3. Añadir la URL en LinkedIn, GitHub y otros perfiles públicos.
4. Crear y verificar la propiedad en Google Search Console.
5. Enviar el sitemap: `https://mercedes-cuesta-dietista.vercel.app/sitemap.xml`.
6. Usar la herramienta de inspección de URL para solicitar indexación de la home.
7. Comprobar indexación con: `site:mercedes-cuesta-dietista.vercel.app`.

## Deploy

Proyecto desplegable en Vercel desde GitHub.

## Últimos ajustes

- Se ha recuperado la imagen de apoyo en “Cómo trabajo”.
- En móvil, los títulos sticky mantienen un fondo del mismo color que su sección para que no se mezclen visualmente con el contenido al hacer scroll.

## WhatsApp

Los enlaces de WhatsApp usan un mensaje predefinido generado con JavaScript y `encodeURIComponent()` para conservar correctamente caracteres especiales y emojis.
