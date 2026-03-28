import DiagStripe from '../primitives/DiagStripe'
import SectionLabel from '../primitives/SectionLabel'
import { IconAcademic, IconSearch, IconActionPlan } from '../icons'

const stats = [
  { value: 'PhD', label: 'Formación académica en análisis de datos' },
  { value: '3', label: 'Pasos del diagnóstico al plan de acción' },
  { value: '1h', label: 'Primera sesión sin compromiso' },
]

const pillars = [
  {
    index: '01',
    Icon: IconAcademic,
    title: 'Fundamento académico',
    desc: 'La metodología que usamos está construida sobre investigación rigurosa a nivel doctoral. No inventamos atajos — aplicamos lo que la evidencia demuestra que funciona.',
    accent: '#0A5C4B',
  },
  {
    index: '02',
    Icon: IconSearch,
    title: 'Diagnóstico estructurado',
    desc: 'Cada análisis sigue un proceso probado: entender el contexto del negocio, identificar los datos disponibles y encontrar los patrones que realmente importan.',
    accent: '#E9C46A',
  },
  {
    index: '03',
    Icon: IconActionPlan,
    title: 'Acciones concretas, no reportes',
    desc: 'El resultado de nuestro trabajo no es una presentación bonita — es un plan de 3 a 5 acciones específicas ordenadas por impacto y facilidad de ejecución.',
    accent: '#E76F51',
  },
]

export default function Results() {
  return (
    <section id="resultados" className="bg-white py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Rigor y método</SectionLabel>
          <h2 className="section-title">Un enfoque respaldado por investigación</h2>
        </div>

        {/* Stats row — numbers as typographic monuments */}
        <div className="relative overflow-hidden grid grid-cols-3 border border-gray-200 divide-x divide-gray-200 mb-10">
          <DiagStripe color="#0A5C4B" opacity={0.04} />
          {stats.map((s) => (
            <div key={s.label} className="relative py-10 px-6 text-center">
              <p
                className="font-heading font-bold text-emerald-brand relative"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                {s.value}
              </p>
              <p className="font-mono text-gray-mid text-xs uppercase tracking-widest mt-3 relative">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {pillars.map((c) => (
            <div key={c.title} className="bg-white px-6 py-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: c.accent }} />
              <span className="ghost-number right-2 top-0">{c.index}</span>
              <p className="font-mono text-xs text-gray-mid mb-4 relative">{c.index}</p>
              <div className="mb-4 relative" style={{ color: c.accent }}><c.Icon /></div>
              <h3 className="font-heading font-bold text-slate-brand text-base mb-2 relative" style={{ letterSpacing: '-0.01em' }}>{c.title}</h3>
              <p className="font-body text-gray-mid text-sm leading-relaxed relative">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
