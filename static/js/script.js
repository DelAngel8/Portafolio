// ================================
// CONSTANTES Y CONFIGURACIÓN
// ================================
const CONFIG = {
  THEME_STORAGE_KEY: "theme",
  RESIZE_DEBOUNCE_DELAY: 250,
};

const SELECTORS = {
  themeToggle: ".cambiar-tema",
  navLinks: '.icono-nav[href^="/"]',
  portfolioGrid: ".cajas-portafolio",
  portfolioImages: "img",
};

// ================================
// MÓDULO: GESTIÓN DE TEMA
// ================================
const ThemeManager = {
  /**
   * Obtiene el tema guardado o detecta la preferencia del sistema
   */
  getInitialTheme() {
    const savedTheme = localStorage.getItem(CONFIG.THEME_STORAGE_KEY);

    if (savedTheme) {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  },

  /**
   * Establece el tema en el documento
   */
  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(CONFIG.THEME_STORAGE_KEY, theme);
  },

  /**
   * Alterna entre tema claro y oscuro
   */
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
  },

  /**
   * Inicializa el gestor de tema
   */
  init() {
    const themeButton = document.querySelector(SELECTORS.themeToggle);

    // Establecer tema inicial siempre (aunque no exista el botón)
    this.setTheme(this.getInitialTheme());

    // Si existe el botón, añadir listener para alternar tema
    if (themeButton) {
      themeButton.addEventListener("click", () => this.toggleTheme());
    }
  },
};

// ================================
// MÓDULO: NAVEGACIÓN ACTIVA
// ================================
const NavigationManager = {
  /**
   * Marca el enlace de navegación activo según la página actual
   */
  setActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(SELECTORS.navLinks);

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute("href");

      if (linkPath === currentPath) {
        link.classList.add("activo");
      } else {
        link.classList.remove("activo");
      }
    });
  },

  /**
   * Inicializa el gestor de navegación
   */
  init() {
    this.setActiveLink();
  },
};



// ================================
// MÓDULO: GESTIÓN DE BOTONES DE ACCIÓN (descargas, nav programática)
// ================================
const ActionButtonsManager = {
  init() {
    // Botones que inician descarga: data-file="/path/to/file.pdf"
    const downloadButtons = document.querySelectorAll('[data-file]');
    downloadButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const file = btn.getAttribute('data-file');
        if (!file) return;
        const a = document.createElement('a');
        a.href = file;
        const filename = file.split('/').pop() || '';
        if (filename) a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
    });

    // Botones que navegan a un href (incluye mailto): data-href="..."
    const navButtons = document.querySelectorAll('[data-href]');
    navButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const href = btn.getAttribute('data-href');
        if (!href) return;
        window.location.href = href;
      });
    });
  },
};

// ================================
// INICIALIZACIÓN PRINCIPAL
// ================================
const App = {
  /**
   * Inicializa todos los módulos de la aplicación
   */
  init() {
    ThemeManager.init();
    NavigationManager.init();
    ActionButtonsManager.init();
  },
};

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => App.init());
