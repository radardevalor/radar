'use client'

import { useState, useEffect } from 'react'
import { IconMenu, IconWhatsApp } from '../icons'

const whatsappHref =
  'https://wa.me/524441428472?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Radar%20de%20Valor.'

const links = [
  { label: 'Qué hacemos', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#metodo' },
  { label: 'Diagnóstico', href: '/diagnostico' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Nosotros', href: '#nosotros' },
]

const sectionIds = ['beneficios', 'metodo', 'portafolio', 'nosotros']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav
      className="sticky top-0 z-50 bg-white border-b-2 border-slate-brand transition-shadow duration-300"
      style={{ boxShadow: scrolled ? '0 4px 24px rgba(44,62,80,0.10)' : 'none' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-heading font-bold text-emerald-brand text-lg sm:text-xl">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <path strokeLinecap="round" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
          <span className="whitespace-nowrap">Radar de Valor</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-xs font-heading font-bold text-slate-brand uppercase tracking-widest">
          {links.map((l) => {
            const id = l.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`transition-colors ${isActive ? 'text-emerald-brand' : 'hover:text-emerald-brand'}`}
                >
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2"
          >
            <IconWhatsApp />
            Escribir
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-brand p-2 -mr-2"
          aria-label="Menú"
          aria-expanded={open}
        >
          <IconMenu open={open} />
        </button>
      </div>

      {/* Mobile menu — smooth slide-down */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '400px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="bg-white border-t-2 border-slate-brand px-4 sm:px-6 pb-5 pt-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center py-3.5 font-heading font-bold text-xs text-slate-brand hover:text-emerald-brand border-b border-gray-100 uppercase tracking-widest last:border-0 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary w-full text-center mt-4 text-xs gap-2"
          >
            <IconWhatsApp />
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}
