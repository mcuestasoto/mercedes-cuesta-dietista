# Mercedes Cuesta · Dietista online

Landing web personal para Mercedes Cuesta, Dietista online.

**Demo:** https://mercedes-cuesta-dietista.vercel.app

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
│   ├── images/
│   ├── fonts/
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

Header y footer viven una sola vez en `partials/` y se inyectan en cada página vía `data-include` + `scripts/include.js`, en vez de duplicarse por archivo.

## Secciones (Home)

- Inicio
- Cómo trabajo
- Programa
- Sobre mí (incluye Formación)
- Opiniones
- Preguntas frecuentes
- Contacto (incluye colaboración con FullGas)

## Tecnologías

HTML, CSS y JavaScript sin dependencias ni paso de build. Tipografía Montserrat alojada localmente (sin Google Fonts). Desplegado en Vercel.

## Desarrollo local

No requiere instalación. Al usar `fetch()` para cargar los partials, hace falta servir la carpeta con un servidor estático (abrir `index.html` directamente con `file://` no cargará el header/footer):

```sh
python3 -m http.server 8000
```

## Notas

- Web estática sin formularios, sin analítica y sin pasarela de pago.
- No usa cookies propias; las excepciones (proveedor de alojamiento) están detalladas en [`pages/cookies.html`](pages/cookies.html).
- Cabeceras de seguridad (CSP, HSTS, etc.) configuradas en `vercel.json`.

## Licencia

Todos los derechos reservados. El contenido, las imágenes y el código de este sitio pertenecen a su titular; no está autorizada su reproducción, distribución o modificación sin permiso expreso (ver [`pages/aviso-legal.html`](pages/aviso-legal.html)).
