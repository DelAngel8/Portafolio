# Portafolio Personal - Jair Martinez

## Stack Tecnológico
- **Runtime**: Node.js
- **Framework**: Express.js
- **Template Engine**: EJS
- **Base de Datos**: MySQL
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Fuentes**: Outfit (títulos), Inter (body)

## Estructura del Proyecto
```
/
├── src/
│   ├── app.js          # Servidor Express principal
│   ├── db.js           # Conexión a MySQL
│   └── routes/         # Rutas de API
├── views/
│   ├── templates/      # Partial templates (head, header, footer)
│   ├── *.ejs           # Páginas principales
│   └── proyectos.ejs   # Detalle de proyecto
├── static/
│   ├── css/            # Estilos (styles.index.css)
│   ├── js/             # Scripts
│   ├── img/            # Imágenes y assets
│   └── fonts/          # Fuentes woff2
└── data/               # SQL dumps
```

## Convenciones de Código

### HTML/EJS
- Espacios de sangría: 4 espacios
- Orden de secciones: head → header → main → footer
- Incluir `<%- include('templates/head', {...}) %>` con título y description

### CSS
- Usar variables CSS para colores, espaciado y tipografía
- Prefijos: `--color-`, `--space-`, `--font-size-`, `--shadow-`
- Mobile-first responsive: `@media (max-width: 600px)` → tablet → desktop
- Organización: Encabezado con índice de secciones

### Rutas
- Agregar nuevas rutas en el array `ROUTES` en `src/app.js`
- Mantener consistencia con nombres de vistas

## Páginas Existentes
- `/` - Inicio (Bento Grid)
- `/sobre-mi` - Sobre mí
- `/portafolio` - Proyectos desde DB
- `/proyectos/:id` - Detalle de proyecto
- `/servicios` - Servicios (en desarrollo)
- `/software-empresas` - Software a medida (NUEVO)
- `/contacto` - Contacto con Formspree

## Commands
```bash
npm install      # Instalar dependencias
npm run dev      # Desarrollo con nodemon
npm start        # Producción
```

## Notas
- El portafolio usa MySQL. Necesita configurar `.env` con credenciales
- Formulario de contacto usa Formspree (https://formspree.io/f/xgvryoqo)
- Newsletter guarda en DB tabla `newsletter_subscribers`
- Dark/Light theme soportado via `data-theme` attribute