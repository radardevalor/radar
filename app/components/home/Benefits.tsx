import SectionLabel from '../primitives/SectionLabel'
import { IconChart, IconTarget, IconLightning, IconUsers } from '../icons'

const items = [
  {
    index: '01',
    Icon: IconChart,
    title: 'Más valor con las mismas acciones',
    desc: 'Identificamos qué productos, clientes o canales generan el mayor ingreso para que pongas tu energía donde realmente importa.',
  },
  {
    index: '02',
    Icon: IconTarget,
    title: 'Decisiones con certeza',
    desc: 'Cada decisión de negocio respaldada por lo que realmente pasa en tus números. Sin adivinar.',
  },
  {
    index: '03',
    Icon: IconLightning,
    title: 'Operación más eficiente',
    desc: 'Detectamos cuellos de botella y gastos que no generan valor, para que tu negocio funcione mejor con los mismos recursos.',
  },
  {
    index: '04',
    Icon: IconUsers,
    title: 'Clientes más leales',
    desc: 'Entendemos los patrones de comportamiento de tus mejores clientes para que puedas conseguir más como ellos.',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="bg-white py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Lo que obtienes</SectionLabel>
          <h2 className="section-title">Lo que cambia en tu negocio</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {items.map((item) => (
            <div key={item.title} className="bg-white px-6 py-8 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-emerald-brand opacity-0 group-hover:opacity-100 transition-opacity" />
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
