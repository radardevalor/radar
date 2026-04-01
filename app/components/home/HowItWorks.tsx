import Link from 'next/link'
import DiagStripe from '../primitives/DiagStripe'
import SectionLabel from '../primitives/SectionLabel'
import { IconWhatsApp } from '../icons'

const whatsappHref =
  'https://wa.me/524441428472?text=Hola%2C%20quiero%20agendar%20una%20sesi%C3%B3n%20de%20trabajo%20con%20Radar%20de%20Valor.'

const steps = [
  {
    number: '01',
    title: 'Calibración inicial',
    desc: '12 preguntas construidas sobre metodología doctoral. En 3 minutos obtienes tu puntuación de madurez analítica, tu nivel de exposición y los gaps que más te cuestan. Gratis, sin registro.',
    accentColor: '#0A5C4B',
  },
  {
    number: '02',
    title: 'Lectura de señal',
    desc: 'Una hora para revisar tus datos reales — ventas, márgenes, clientes — y separar el ruido de lo que realmente importa. Sin tecnicismos. Solo lo que cambia tu siguiente decisión.',
    accentColor: '#E9C46A',
  },
  {
    number: '03',
    title: 'Plan calibrado',
    desc: 'Las 3–5 acciones con mayor retorno, ordenadas por impacto y facilidad de ejecución. No un reporte — un mapa de decisiones específico para tu negocio, ejecutable desde el día siguiente.',
    accentColor: '#E76F51',
  },
]

export default function HowItWorks() {
  return (
    <section id="metodo" className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6" style={{ background: '#2C3E50' }}>
      <DiagStripe color="#E9C46A" opacity={0.05} />

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-12">
          <SectionLabel light>El método</SectionLabel>
          <h2
            className="font-heading font-bold text-white mt-1"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Tres pasos. Un sistema.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {steps.map((step) => (
            <div key={step.number} className="relative overflow-hidden px-5 sm:px-8 py-8 sm:py-10" style={{ background: '#2C3E50' }}>
              {/* Colored top border */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: step.accentColor }} />
              {/* Ghost number — massive, constructivist */}
              <span
                className="absolute font-heading font-extrabold select-none pointer-events-none"
                style={{
                  fontSize: 'clamp(6rem, 14vw, 11rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  opacity: 0.04,
                  right: '-0.1em',
                  top: '-0.1em',
                }}
              >
                {step.number}
              </span>
              <p
                className="font-mono font-bold mb-5 leading-none relative"
                style={{ color: step.accentColor, fontSize: '0.7rem', letterSpacing: '0.15em' }}
              >
                {step.number}
              </p>
              <h3
                className="font-heading font-bold text-white mb-3 relative"
                style={{ fontSize: '1.2rem', letterSpacing: '-0.01em' }}
              >
                {step.title}
              </h3>
              <p className="font-body text-white/60 text-sm leading-relaxed relative">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
          <Link href="/diagnostico" className="btn-primary">
            Solicita tu diagnóstico
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <IconWhatsApp />
            o agenda por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
