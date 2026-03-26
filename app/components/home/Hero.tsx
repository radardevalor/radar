import Link from 'next/link'
import DiagStripe from '../primitives/DiagStripe'
import SectionLabel from '../primitives/SectionLabel'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)',
        paddingBottom: '8rem',
        paddingTop: '5rem',
      }}
    >
      <DiagStripe color="#0A5C4B" opacity={0.04} />

      <div className="relative max-w-4xl mx-auto px-4 text-center">

        {/* Amber vertical accent + stat */}
        <div className="inline-flex items-stretch gap-4 mb-10">
          <div className="w-1 bg-amber-brand self-stretch" />
          <div className="text-left">
            <SectionLabel>Dato verificado · BARC Data Culture Survey</SectionLabel>
            <p className="text-slate-brand font-heading font-semibold text-sm max-w-lg">
              El 58% de las empresas basa al menos la mitad de sus decisiones habituales en intuición,
              no en datos.{' '}
              <a
                href="https://barc.com/business-decisions-gut-feel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-mid underline underline-offset-2 hover:text-emerald-brand transition-colors font-normal"
              >
                697 tomadores de decisiones encuestados.
              </a>
            </p>
          </div>
        </div>

        <h1 className="font-heading font-bold text-slate-brand leading-none mb-6"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}>
          Detecta y activa{' '}
          <span className="text-emerald-brand">el valor oculto</span>{' '}
          en tu negocio.
        </h1>

        <p className="text-gray-mid text-xl leading-relaxed mb-3 max-w-2xl mx-auto">
          Convertimos los datos de tu negocio en decisiones claras y accionables.
          Sin rollos — solo claridad para crecer.
        </p>
        <p className="text-gray-mid text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Tu experiencia tiene valor. Los datos la hacen irrefutable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/diagnostico" className="btn-primary w-full sm:w-auto text-center">
            Solicita tu diagnóstico
          </Link>
          <a href="#metodo" className="btn-outline w-full sm:w-auto text-center">
            Ver cómo funciona
          </a>
        </div>
        <p className="text-gray-mid text-sm mt-4">Gratis · Sin registro · Resultado inmediato.</p>

        {/* Trust badges — sharp, bordered */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 border-t border-gray-200">
          {[
            { value: '1 hora', label: 'Primera consulta' },
            { value: 'PhD', label: 'Formación doctoral' },
            { value: '0', label: 'Tecnicismos innecesarios' },
            { value: '∞', label: 'Claridad para decidir' },
          ].map((b, i) => (
            <div
              key={b.label}
              className={`py-5 px-4 text-center ${i < 3 ? 'border-r border-gray-200' : ''}`}
            >
              <p className="font-mono font-bold text-2xl text-emerald-brand">{b.value}</p>
              <p className="text-gray-mid text-xs mt-1 uppercase tracking-wide">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
