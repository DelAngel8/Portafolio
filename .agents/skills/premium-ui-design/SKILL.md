---
name: premium-ui-design
description: >
  Guías avanzadas de diseño UI basadas en Refactoring UI de Adam Wathan y Steve Schoger.
  Trigger: Cuando el usuario necesita mejorar el diseño visual de interfaces web, crear jerarquía,
  trabajar con color, espaciado, tipografía o cualquier decisión de diseño UI.
license: Apache-2.0
metadata:
  author: Jair Martinez (based on Adam Wathan & Steve Schoger)
  version: "1.0"
---

## Cuando Usar Esta Skill

- Crear o mejorar jerarquía visual en interfaces
- Tomar decisiones de color, tipografía o espaciado
- Diseñar botones, formularios, tarjetas o cualquier componente
- Aplicar profundidad y sombras a elementos
- Mejorar la legibilidad y accesibilidad
- Cualquier tarea relacionada con diseño UI/UX

---

## Principios Fundamentales

### 1. Función Primera, Diseño Después
- NO comiences diseñando la shell (navbar, sidebar, layout)
- Comienza con una parte de funcionalidad real
- Una app es una colección de características → diseña esas primero

### 2. El Detalle	Viene Después
- No te obsesiones con tipos de letra, sombras, iconos al inicio
- Diseña en escala de grises primero → te obliga a usar espaciado, contraste y tamaño
- Los wireframes son desechables

### 3. No Diseñes Demasiado
- No diseñes todas las features antes de implementar
- Trabaja en ciclos cortos: diseña → implementa → itera
- Si algo es "nice to have", déséñalo después

### 4. Elige una Personalidad

| Factor | Efecto |
|--------|--------|
| Tipografía Serif | Elegante/clásico, formal |
| Sans-serif redondeado | Divertido, amigable |
| Sans-serif neutral | Sencillo, profesional |
| Color azul | Seguro, familiar, confianza |
| Color dorado | Caro, sofisticado, lujo |
| Border-radius pequeño | Neutral, formal |
| Border-radius grande | Divertido, informal |
| Border-radius 0px | Serio, corporativo |

**Regla:** Sé consistente — no mezcles esquinas cuadradas con redondeadas.

---

## Jerarquía Visual

### La Jerarquía Lo Es Todo
- Cuando todo compite por atención → ruido y caótico
- Restar importancia a lo secundario/terciario → inmediatamente más agradable

### Tamaño No Lo Es Todo
- NO dependas SOLO del tamaño de fuente
- Usa **peso** (bold) para enfatizar
- Usa **color** más suave para contenido secundario
- **2-3 colores suficientes:**
  - Oscuro → contenido principal
  - Gris → contenido secundario
  - Gris claro → contenido terciario

### Enfatizar Quitando Énfasis
- Si un elemento no se destaca, NO intentes enfatizarlo más
- En su lugar, RESTA énfasis a los elementos competidores
- Ejemplo: navegación inactiva en color más suave para que lo activo resalte

### Las Etiquetas Son el Último Recurso
- No siempre necesitas formato "Etiqueta: Valor"
- Si el contexto es suficiente, omite la etiqueta
- Cuando necesites etiquetas, trátalas como contenido secundario

---

## Diseño y Espaciado

### Comienza con Demasiado Espacio en Blanco
- Los espacios en blanco deben ELIMINARSE, no agregarse
- **Estrategia:** comienza con demasiado, luego elimínalo hasta que estés satisfecho
- Lo que parece "un poco demasiado" en un elemento es "justo lo suficiente" en contexto completo

### Sistema de Espaciado
- Base recomendada: **16px**
- Escala recomendada:
  ```
  4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
  ```
- **Regla:** ningún valor en la escala debe estar a menos de 25% de diferencia del siguiente
- Valores pequeños empezar juntos, progresivamente más espaciados

### No Tienes Que Llenar Toda la Pantalla
- Si necesitas 600px, usa 600px
- No hagas todo ancho-completo solo porque la nav lo es
- **Truco:** reduce el lienzo a ~400px y diseña móvil primero

---

## Diseño de Texto

### Escala Tipográfica
Define una escala restrictiva:
```
12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72px
```
- Evita tamaños < 12px para UI real
- Máximo **2 familias tipográficas**
- Recomendadas: Inter, Work Sans, Open Sans, Roboto (sans-serif neutral)

### Peso de Fuente
- **2 pesos suficientes:** normal (400-500) y bold (600-700)
- Evita pesos < 400 para UI — son difíciles de leer

### Longitud de Línea
- **Ideal:** 45-75 caracteres por línea
- Usa `max-width` en contenedores de texto

### Altura de Línea
- Títulos (grande): `line-height` 1.1-1.3
- Párrafos (pequeño): `line-height` 1.5-1.6
- No uses un valor fijo para todo

### Alineación
- Idiomas LTR → alinear a la izquierda
- Texto centrado → solo para titulares cortos (max 2-3 líneas)
- Números en tablas → alinear a la derecha

---

## Trabajar con Color

### Usa HSL, No Hex
- **Tono (0-360°):** posición en rueda de color
- **Saturación (0-100%):** 0%=gris, 100%=vibrante
- **Luminosidad (0-100%):** 0%=negro, 50%=color puro, 100%=blanco

### Necesitas Más Colores de los Que Creas

| Categoría | Cantidad |
|-----------|----------|
| Grises | 8-10 tonos |
| Color primario | 5-10 tonos |
| Colores de acento | Varios |
| Rojo/Amarillo/Verde | Variaciones |

- Total: hasta 10 colores × 5-10 tonos cada uno
- El negro puro se ve poco natural → usa gris muy oscuro

### Sistema Numérico
- Numeración: **900** (más oscuro) → **500** (base) → **100** (más claro)
- Primero llena 700 y 300, luego 800, 600, 400, 200

### Grises No Tienen Que Ser Grises
- Gris verdadero = 0% saturación
- Satura con azul → gris frío
- Satura con amarillo/naranja → gris cálido

### No Confíes Solo en el Color
- Los usuarios daltónicos tienen dificultades
- Agrega **ÍCONOS** para comunicar estados
- **Regla:** el color debe REFORZAR, nunca ser el único medio

---

## Creando Profundidad

### Emular una Fuente de Luz
- **Regla fundamental:** la luz viene de arriba
- Elementos elevados → borde superior más claro, sombra debajo
- Elementos insertados → borde inferior más claro, sombra arriba

### Sistema de Sombras (5 niveles)
- `sm`: botones ligeramente elevados
- `md`: menús desplegables
- `lg`: diálogos modales (mucho más cerca del usuario)
- Agrega sombra en `:active` para efecto "presionado"

### Técnica de Doble Sombra
1. **Sombra 1:** grande, suave, mucho offset vertical y blur → sombra proyectada
2. **Sombra 2:** estrecha, oscura, poco offset y blur pequeño → área sombreada debajo
- A mayor elevación, la sombra pequeña se vuelve más sutil

---

## Últimos Retoques

### Supercarga los Valores Predeterminados
- Reemplaza bullets de lista con iconos (checks, flechas)
- Estiliza enlaces con subrayados gruesos coloridos
- Usa checkboxes y radio buttons personalizados con color de marca

### Agrega Color con Bordes de Acento
- Parte superior de tarjetas
- Elementos de navegación activos
- Lado de alertas
- Debajo de títulos
- No requiere talento de diseño gráfico

### Usa Menos Bordes
- Los bordes no son la única forma de crear separación
- **Alternativas:**
  - Sombra de cuadro (más sutil)
  - Dos colores de fondo diferentes
  - Espacio adicional

### No Pases Por Alto los Estados Vacíos
- El estado vacío es la PRIMERA interacción
- Agrega imagen/ilustración + llamada a la acción clara
- Oculta UI innecesaria hasta que haya contenido

---

## Checklist de Diseño

- [ ] Jerarquía visual clara (contraste, peso, tamaño)
- [ ] Sistema de colores definido (escala 100-900)
- [ ] Sistema de espaciado definido (escala basada en 16px)
- [ ] Tipografía con escala fija y máx 2 familias
- [ ] Espaciado generoso (comienza con demasiado)
- [ ] Color refuerza, no solo comunica
- [ ] Profundidad consistente (sombras predefinidas)
- [ ] Estados vacíos con CTA claro
- [ ] Menos bordes, más sombras/espacio
- [ ] Bordes de acento para dar vida

---

## Recursos

- **Libro original:** Refactoring UI - Adam Wathan & Steve Schoger
- **Web:** refactoringui.com
- **Fuentes recomendadas:** Inter, Work Sans, Open Sans, Roboto
- **Fotos stock:** Unsplash (alta calidad)