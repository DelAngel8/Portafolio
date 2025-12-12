/**
 * ================================
 * SERVIDOR EXPRESS PARA PORTAFOLIO PERSONAL
 * ================================
 * Servidor web para el portafolio personal
 * Utiliza Express.js y EJS como motor de plantillas
 */

const express = require("express");
const path = require("path");
require('dotenv').config();
const db = require('./db');
const proyectosRouter = require('./routes/proyectos');

// ================================
// CONFIGURACIÓN
// ================================
const CONFIG = {
  PORT: process.env.PORT || 4100,
  VIEWS_DIR: path.join(__dirname, "../views"),
  STATIC_DIR: path.join(__dirname, "../static")
};

// Rutas estáticas de la app (registro dinámico más abajo)
const ROUTES = [
  { path: "/", view: "index" },
  { path: "/sobre-mi", view: "sobre-mi" },
  { path: "/portafolio", view: "portafolio" },
  { path: "/servicios", view: "servicios" },
  { path: "/contacto", view: "contacto" }
];

// ================================
// INICIALIZACIÓN DE EXPRESS
// ================================
const app = express();

// ================================
// SIMPLE RATE LIMITER / SPAM PROTECTIONS
// In-memory map: ip -> array of timestamps (ms)
// Not suitable for multi-process deployments, but fine for local/dev.
const newsletterRateMap = new Map();
const NEWSLETTER_RATE_MAX = 5; // max submissions
const NEWSLETTER_WINDOW_MS = 60 * 60 * 1000; // per hour

// ================================
// CONFIGURACIÓN DEL MOTOR DE VISTAS
// ================================
app.set("view engine", "ejs");
app.set("views", CONFIG.VIEWS_DIR);

// ================================
// MIDDLEWARES
// ================================
app.use(express.static(CONFIG.STATIC_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// REGISTRO DE RUTAS
// ================================
// Rutas registradas dinámicamente
ROUTES.forEach(route => {
  app.get(route.path, async (req, res) => {
    try {
      if (route.path === "/portafolio") {
        const [proyectos] = await db.query('SELECT * FROM proyectos ORDER BY fecha_proyecto DESC');
        res.render(route.view, { query: req.query, proyectos });
      } else {
        res.render(route.view, { query: req.query });
      }
    } catch (error) {
      console.error('Error cargando ruta:', error);
      res.render(route.view, { query: req.query, proyectos: [] });
    }
  });
});

// Detalle de proyecto
app.get('/proyectos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [proyectos] = await db.query('SELECT * FROM proyectos WHERE id = ?', [id]);
    if (proyectos.length === 0) return res.render('proyectos', { query: req.query, proyecto: null });
    const proyecto = proyectos[0];
    res.render('proyectos', { query: req.query, proyecto });
  } catch (error) {
    console.error('Error cargando proyecto:', error);
    res.render('proyectos', { query: req.query, proyecto: null });
  }
});

// API router
app.use('/api/proyectos', proyectosRouter);

// Formularios
app.post("/contacto", (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;
  console.log("📧 Nuevo mensaje de contacto (no enviado por servidor):");
  console.log("  Nombre:", nombre);
  console.log("  Email:", email);
  console.log("  Asunto:", asunto);
  console.log("  Mensaje:", mensaje);
  res.redirect("/contacto");
});

app.post('/newsletter', async (req, res) => {
  const referer = req.get('Referer') || '/';
  const rawEmail = (req.body.newsletter_email || '').toString();
  const hp = (req.body.hp || '').toString().trim();
  if (hp) return res.redirect(303, referer + '?newsletter=spam');

  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const prev = newsletterRateMap.get(ip) || [];
  const recent = prev.filter(ts => now - ts < NEWSLETTER_WINDOW_MS);
  if (recent.length >= NEWSLETTER_RATE_MAX) return res.redirect(303, referer + '?newsletter=rate_limit');
  recent.push(now); newsletterRateMap.set(ip, recent);

  const email = rawEmail.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) return res.redirect(303, referer + '?newsletter=invalid');

  const source = req.body.source || null;
  try {
    const [rows] = await db.query('SELECT id FROM newsletter_subscribers WHERE email = ?', [email]);
    if (rows.length > 0) return res.redirect(303, referer + '?newsletter=exists');
    await db.query('INSERT INTO newsletter_subscribers (email, source) VALUES (?, ?)', [email, source]);
    return res.redirect(303, referer + '?newsletter=ok');
  } catch (err) {
    console.error('Error guardando newsletter:', err);
    return res.redirect(303, referer + '?newsletter=error');
  }
});

// ================================
// ERRORES 404
// ================================
app.use((req, res) => {
  res.status(404).render("index", {
    error: "Página no encontrada",
    query: req.query || {}
  });
});

// ================================
// ERRORES DEL SERVIDOR
// ================================
app.use((err, req, res, next) => {
  console.error("Error del servidor:", err.stack);
  res.status(500).render("index", {
    error: "Error interno del servidor",
    query: req.query || {}
  });
});

// ================================
// INICIAR SERVIDOR
// ================================
const server = app.listen(CONFIG.PORT, () => {
  console.log(`\nServidor iniciado: http://localhost:${CONFIG.PORT} (env=${process.env.NODE_ENV || 'development'})\n`);
});

// Manejo de cierre
process.on("SIGTERM", () => { server.close(() => process.exit(0)); });
process.on("SIGINT", () => { server.close(() => process.exit(0)); });

module.exports = app;
