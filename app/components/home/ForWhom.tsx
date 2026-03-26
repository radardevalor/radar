import SectionLabel from '../primitives/SectionLabel'
import { IconCheck, IconWhatsApp, IconX } from '../icons'

const whatsappHref =
  'https://wa.me/524441428472?text=Hola%2C%20no%20estoy%20seguro%20si%20mi%20negocio%20aplica%20para%20Radar%20de%20Valor.%20%C2%BFMe%20pueden%20orientar%3F'

const ideal = [
  'PYMES con 1–50 empleados que ya tienen operación y quieren crecer',
  'Comercios, tiendas online o servicios con historial de ventas',
  'Dueños que toman las decisiones y quieren datos para hacerlo mejor',
  'Negocios que sienten que podrían sacar más provecho de lo que ya hacen',
  'Directivos que quieren dejar de adivinar y empezar a actuar con certeza',
]

const notIdeal = [
  'Negocios que acaban de abrir y aún no tienen datos suficientes',
  'Empresas grandes con equipos de datos propios',
  'Quienes buscan magia: resultados sin acción ni compromiso',
  'Negocios que no están dispuestos a compartir su información',
]

export default function ForWhom() {
  return (
    <section className="bg-pearl py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Perfil de cliente</SectionLabel>
          <h2 className="section-title">¿Este servicio es para ti?</h2>
          <p className="section-subtitle mt-2 max-w-xl">
            Trabajamos mejor con ciertos tipos de negocios. La honestidad antes que la venta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-gray-300 border border-gray-300">
          {/* Yes */}
          <div className="bg-white px-8 py-7">
            <div className="border-b-2 border-emerald-brand pb-4 mb-6 flex items-center gap-3">
              <div className="w-6 h-6 bg-emerald-brand flex items-center justify-center">
                <span className="text-white font-bold text-xs">✓</span>
              </div>
              <h3 className="font-heading font-bold text-slate-brand uppercase tracking-widest text-sm">
                Sí trabajamos contigo si…
              </h3>
            </div>
            <ul className="space-y-4">
              {ideal.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-brand">
                  <span className="text-emerald-brand mt-0.5 flex-shrink-0"><IconCheck /></span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* No */}
          <div className="bg-white px-8 py-7">
            <div className="border-b-2 border-coral-brand pb-4 mb-6 flex items-center gap-3">
              <div className="w-6 h-6 bg-coral-brand flex items-center justify-center">
                <span className="text-white font-bold text-xs">✗</span>
              </div>
              <h3 className="font-heading font-bold text-slate-brand uppercase tracking-widest text-sm">
                No somos la opción si…
              </h3>
            </div>
            <ul className="space-y-4">
              {notIdeal.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-brand">
                  <span className="text-coral-brand mt-0.5 flex-shrink-0"><IconX /></span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm text-gray-mid">
          <span>¿No estás seguro si aplicas?</span>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-brand hover:text-emerald-700 transition-colors font-medium"
          >
            <IconWhatsApp />
            Cuéntanos tu caso
          </a>
        </div>
      </div>
    </section>
  )
}
