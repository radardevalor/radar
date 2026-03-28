import SectionLabel from '../primitives/SectionLabel'
import { IconBarChart, IconQuestion, IconClock } from '../icons'

const items = [
  {
    index: '01',
    Icon: IconBarChart,
    title: 'Tienes datos pero no respuestas',
    desc: 'Sientes que tu negocio genera información valiosa, pero no sabes qué hacer con ella ni qué preguntar.',
  },
  {
    index: '02',
    Icon: IconQuestion,
    title: 'Decisiones por intuición',
    desc: 'Lanzas campañas, contratas personal o cambias precios sin números que te respalden. A veces funciona, a veces no.',
  },
  {
    index: '03',
    Icon: IconClock,
    title: 'Sin tiempo para analizar',
    desc: 'El día a día absorbe todo tu tiempo. El análisis siempre queda "para después" y ese después nunca llega.',
  },
]

export default function Problem() {
  return (
    <section className="bg-pearl py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <SectionLabel>El problema que resolvemos</SectionLabel>
          <h2 className="section-title mb-4">¿Te suena familiar?</h2>
          <p className="text-slate-brand text-lg leading-relaxed max-w-2xl">
            La intuición no está mal —{' '}
            <strong className="text-emerald-brand">
              el problema es decidir sin saber si tienes razón.
            </strong>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {items.map((item) => (
            <div key={item.title} className="bg-white px-6 py-8 relative overflow-hidden group">
              {/* Left-border hover accent */}
              <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-emerald-brand opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Ghost index — Constructivist background typography */}
              <span className="ghost-number right-2 top-0">{item.index}</span>
              <p className="font-mono text-xs text-gray-mid mb-5 relative">{item.index}</p>
              <div className="text-emerald-brand mb-4 relative"><item.Icon /></div>
              <h3 className="font-heading font-bold text-slate-brand text-base mb-2 relative" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
              <p className="font-body text-gray-mid text-sm leading-relaxed relative">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
