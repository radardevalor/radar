import DiagStripe from '../primitives/DiagStripe'
import SectionLabel from '../primitives/SectionLabel'

const stats = [
  { value: 'PhD', label: 'Formación académica en análisis de datos' },
  { value: '3', label: 'Pasos del diagnóstico al plan de acción' },
  { value: '1h', label: 'Primera sesión sin compromiso' },
]

const pillars = [
  {
    index: '01',
    icon: '🎓',
    title: 'Fundamento académico',
    desc: 'La metodología que usamos está construida sobre investigación rigurosa a nivel doctoral. No inventamos atajos — aplicamos lo que la evidencia demuestra que funciona.',
    accent: '#0A5C4B',
  },
  {
    index: '02',
    icon: '🔍',
    title: 'Diagnóstico estructurado',
    desc: 'Cada análisis sigue un proceso probado: entender el contexto del negocio, identificar los datos disponibles y encontrar los patrones que realmente importan.',
    accent: '#E9C46A',
  },
  {
    index: '03',
    icon: '🎯',
    title: 'Acciones concretas, no reportes',
    desc: 'El resultado de nuestro trabajo no es una presentación bonita — es un plan de 3 a 5 acciones específicas ordenadas por impacto y facilidad de ejecución.',
    accent: '#E76F51',
  },
]

export default function Results() {
  return (
    <section id="resultados" className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Rigor y método</SectionLabel>
          <h2 className="section-title">Un enfoque respaldado por investigación</h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 border border-gray-200 mb-10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative overflow-hidden py-8 px-6 text-center ${i < 2 ? 'border-r border-gray-200' : ''}`}
            >
              <DiagStripe color="#0A5C4B" opacity={0.04} />
              <p className="relative font-mono font-bold text-3xl text-emerald-brand mb-1">{s.value}</p>
              <p className="relative text-gray-mid text-xs uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {pillars.map((c) => (
            <div key={c.title} className="bg-white px-6 py-7 relative">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: c.accent }} />
              <p className="font-mono text-xs text-gray-mid mb-3">{c.index}</p>
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-heading font-bold text-slate-brand text-base mb-2">{c.title}</h3>
              <p className="text-gray-mid text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
