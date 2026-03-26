'use client'

import { useState } from 'react'
import DiagStripe from '../primitives/DiagStripe'
import SectionLabel from '../primitives/SectionLabel'

const whatsappHref =
  'https://wa.me/524441428472?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20diagn%C3%B3stico%20de%20Radar%20de%20Valor.'

const inputClass =
  'w-full border border-gray-300 px-4 py-3 text-slate-brand placeholder-gray-300 font-body text-sm focus:outline-none focus:border-slate-brand transition-colors bg-white'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/xdapnaqa', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('success'); form.reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="relative overflow-hidden py-16 md:py-24 px-4" style={{ background: '#2C3E50' }}>
      <DiagStripe color="#E9C46A" opacity={0.06} />

      {/* Amber top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-amber-brand" />

      <div className="relative max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <SectionLabel>Después del diagnóstico · Paso 2</SectionLabel>
          <h2 className="font-heading font-bold text-white leading-tight mt-1"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
            Ya conoces tu puntuación.<br className="hidden sm:block" /> Convirtámosla en un plan.
          </h2>
          <p className="text-white/60 text-base mt-3">
            1 hora · sin compromiso · sin jerga · solo claridad.
          </p>
        </div>

        <div className="bg-white border-t-4 border-amber-brand p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-emerald-brand flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-2xl text-emerald-brand mb-2">Mensaje recibido</h3>
              <p className="text-gray-mid text-sm">Te contactamos en menos de 24 horas para agendar tu sesión.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="section-label block mb-1.5">Nombre *</label>
                  <input id="contact-name" name="nombre" required type="text" placeholder="Tu nombre" className={inputClass} style={{ borderRadius: 0 }} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="section-label block mb-1.5">Email *</label>
                  <input id="contact-email" name="email" required type="email" placeholder="tu@empresa.com" className={inputClass} style={{ borderRadius: 0 }} />
                </div>
              </div>
              <div>
                <label htmlFor="contact-business" className="section-label block mb-1.5">Tu negocio *</label>
                <input id="contact-business" name="negocio" required type="text" placeholder="¿A qué se dedica tu negocio?" className={inputClass} style={{ borderRadius: 0 }} />
              </div>
              <div>
                <label htmlFor="contact-challenge" className="section-label block mb-1.5">¿Cuál es tu mayor reto ahora mismo?</label>
                <textarea id="contact-challenge" name="mensaje" rows={4} placeholder="Cuéntanos brevemente..." className={`${inputClass} resize-none`} style={{ borderRadius: 0 }} />
              </div>
              {status === 'error' && (
                <p className="text-coral-brand text-sm border-l-4 border-coral-brand pl-3">
                  Hubo un error al enviar. Intenta de nuevo o escríbenos directamente.
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Agendar mi sesión de 1 hora'}
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full text-center block"
              >
                Escribir por WhatsApp
              </a>
              <p className="text-gray-mid text-xs text-center uppercase tracking-wide">
                Sin compromiso · Respondemos en menos de 24 horas.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
