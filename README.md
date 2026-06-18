# Mercedes Cuesta | Dietista

Landing personal de Mercedes Cuesta para presentar su perfil como dietista online, explicar su enfoque de trabajo y facilitar el contacto desde una web estática, rápida, clara y responsive.

## Objetivo

Comunicar de forma sencilla el trabajo en alimentación, hábitos, composición corporal y rendimiento, y facilitar el contacto por WhatsApp, Instagram o email.

La web está pensada como página principal para compartir en Instagram y otros perfiles públicos. No incluye reservas, pagos, formularios propios, analítica ni campañas publicitarias.

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

## Archivos incluidos

El proyecto mantiene solo los archivos necesarios para producción:

- `index.html`: página principal.
- `styles/main.css`: estilos de la web.
- `scripts/main.js`: menú móvil, animaciones suaves, enlace de WhatsApp y copiado del código FullGas.
- `assets/images/mercedes-hero.*`: imagen principal del hero.
- `assets/images/mercedes-ipad.*`: imagen de apoyo en “Cómo trabajo”.
- `assets/images/og-image.png`: imagen para compartir la web en WhatsApp, redes y enlaces.
- `assets/logo/*`: favicon, iconos del manifest y monograma MC del header.
- `pages/*`: páginas legales.
- `robots.txt` y `sitemap.xml`: archivos técnicos básicos para rastreo.
- `site.webmanifest`: iconos y datos mínimos para navegador/móvil.
- `vercel.json`: cabeceras de seguridad.

No incluye `node_modules`, dependencias, build tools, formularios, bases de datos, analítica, píxeles publicitarios ni scripts de terceros.

## Metadatos básicos

La web mantiene metadatos básicos para que se vea correctamente al compartir el enlace:

- Título: `Mercedes Cuesta | Dietista`.
- Descripción para enlaces: `Alimentación, hábitos, composición corporal y rendimiento ✨`.
- Open Graph y Twitter Card.
- Canonical de la URL de Vercel.
- Datos estructurados mínimos de marca personal y servicio.

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

La web es estática y no recoge datos mediante formularios propios. No utiliza Google Analytics, Meta Pixel, cookies analíticas ni cookies publicitarias.

Los enlaces externos a WhatsApp, Instagram, email y FullGas abren servicios de terceros con sus propias políticas.

Las cabeceras de seguridad están configuradas en `vercel.json`:

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

## WhatsApp

Los enlaces de WhatsApp usan un mensaje predefinido generado con JavaScript y `encodeURIComponent()`. Se utiliza `https://api.whatsapp.com/send` con el teléfono y el texto codificado para conservar mejor caracteres especiales y emojis tanto en móvil como en escritorio.

## Deploy

Proyecto desplegable en Vercel desde GitHub.


## Ajustes visuales

- Header con monograma MC en el color principal de marca.
- Menú ligeramente más alto para dar más aire al logo.


## Ajustes finales de interacción

- Menú móvil desplegable desde la parte superior derecha, con cierre al pulsar fuera o al seleccionar una sección.
- Mensaje de “Código copiado” con aparición y desaparición suave.
- Textos principales justificados para una lectura más editorial.
- Claim del hero ajustado para mantenerse en una línea en móvil.

## Últimos ajustes de diseño

- Header con monograma MC como único elemento de marca a la izquierda.
- Logo MC en color texto principal para mejorar contraste sobre fondo crema.
- Menú móvil desplegable superior y ligero.
