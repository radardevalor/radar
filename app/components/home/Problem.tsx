import SectionLabel from '../primitives/SectionLabel'

const items = [
  {
    index: '01',
    icon: '📊',
    title: 'Tienes datos pero no respuestas',
    desc: 'Sientes que tu negocio genera información valiosa, pero no sabes qué hacer con ella ni qué preguntar.',
  },
  {
    index: '02',
    icon: '🤔',
    title: 'Decisiones por intuición',
    desc: 'Lanzas campañas, contratas personal o cambias precios sin números que te respalden. A veces funciona, a veces no.',
  },
  {
    index: '03',
    icon: '⏱️',
    title: 'Sin tiempo para analizar',
    desc: 'El día a día absorbe todo tu tiempo. El análisis siempre queda "para después" y ese después nunca llega.',
  },
]

export default function Problem() {
  return (
    <section className="bg-pearl py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
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
            <div key={item.title} className="bg-white px-6 py-7 relative overflow-hidden group">
              {/* Accent line top */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-brand opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="font-mono text-xs text-gray-mid mb-4">{item.index}</p>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-heading font-bold text-slate-brand text-base mb-2">{item.title}</h3>
              <p className="text-gray-mid text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
