import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Análisis de ventas · Café 2025 — Radar de Valor',
  description: 'Análisis completo de ventas anuales para un café: rendimiento por producto, hallazgos críticos y plan de acción.',
}

// ── Design primitives (inline per project convention) ──────────────────────
function DiagStripe({ color = '#E9C46A', opacity = 0.08 }: { color?: string; opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <line x1="-10%" y1="110%" x2="110%" y2="-10%" stroke={color} strokeWidth="50" opacity={opacity} />
        <line x1="-10%" y1="130%" x2="130%" y2="-10%" stroke={color} strokeWidth="25" opacity={opacity * 0.55} />
        <line x1="-10%" y1="150%" x2="150%" y2="-10%" stroke={color} strokeWidth="14" opacity={opacity * 0.35} />
      </svg>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-heading text-xs font-bold uppercase tracking-widest text-gray-mid mb-1">{children}</p>
}

// ── Product data ────────────────────────────────────────────────────────────
const TOP_PRODUCTS = [
  { rank: '01', name: 'Salad',     pct: 100, color: '#0A5C4B' },
  { rank: '02', name: 'Smoothie',  pct: 82,  color: '#0A5C4B' },
  { rank: '03', name: 'Sandwich',  pct: 67,  color: '#0A5C4B' },
]

const UNDER_PRODUCTS = [
  {
    name: 'Coffee / Tea',
    badge: 'BAJO PROMEDIO',
    badgeBg: '#E9C46A',
    badgeText: '#2C3E50',
    note: 'Margen potencial alto, volumen cronicamente bajo. Brecha de revenue directa y corregible.',
  },
  {
    name: 'Cookies',
    badge: 'NIVEL DE MERMA',
    badgeBg: '#E76F51',
    badgeText: '#ffffff',
    note: 'Ventas equivalentes al nivel de merma observado. El producto no está justificando su lugar en el menú.',
  },
]

const RECOMMENDATIONS = [
  {
    index: '01',
    badge: 'INMEDIATA',
    badgeColor: '#E76F51',
    accentColor: '#E76F51',
    title: 'Diagnosticar y eliminar ventas sin clasificar',
    body: 'Las ventas sin clasificar no son un problema de registro — son un problema de visibilidad financiera. Sin datos limpios a nivel de producto, el costo por unidad es una estimación y el margen real es desconocido. Este es el paso cero de cualquier optimización seria.',
  },
  {
    index: '02',
    badge: 'CORTO PLAZO',
    badgeColor: '#E9C46A',
    accentColor: '#E9C46A',
    title: 'Replantear el rol de Cookies en el menú',
    body: 'Si las ventas de un producto no superan su nivel de merma, ese producto está generando costo sin retorno proporcional. La recomendación es realizar una prueba rápida de sustitución: probar un snack de temporada o un combo que justifique el espacio que hoy ocupan las cookies.',
  },
  {
    index: '03',
    badge: 'OPORTUNIDAD',
    badgeColor: '#0A5C4B',
    accentColor: '#0A5C4B',
    title: 'Promoción combinada: Café/Té + Cookie + Sándwich',
    body: 'Coffee y Tea no se venden solos porque no hay una razón compelente para agregarlos a la compra. Un bundle bien diseñado — ancado en el Sandwich (#3 en ventas) — crea valor percibido y reduce la fricción de decisión, sin afectar el margen de los productos líderes.',
  },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default function CafePage() {
  return (
    <div className="min-h-screen font-body" style={{ background: '#F4F5F7' }}>

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden"
        style={{
          background: '#2C3E50',
          clipPath: 'polygon(0 0, 100% 0, 100% 78%, 0 100%)',
          paddingBottom: '5rem',
        }}
      >
        <DiagStripe color="#E9C46A" opacity={0.07} />

        <div className="relative max-w-6xl mx-auto px-6 pt-5 pb-2 flex items-center justify-between border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading font-bold text-white/70 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Radar de Valor
          </Link>
          <span className="font-mono text-white/40 text-xs hidden sm:block">ENE–DIC 2025</span>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-4">
          <div className="flex items-start gap-4">
            <div className="w-1 self-stretch mt-1" style={{ background: '#E9C46A', minHeight: '3rem' }} />
            <div>
              <Label>Análisis de ventas · Café — Ene–Dic 2025</Label>
              <h1 className="font-heading font-bold text-white leading-none" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
                Café Sales Analysis —<br />Where the Numbers Point
              </h1>
              <p className="text-white/50 mt-3 text-sm max-w-lg">
                Un año completo de datos de ventas: qué productos lideran, cuáles frenan
                el margen y qué decisiones están pendientes.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 pb-16 relative z-10">

        {/* ── KPI ROW ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-300 border border-gray-300 mb-6">
          {[
            { label: 'Producto líder', value: 'Salad', sub: 'IDX·01 · #1 en ventas anuales', accent: '#0A5C4B' },
            { label: 'Problema crítico detectado', value: 'Sin clasificar', sub: 'IDX·02 · Distorsionan costo y margen', accent: '#E76F51' },
            { label: 'Período analizado', value: '12 meses', sub: 'IDX·03 · Enero–Diciembre 2025', accent: '#E9C46A' },
          ].map((k, i) => (
            <div key={i} className="relative overflow-hidden bg-white px-6 py-5">
              <DiagStripe color={k.accent} opacity={0.05} />
              <div className="relative">
                <div className="absolute -top-5 left-0 right-0 h-0.5" style={{ background: k.accent }} />
                <Label>{k.label}</Label>
                <p className="font-mono font-bold leading-none mt-1 text-2xl" style={{ color: k.accent }}>
                  {k.value}
                </p>
                <p className="font-mono text-xs text-gray-mid mt-2">{k.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── PRODUCT PERFORMANCE ───────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Top performers */}
          <div className="bg-white border border-gray-300">
            <div className="border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3" style={{ background: '#0A5C4B' }} />
                <span className="font-heading font-bold text-slate-brand uppercase tracking-widest text-sm">
                  Productos destacados
                </span>
              </div>
              <span className="text-gray-mid text-xs font-mono">RANKING</span>
            </div>

            <div className="px-6 py-5 space-y-5">
              {TOP_PRODUCTS.map((p) => (
                <div key={p.rank}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-gray-mid w-5">{p.rank}</span>
                    <span className="font-heading font-semibold text-slate-brand flex-1">{p.name}</span>
                    <span className="font-mono text-xs text-gray-mid">{p.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 ml-8">
                    <div className="h-full transition-all duration-700" style={{ width: `${p.pct}%`, background: p.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden border-t border-gray-300 px-6 py-5" style={{ background: '#2C3E50' }}>
              <DiagStripe color="#E9C46A" opacity={0.08} />
              <div className="relative">
                <Label>Diagnóstico</Label>
                <p className="font-heading font-bold text-white text-base">
                  Generan el volumen que sostiene el negocio.
                </p>
              </div>
            </div>
          </div>

          {/* Underperformers */}
          <div className="bg-white border border-gray-300 flex flex-col">
            <div className="border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3" style={{ background: '#E76F51' }} />
                <span className="font-heading font-bold text-slate-brand uppercase tracking-widest text-sm">
                  Productos bajo la línea
                </span>
              </div>
              <span className="text-gray-mid text-xs font-mono">ALERTA</span>
            </div>

            <div className="px-6 py-5 space-y-6 flex-1">
              {UNDER_PRODUCTS.map((p) => (
                <div key={p.name}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-heading font-semibold text-slate-brand flex-1">{p.name}</span>
                    <span
                      className="font-mono text-xs font-bold px-2 py-0.5 uppercase"
                      style={{ background: p.badgeBg, color: p.badgeText }}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-gray-mid text-sm leading-relaxed">{p.note}</p>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden border-t border-gray-300 px-6 py-5" style={{ background: '#2C3E50' }}>
              <DiagStripe color="#0A5C4B" opacity={0.06} />
              <div className="relative">
                <Label>Implicación</Label>
                <p className="font-heading font-bold text-white text-base">
                  Ocupan espacio en el menú sin justificación por volumen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CRITICAL FINDING ──────────────────────────────────────────── */}
        <div className="relative overflow-hidden border border-gray-300 mb-6" style={{ background: '#2C3E50' }}>
          <DiagStripe color="#E9C46A" opacity={0.06} />
          <div className="h-1 w-full" style={{ background: '#E76F51' }} />

          <div className="relative px-6 py-8 md:px-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Label>Hallazgo crítico — prioridad inmediata</Label>
                <h2 className="font-heading font-bold text-white text-2xl mb-4 leading-tight">
                  Las ventas sin clasificar están distorsionando todo
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  Un porcentaje notable de transacciones se registra sin categoría de producto.
                  Esto no es un problema de orden — es una brecha en la visibilidad financiera del negocio.
                  Sin datos precisos a nivel de producto, el consumo de materias primas se vuelve una
                  estimación y la rentabilidad real no puede medirse con confianza.
                </p>
                <p className="text-white/40 text-sm border-l-4 border-white/20 pl-4">
                  En Radar de Valor, este es siempre el paso cero: limpiar la base de datos antes
                  de concluir nada sobre costos, márgenes u oportunidades.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-white/10 px-5 py-4">
                  <Label>Estatus de los datos</Label>
                  <p className="font-mono font-bold text-2xl mt-1" style={{ color: '#E76F51' }}>
                    SUCIO
                  </p>
                  <div className="mt-3 h-0.5 bg-white/10">
                    <div className="h-full w-full" style={{ background: '#E76F51' }} />
                  </div>
                </div>
                <div className="border border-white/10 px-5 py-4">
                  <Label>Estacionalidad detectada</Label>
                  <p className="font-mono font-bold text-2xl mt-1" style={{ color: '#E9C46A' }}>
                    NINGUNA
                  </p>
                  <p className="text-white/40 text-xs mt-1">Oportunidad de crecimiento no explotada</p>
                  <div className="mt-3 h-0.5 bg-white/10">
                    <div className="h-full w-3/4" style={{ background: '#E9C46A' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEASONALITY FINDING ───────────────────────────────────────── */}
        <div className="bg-white border border-gray-300 px-8 py-8 mb-6">
          <Label>Análisis de patrones temporales</Label>
          <h2 className="section-title mt-1 mb-6">Sin estacionalidad significativa detectada</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <p className="text-slate-brand leading-relaxed">
              La distribución mensual de ventas se mantiene notablemente estable durante todo 2025.
              No existe un mes de pico ni un mes de caída significativa. Los tres productos líderes —
              Salad, Smoothie y Sandwich — muestran curvas planas con mínima variación
              mes a mes.
            </p>
            <p className="text-slate-brand leading-relaxed">
              Para un café, la ausencia de picos puede indicar que las promociones estacionales
              nunca se han probado, o que el mix de productos no es suficientemente atractivo para
              generar oleadas de demanda. Campañas de temporada e items de edición limitada podrían
              crear picos de revenue sin requerir cambios permanentes en el menú.
            </p>
          </div>
          <div className="border-l-4 border-amber-brand pl-4 mt-6">
            <p className="text-slate-brand text-sm font-heading font-semibold">
              Esta es una palanca de crecimiento no explotada — disponible sin inversión en infraestructura.
            </p>
          </div>
        </div>

      </main>

      {/* ── RECOMMENDATIONS ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-20 px-4" style={{ background: '#2C3E50' }}>
        <DiagStripe color="#E9C46A" opacity={0.05} />
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-heading text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Plan de acción · 3 recomendaciones
            </p>
            <h2 className="font-heading font-bold text-white leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}>
              Lo que recomendamos hacer
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {RECOMMENDATIONS.map((r) => (
              <div key={r.index} className="relative px-8 py-8" style={{ background: '#2C3E50' }}>
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: r.accentColor }} />
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-mono font-bold text-white/25 text-3xl leading-none">{r.index}</p>
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 uppercase"
                    style={{ background: r.badgeColor, color: r.badgeColor === '#E9C46A' ? '#2C3E50' : '#fff' }}
                  >
                    {r.badge}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-3 leading-tight">{r.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ───────────────────────────────────────────────────── */}
      <section className="bg-pearl border-t border-gray-200 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-2">¿Tu negocio necesita este tipo de análisis?</p>
          <h2 className="section-title mb-8">Empezamos con un diagnóstico de 1 hora</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contacto" className="btn-primary text-center">
              Solicita tu diagnóstico
            </Link>
            <Link href="/#portafolio" className="btn-outline text-center">
              Ver más casos
            </Link>
          </div>
          <p className="font-mono text-xs text-gray-mid mt-10 uppercase tracking-wide">
            Análisis: Radar de Valor · Período Ene–Dic 2025 · Solo con fines ilustrativos
          </p>
        </div>
      </section>

    </div>
  )
}
