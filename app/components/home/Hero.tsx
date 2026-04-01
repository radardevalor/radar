import Link from 'next/link'
import DiagStripe from '../primitives/DiagStripe'
import SectionLabel from '../primitives/SectionLabel'
import { IconWhatsApp } from '../icons'

const whatsappHref =
  'https://wa.me/524441428472?text=Hola%2C%20me%20interesa%20el%20diagn%C3%B3stico%20de%20Radar%20de%20Valor.'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 94%, 0 100%)',
        paddingBottom: 'clamp(4rem, 10vw, 8rem)',
        paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
      }}
    >
      <DiagStripe color="#0A5C4B" opacity={0.03} />

      {/* Constructivist amber diagonal block — breaks the Swiss grid intentionally */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          right: 0,
          width: '38%',
          height: '100%',
          background: '#E9C46A',
          clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0% 100%)',
          opacity: 0.06,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* BARC data citation — Swiss precision, left-anchored */}
        <div className="inline-flex items-stretch gap-3 mb-10">
          <div className="w-0.5 bg-amber-brand self-stretch" />
          <div>
            <SectionLabel>Dato verificado · BARC Data Culture Survey</SectionLabel>
            <p className="text-slate-brand font-body text-sm max-w-lg leading-relaxed mt-0.5">
              El{' '}
              <span className="font-heading font-extrabold text-emerald-brand" style={{ fontSize: '1.1em' }}>
                58%
              </span>{' '}
              de las empresas basa al menos la mitad de sus decisiones en intuición, no en datos.{' '}
              <a
                href="https://barc.com/business-decisions-gut-feel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-mid underline underline-offset-2 hover:text-emerald-brand transition-colors"
              >
                697 tomadores de decisiones encuestados.
              </a>
            </p>
          </div>
        </div>

        {/* Headline — Sora Bold, institutional scale, left-aligned */}
        <h1
          className="font-heading font-bold text-slate-brand mb-6"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
          }}
        >
          Detecta y activa{' '}
          <span
            className="text-emerald-brand relative inline-block"
          >
            el valor oculto
          </span>{' '}
          <br className="hidden sm:block" />
          en tu negocio.
        </h1>

        <p className="font-body text-gray-mid text-xl leading-relaxed mb-2 max-w-2xl">
          Tu negocio ya genera los datos que necesitas para decidir con certeza.
          El problema nunca fue la información — fue saber qué preguntarle.
        </p>
        <p className="font-body text-gray-mid text-base leading-relaxed mb-10 max-w-xl">
          Convertimos tus ventas, márgenes y patrones de clientes en un plan de acción concreto. Sin tecnicismos. Solo la siguiente decisión.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Link href="/diagnostico" className="btn-primary w-full sm:w-auto text-center">
            Solicita tu diagnóstico
          </Link>
          <a href="#metodo" className="btn-outline w-full sm:w-auto text-center">
            Ver cómo funciona
          </a>
        </div>

        <p className="font-mono text-gray-mid text-xs mt-4 uppercase tracking-widest">
          Gratis · Sin registro · Resultado inmediato.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 text-sm text-emerald-brand hover:text-emerald-700 transition-colors font-body"
        >
          <IconWhatsApp />
          ¿Prefieres hablar directo? Escríbenos al WhatsApp
        </a>

        {/* Trust data bar — Swiss grid, monospaced, analytical */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 border border-gray-200 divide-x divide-y divide-gray-200">
          {[
            { value: '1 hora', label: 'Primera consulta' },
            { value: 'PhD', label: 'Formación doctoral' },
            { value: '0', label: 'Tecnicismos innecesarios' },
            { value: '∞', label: 'Claridad para decidir' },
          ].map((b) => (
            <div key={b.label} className="py-5 px-4 text-center">
              <p
                className="font-heading font-bold text-emerald-brand"
                style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
              >
                {b.value}
              </p>
              <p className="font-mono text-gray-mid text-xs mt-1.5 uppercase tracking-widest">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
