# Manifiesto de Diseño – Radar de Valor (v3)

> **v3 — Revisión mayor:** Se establece un lenguaje visual de alto contraste, líneas rectas y acentos diagonales para comunicar rigor analítico y gravitas profesional. Este documento reemplaza la versión 2.

---

## 1. Esencia de la marca

- **Nombre:** Radar de Valor
- **Slogan (hero):** detecta y activa el valor oculto en tu negocio.
- **Tagline (logo / uso corto):** datos que generan crecimiento.
- **Personalidad de marca:** rigurosa, analítica, directa, confiable.
- **Promesa central:** convertir datos en decisiones accionables que generen crecimiento real.
- **Voz de marca:** **nosotros** (primera persona del plural). Transmite equipo, solidez y acompañamiento.

> El diseño debe transmitir **precisión e inteligencia**, no suavidad ni amabilidad genérica. Piensa en Bloomberg, no en una app de bienestar.

---

## 2. Público objetivo

- Dueños de negocio, emprendedores y directivos de PYMES que sienten que podrían "sacar más" de sus datos, pero no saben cómo.
- Nivel de conocimiento técnico medio-bajo: el diseño debe ser intuitivo y explicativo, **pero sin parecer básico o poco serio**.

> El usuario debe sentir que está hablando con alguien muy competente que le explica las cosas con claridad, no con alguien que simplifica porque no sabe más.

---

## 3. Estilo visual

### 3.1. Paleta de color

| Uso | Color | HEX |
|-----|-------|-----|
| Color principal (marca, acción primaria) | Verde Esmeralda | `#0A5C4B` |
| Color de acción (CTAs, acentos clave) | Ámbar | `#E9C46A` |
| Color de énfasis (alertas, datos críticos) | Coral | `#E76F51` |
| Fondo principal | Blanco | `#FFFFFF` |
| Fondo alterno | Gris Perla | `#F4F5F7` |
| Fondo oscuro (secciones de impacto) | Gris Pizarra | `#2C3E50` |
| Texto principal | Gris Pizarra | `#2C3E50` |
| Texto secundario | Gris Medio | `#6C757D` |

**Reglas de color:**
- Fondos claros (blanco, gris perla) para el contenido estándar.
- Fondo oscuro (`#2C3E50`) reservado para secciones de alto impacto: Hero método, Contacto.
- Ámbar únicamente en CTAs principales y acentos de datos relevantes. Nunca como color de fondo de sección.
- Coral para énfasis negativo, alertas o contraste.
- Asegurar contraste WCAG AA en todas las combinaciones.

### 3.2. Tipografía

- **Titulares y UI:** Inter (variable `--font-inter`, sans-serif).
- **Texto de párrafo:** Open Sans (variable `--font-open-sans`, sans-serif).
- **Datos y métricas:** `font-mono` (sistema) para números en dashboards y métricas.
- **Labels y etiquetas:** `uppercase tracking-widest text-xs font-bold` — estilo técnico/financiero.

**Jerarquía:**
- H1: mensaje de valor, tamaño fluido con `clamp()`, `leading-none`.
- H2: secciones principales, con `SectionLabel` encima en uppercase.
- H3: subtítulos dentro de cards.
- Labels de sección: siempre `uppercase tracking-widest text-xs font-bold text-gray-mid`.

### 3.3. Lenguaje visual — geometría y estructura *(nuevo en v3)*

**Principio rector: rectitud y precisión.**

| Elemento | Regla |
|----------|-------|
| Esquinas | **Sin redondeo.** `border-radius: 0` en todos los componentes. |
| Cards | Borde de 1px `#E2E4E7`, sin sombra (`box-shadow: none`). |
| Grids de cards | Unidas por separadores de 1px (`gap-px bg-gray-200`), sin gap visual. |
| Botones | Sin radio. CTA primario con `clip-path` paralelo: `polygon(0 0, calc(100%-10px) 0, 100% 100%, 10px 100%)`. |
| Inputs y textareas | Sin radio (`border-radius: 0`), borde `1px solid #D1D5DB`. |
| Barras de progreso | Rectangulares, sin `border-radius`. |
| Separadores | Líneas de 1–2px, sin ornamentos. |

### 3.4. Acentos diagonales *(nuevo en v3)*

Las líneas diagonales son el elemento decorativo distintivo de la marca. Comunican movimiento, análisis y dirección.

**Uso del componente `DiagStripe`:**
- 3 líneas SVG paralelas en ángulo 45°, width decreciente, opacidad baja (0.04–0.10).
- Se usa como fondo de: Hero, sección How It Works, sección Contact, panel de totales en Dashboard.
- **Nunca** en secciones de texto puro donde distraiga la lectura.
- Color de las líneas: adaptar al fondo. Sobre blanco → `#0A5C4B`. Sobre oscuro → `#E9C46A`.

**Uso del acento de borde superior (`border-top accent`):**
- Cards de pilares, pasos del método, métricas: línea de 4px en el color del acento de la sección.
- Reemplaza el uso de color de fondo en cards.

**Uso del acento de borde izquierdo (`border-left accent`):**
- Cards en hover: línea izquierda de 2px que aparece en `transition-opacity`.
- Citas, bloques de error, mensajes de alerta.

**Corner brackets:**
- Placeholder de foto y elementos contenedores que necesitan énfasis sin llenar de color.
- Implementar con 2 divs: `top-left` y `bottom-right`, `border-t-4 border-l-4` / `border-b-4 border-r-4`.

### 3.5. Patrones de sección

| Sección | Fondo | Acento diagonal | Separador sección |
|---------|-------|-----------------|-------------------|
| Navbar | Blanco | No | `border-b-2 border-slate-brand` |
| Hero | Blanco | Sí, verde muy suave | `clip-path` diagonal abajo |
| Problem | Gris Perla | No | Natural |
| Benefits | Blanco | No (hover en cards) | Natural |
| How It Works | Pizarra oscuro | Sí, ámbar muy suave | Natural |
| Approach | Blanco | Sí (solo en stat cells) | Natural |
| For Whom | Gris Perla | No | Natural |
| About | Blanco | Sí (en photo frame) | Natural |
| Contact | Pizarra oscuro | Sí, ámbar | `border-top-1px amber` |
| Footer | Pizarra oscuro | No | `border-t white/10` |

---

## 4. Tono y contenido

- Lenguaje directo, sin tecnicismos innecesarios.
- Voz unificada en **primera persona del plural ("nosotros")**.
- Enfoque en beneficios concretos, nunca en características técnicas.
- Labels de sección siempre en plural o como descriptores cortos: "El problema · El método · Rigor y método".
- Datos estadísticos siempre con fuente visible (no ocultar en letra pequeña).

**Vocabulario prohibido:** Big Data, Machine Learning, KPI, Dashboard, Pipeline, Data Lake.
**Usar en su lugar:** "tus datos", "análisis inteligente", "lo que realmente importa medir", "tablero de control claro", "oportunidades de crecimiento".

---

## 5. Principios UI/UX

1. **Claridad primero** — un solo mensaje en el hero. Recorrido: Problema → Beneficio → Método → Enfoque → Para quién → Nosotros → Acción.
2. **Jerarquía visual fuerte** — `SectionLabel` + H2 en cada sección. Nunca empezar una sección directo con H2 sin contexto.
3. **Anticipación de objeción** — "Sin jerga · Sin compromiso · Sin conocimientos previos."
4. **CTA siempre accesible** — repetido en Navbar, Hero, How It Works y Contact. Texto consistente: "Solicita tu diagnóstico".
5. **Gravitas sin distancia** — el diseño es serio pero el texto es humano. Rigidez visual + calidez en el copy.
6. **Consistencia absoluta** — misma paleta, mismos estilos de botón, mismas reglas de borde y diagonales en toda la experiencia (landing + dashboard).

---

## 6. Estructura de la página

1. **Navbar** — Logo · Links uppercase · Demo en vivo · CTA
2. **Hero** — Stat BARC con fuente · H1 · Subtítulo · 2 CTAs · Trust grid (4 métricas en celdas)
3. **El problema** — Grid 3 columnas unidas · Índice numérico + ícono + título + desc
4. **Lo que obtienes** — Grid 4 columnas unidas · Índice · Ícono · Título · Desc
5. **Cómo funciona** — Fondo oscuro + diagonal · 3 pasos con top-border de color
6. **Enfoque / Investigación** — Stats 3 celdas · 3 pilares con top-border
7. **Para quién** — 2 columnas · SÍ (verde) / NO (coral) · con top-border de 2px
8. **Sobre nosotros** — Foto con corner brackets · Tags con border
9. **Contacto** — Fondo oscuro + diagonal + amber top-border · Form sharp
10. **Footer** — Logo uppercase · Tagline · Copyright monospace

---

## 7. Componentes reutilizables

| Componente | Descripción |
|------------|-------------|
| `DiagStripe` | SVG con 3 líneas diagonales decorativas. Props: `color`, `opacity`. |
| `SectionLabel` | `<p>` en uppercase tracking-widest, siempre encima del H2. |
| `.card` (CSS) | Borde 1px gris, sin sombra, sin radio. |
| `.btn-primary` (CSS) | Ámbar, clip-path paralelo, uppercase, sin radio. |
| `.btn-outline` (CSS) | Borde esmeralda, uppercase, sin radio. |
| `.section-label` (CSS) | Equivalente a `SectionLabel` en CSS puro. |
| Grid unido | `grid gap-px bg-gray-200 border border-gray-200` — separadores de 1px. |
| Top-border card | `absolute top-0 left-0 right-0 h-1` con `background: [accent]`. |
| Left-border hover | `absolute top-0 left-0 w-0.5 h-full opacity-0 group-hover:opacity-100`. |
| Corner brackets | Dos divs en esquinas opuestas con `border-t/l` y `border-b/r`. |

---

## 8. Reglas para diseñadores y desarrolladores

- **Toda decisión visual debe responder:** "¿Comunica rigor, claridad y acción sin añadir ruido?"
- `border-radius` siempre en 0. Si Tailwind agrega `rounded-*` por defecto, neutralizarlo.
- `box-shadow` solo en overlays y dropdowns. Nunca en cards de contenido.
- Animaciones: únicamente `transition-colors`, `transition-opacity`, `transition-all duration-200`. Sin keyframes decorativos.
- Mobile igual o más claro que desktop: botones grandes, texto legible, CTA visible al hacer scroll.
- Tiempos de carga rápidos: imágenes optimizadas, sin librerías de iconos externas, SVGs inline.
- Las diagonales son un acento, no un fondo. Opacidad siempre por debajo de 0.12.

---

## 9. Dashboard demo (`/dashboard`)

El dashboard sigue el mismo sistema visual que la landing. Adicionalmente:

- Números de datos en `font-mono font-bold`.
- Índices de panel (`IDX·01`) en `font-mono text-xs text-gray-mid`.
- Header con `clip-path` diagonal y `DiagStripe` ámbar.
- Cards con borde `1px`, agrupadas en grid con separadores de `1px`.
- Barras de progreso rectangulares con hash marks diagonales SVG internas.
- Attribution en footer: `font-mono uppercase` todo en mayúsculas.

---

## 10. Mensaje de cierre

"Radar de Valor es una marca que combina análisis de datos con decisiones de negocio claras. El diseño debe hacer que cualquier dueño de negocio entienda, en segundos, que aquí no se habla solo de números, sino de oportunidades concretas para crecer. La rectitud visual y las diagonales no son decoración — son la expresión gráfica de precisión analítica y dirección. Cada pantalla, cada botón y cada línea debe ayudar a detectar y activar el valor oculto en su negocio."
