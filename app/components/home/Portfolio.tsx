import Link from 'next/link'
import SectionLabel from '../primitives/SectionLabel'

const projects = [
  {
    index: '01',
    tag: 'DEMO INTERACTIVO',
    title: 'Análisis de costos de importación',
    desc: 'Tipos de cambio en tiempo real (USD, EUR, GBP → MXN), cálculo de promedio ponderado de exposición cambiaria y análisis de riesgo por moneda. Datos de open.er-api.com actualizados diariamente.',
    meta: 'API abierta · Cálculo en vivo · Multidivisa',
    href: '/dashboard',
    cta: 'Ver demo en vivo',
    accentColor: '#0A5C4B',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l4-4 4 4 4-6 4 2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
      </svg>
    ),
  },
  {
    index: '02',
    tag: 'ANÁLISIS COMPLETO',
    title: 'Café Sales Analysis — Where the Numbers Point',
    desc: 'Análisis de ventas anuales 2025 para un café: ranking de productos, detección de merma encubierta en cookies, hallazgo crítico de ventas sin clasificar y plan de acción de 3 pasos.',
    meta: 'Ene–Dic 2025 · Rendimiento de producto · Recomendaciones',
    href: '/portfolio/cafe',
    cta: 'Ver análisis',
    accentColor: '#E9C46A',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
]

export default function Portfolio() {
  return (
    <section id="portafolio" className="bg-pearl py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Trabajo real · Casos de estudio</SectionLabel>
          <h2 className="section-title">Lo que hacemos en la práctica</h2>
          <p className="section-subtitle mt-2 max-w-xl">
            Análisis reales con datos reales. Así se ve el trabajo de Radar de Valor.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-gray-300 border border-gray-300">
          {projects.map((p) => (
            <div key={p.index} className="bg-white px-6 py-7 relative overflow-hidden group flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.accentColor }} />
              <div
                className="absolute top-0 left-0 w-0.5 h-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: p.accentColor }}
              />

              <div className="relative flex-1">
                <div className="flex items-start justify-between mb-4">
                  <p className="font-mono text-xs text-gray-mid">{p.index}</p>
                  <span className="badge-gray">{p.tag}</span>
                </div>

                <div className="mb-4" style={{ color: p.accentColor }}>
                  {p.icon}
                </div>

                <h3 className="font-heading font-bold text-slate-brand text-lg mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-gray-mid text-sm leading-relaxed mb-4">{p.desc}</p>
                <p className="font-mono text-xs text-gray-mid uppercase tracking-wide">{p.meta}</p>
              </div>

              <div className="relative mt-6 pt-5 border-t border-gray-100">
                <Link
                  href={p.href}
                  className="btn-outline text-xs py-2.5 px-5 inline-block"
                  style={{ borderColor: p.accentColor, color: p.accentColor }}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
