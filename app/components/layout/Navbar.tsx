'use client'

import { useState } from 'react'
import { IconMenu } from '../icons'

const whatsappHref =
  'https://wa.me/524441428472?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Radar%20de%20Valor.'

const links = [
  { label: 'Qué hacemos', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#metodo' },
  { label: 'Diagnóstico', href: '/diagnostico' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Nosotros', href: '#nosotros' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-slate-brand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-heading font-bold text-emerald-brand text-xl">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <path strokeLinecap="round" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
          Radar de Valor
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-xs font-heading font-bold text-slate-brand uppercase tracking-widest">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-emerald-brand transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2.5 px-6"
          >
            WhatsApp
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-brand" aria-label="Menú">
          <IconMenu open={open} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t-2 border-slate-brand px-4 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-heading font-bold text-xs text-slate-brand hover:text-emerald-brand border-b border-gray-100 uppercase tracking-widest last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary block text-center mt-4 text-xs"
          >
            WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}
