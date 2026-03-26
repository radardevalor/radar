import Link from 'next/link'
import SectionLabel from '../primitives/SectionLabel'

const steps = [
  {
    n: '01',
    title: 'Señales de alerta',
    desc: '7 situaciones concretas que indican si tu negocio toma decisiones con datos o con intuición.',
  },
  {
    n: '02',
    title: 'Los 5 números clave',
    desc: 'Margen bruto, punto de equilibrio, costo de adquisición y más. ¿Cuántos conoces realmente?',
  },
  {
    n: '03',
    title: 'Tu diagnóstico personalizado',
    desc: 'Una puntuación real con insights específicos basados en tus respuestas. No genérico — tuyo.',
  },
]

const trustItems = [
  'Gratuito — sin costo, siempre',
  'Sin registro ni correo',
  'Resultado inmediato y personalizado',
]

export default function DiagnosisTeaser() {
  return (
    <section id="diagnostico" className="bg-pearl py-16 md:py-24 px-4 border-t border-gray-200">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <SectionLabel>Paso 1 · Gratis · Sin registro · 3 minutos</SectionLabel>
          <h2 className="section-title mt-2">
            Empieza aquí: conoce tu punto de partida
          </h2>
          <p className="section-subtitle mt-3">
            Antes de invertir en análisis, necesitas saber dónde estás. Nuestro diagnóstico interactivo
            te da una puntuación objetiva y los gaps específicos de tu negocio — en 3 minutos, sin costo,
            sin darnos tu correo.
          </p>
        </div>

        {/* 3-step preview grid */}
        <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 mb-10">
          {steps.map((s) => (
            <div key={s.n} className="bg-white p-6 relative group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-brand" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-amber-brand opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <p className="font-mono text-xs text-gray-mid mb-3">{s.n}</p>
              <p className="font-heading font-bold text-slate-brand text-base mb-2">{s.title}</p>
              <p className="text-gray-mid text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust + CTA row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {trustItems.map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-gray-mid">
                <div className="w-1.5 h-1.5 bg-emerald-brand flex-shrink-0" />
                {t}
              </div>
            ))}
          </div>
          <Link
            href="/diagnostico"
            className="btn-primary whitespace-nowrap flex-shrink-0"
          >
            Solicita tu diagnóstico →
          </Link>
        </div>

      </div>
    </section>
  )
}
