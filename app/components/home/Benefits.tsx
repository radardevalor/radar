import SectionLabel from '../primitives/SectionLabel'
import { IconChart, IconTarget, IconLightning, IconUsers } from '../icons'

const items = [
  {
    index: '01',
    Icon: IconChart,
    title: 'Enfoca donde más importa',
    desc: 'Identificamos el 20% de productos, clientes o canales que generan el 80% de tu valor real — para que dejes de dispersar energía en lo que no mueve el negocio.',
  },
  {
    index: '02',
    Icon: IconTarget,
    title: 'Decide con evidencia, no con esperanza',
    desc: 'Cada acción de negocio respaldada por lo que realmente ocurre en tus datos — no por lo que crees que ocurre. La diferencia puede ser muy grande.',
  },
  {
    index: '03',
    Icon: IconLightning,
    title: 'Descubre qué te cuesta sin rendir',
    desc: 'Detectamos los gastos invisibles, los cuellos de botella silenciosos y los productos que ocupan espacio sin generar valor real. Ahí está el margen escondido.',
  },
  {
    index: '04',
    Icon: IconUsers,
    title: 'Replica a tus mejores clientes',
    desc: 'Decodificamos el patrón de comportamiento de tus clientes más valiosos — para que sepas exactamente cómo conseguir más como ellos y retener a los que ya tienes.',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="bg-white py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Lo que obtienes</SectionLabel>
          <h2 className="section-title">De adivinar a saber</h2>
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
