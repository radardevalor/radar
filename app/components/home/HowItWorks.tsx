import Link from 'next/link'
import DiagStripe from '../primitives/DiagStripe'
import SectionLabel from '../primitives/SectionLabel'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico en línea',
    desc: 'Responde 12 preguntas concretas sobre tu negocio. En 3 minutos obtienes tu puntuación, tu nivel de exposición y los gaps específicos que más te afectan. Gratis, sin registro.',
    accentColor: '#0A5C4B',
  },
  {
    number: '02',
    title: 'Sesión de trabajo',
    desc: 'Si quieres profundizar, agendamos 1 hora para revisar juntos tus datos reales — ventas, márgenes, clientes — y encontrar los patrones que importan. Sin tecnicismos.',
    accentColor: '#E9C46A',
  },
  {
    number: '03',
    title: 'Plan de acción',
    desc: 'Te entregamos un plan con las 3–5 acciones concretas ordenadas por impacto. No un reporte genérico — acciones específicas para tu negocio, ejecutables de inmediato.',
    accentColor: '#E76F51',
  },
]

export default function HowItWorks() {
  return (
    <section id="metodo" className="relative overflow-hidden py-16 md:py-24 px-4" style={{ background: '#2C3E50' }}>
      <DiagStripe color="#E9C46A" opacity={0.05} />

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-12">
          <SectionLabel>El método</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white leading-tight">
            Cómo funciona
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {steps.map((step) => (
            <div key={step.number} className="relative overflow-hidden px-8 py-8" style={{ background: '#2C3E50' }}>
              {/* Colored top border */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: step.accentColor }} />
              <p className="font-mono font-bold text-white/30 text-4xl mb-4 leading-none">{step.number}</p>
              <h3 className="font-heading font-bold text-white text-xl mb-3">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link href="/diagnostico" className="btn-primary">
            Solicita tu diagnóstico
          </Link>
          <p className="text-white/50 text-sm">Gratis · Sin registro · 3 minutos.</p>
        </div>
      </div>
    </section>
  )
}
