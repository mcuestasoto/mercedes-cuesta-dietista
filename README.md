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

## Secciones

- Inicio
- Sobre mí
- Formación
- Enfoque
- Programa
- Testimonios
- Preguntas frecuentes
- Contacto
- Colaboración FullGas

## Tecnologías

HTML, CSS y JavaScript sin dependencias ni paso de build. Desplegado en Vercel.

## Desarrollo local

No requiere instalación. Basta con abrir `index.html` en el navegador, o servir la carpeta con cualquier servidor estático, por ejemplo:

```sh
python3 -m http.server 8000
```

## Notas

- Web estática sin formularios, sin analítica y sin pasarela de pago.
- No usa cookies propias; las excepciones (proveedor de alojamiento) están detalladas en [`pages/cookies.html`](pages/cookies.html).
- Cabeceras de seguridad (CSP, HSTS, etc.) configuradas en `vercel.json`.

## Licencia

Todos los derechos reservados. El contenido, las imágenes y el código de este sitio pertenecen a su titular; no está autorizada su reproducción, distribución o modificación sin permiso expreso (ver [`pages/aviso-legal.html`](pages/aviso-legal.html)).
