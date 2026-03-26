'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ─── UTILITIES ──────────────────────────────────────────────────────────── */
function fmtNum(value: number, decimals: number): string {
  return value.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

/* ─── DIAGONAL ACCENT (shared visual primitive) ──────────────────────────── */
function DiagStripe({ color = '#E9C46A', opacity = 0.08 }: { color?: string; opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <line x1="-10%" y1="110%" x2="110%" y2="-10%" stroke={color} strokeWidth="50" opacity={opacity} />
        <line x1="-10%" y1="130%" x2="130%" y2="-10%" stroke={color} strokeWidth="25" opacity={opacity * 0.55} />
        <line x1="-10%" y1="150%" x2="150%" y2="-10%" stroke={color} strokeWidth="14" opacity={opacity * 0.35} />
      </svg>
    </div>
  )
}

/* ─── SECTION LABEL ──────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-label mb-2">{children}</p>
  )
}

/* ─── ICONS ──────────────────────────────────────────────────────────────── */
function IconChart() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l4-4 4 4 4-6 4 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
    </svg>
  )
}
function IconTarget() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  )
}
function IconLightning() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}
function IconUsers() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
function IconX() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
function IconMenu({ open }: { open: boolean }) {
  return open ? (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'Qué hacemos', href: '#beneficios' },
    { label: 'Cómo funciona', href: '#metodo' },
    { label: 'Diagnóstico', href: '/diagnostico' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'Nosotros', href: '#nosotros' },
  ]
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
        <Link href="/diagnostico" className="hidden md:inline-block btn-primary text-xs py-2.5 px-6">
          Solicita tu diagnóstico
        </Link>

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
          <Link href="/diagnostico" onClick={() => setOpen(false)} className="btn-primary block text-center mt-4 text-xs">
            Solicita tu diagnóstico
          </Link>
        </div>
      )}
    </nav>
  )
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero() {
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

/* ─── PROBLEM ────────────────────────────────────────────────────────────── */
function Problem() {
  const items = [
    {
      index: '01',
      icon: '📊',
      title: 'Tienes datos pero no respuestas',
      desc: 'Sientes que tu negocio genera información valiosa, pero no sabes qué hacer con ella ni qué preguntar.',
    },
    {
      index: '02',
      icon: '🤔',
      title: 'Decisiones por intuición',
      desc: 'Lanzas campañas, contratas personal o cambias precios sin números que te respalden. A veces funciona, a veces no.',
    },
    {
      index: '03',
      icon: '⏱️',
      title: 'Sin tiempo para analizar',
      desc: 'El día a día absorbe todo tu tiempo. El análisis siempre queda "para después" y ese después nunca llega.',
    },
  ]
  return (
    <section className="bg-pearl py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <SectionLabel>El problema que resolvemos</SectionLabel>
          <h2 className="section-title mb-4">¿Te suena familiar?</h2>
          <p className="text-slate-brand text-lg leading-relaxed max-w-2xl">
            La intuición no está mal —{' '}
            <strong className="text-emerald-brand">
              el problema es decidir sin saber si tienes razón.
            </strong>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {items.map((item) => (
            <div key={item.title} className="bg-white px-6 py-7 relative overflow-hidden group">
              {/* Accent line top */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-brand opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="font-mono text-xs text-gray-mid mb-4">{item.index}</p>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-heading font-bold text-slate-brand text-base mb-2">{item.title}</h3>
              <p className="text-gray-mid text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── BENEFITS ───────────────────────────────────────────────────────────── */
function Benefits() {
  const items = [
    {
      index: '01',
      icon: <IconChart />,
      title: 'Más valor con las mismas acciones',
      desc: 'Identificamos qué productos, clientes o canales generan el mayor ingreso para que pongas tu energía donde realmente importa.',
    },
    {
      index: '02',
      icon: <IconTarget />,
      title: 'Decisiones con certeza',
      desc: 'Cada decisión de negocio respaldada por lo que realmente pasa en tus números. Sin adivinar.',
    },
    {
      index: '03',
      icon: <IconLightning />,
      title: 'Operación más eficiente',
      desc: 'Detectamos cuellos de botella y gastos que no generan valor, para que tu negocio funcione mejor con los mismos recursos.',
    },
    {
      index: '04',
      icon: <IconUsers />,
      title: 'Clientes más leales',
      desc: 'Entendemos los patrones de comportamiento de tus mejores clientes para que puedas conseguir más como ellos.',
    },
  ]
  return (
    <section id="beneficios" className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Lo que obtienes</SectionLabel>
          <h2 className="section-title">Lo que cambia en tu negocio</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {items.map((item) => (
            <div key={item.title} className="bg-white px-6 py-7 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-emerald-brand opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="font-mono text-xs text-gray-mid mb-4">{item.index}</p>
              <div className="text-emerald-brand mb-4">{item.icon}</div>
              <h3 className="font-heading font-bold text-slate-brand text-base mb-2">{item.title}</h3>
              <p className="text-gray-mid text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── HOW IT WORKS ───────────────────────────────────────────────────────── */
function WhatWeDoSimulator() {
  const [price, setPrice] = useState(250)
  const [unitCost, setUnitCost] = useState(140)
  const [volume, setVolume] = useState(800)
  const [fixedCost, setFixedCost] = useState(25000)

  const revenue = price * volume
  const totalCost = unitCost * volume
  const profit = revenue - totalCost
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0
  const breakEvenUnits = price > unitCost ? fixedCost / (price - unitCost) : null

  const chartData = [
    { label: 'Ingreso', value: revenue, color: '#0A5C4B' },
    { label: 'Costo total', value: totalCost, color: '#E76F51' },
    { label: 'Utilidad', value: Math.max(profit, 0), color: '#E9C46A' },
  ]
  const maxValue = Math.max(...chartData.map((d) => d.value), 1)

  const applyScenario = (type: 'conservador' | 'base' | 'agresivo') => {
    if (type === 'conservador') {
      setPrice(220)
      setUnitCost(150)
      setVolume(500)
      setFixedCost(25000)
      return
    }
    if (type === 'base') {
      setPrice(250)
      setUnitCost(140)
      setVolume(800)
      setFixedCost(25000)
      return
    }
    setPrice(290)
    setUnitCost(145)
    setVolume(1200)
    setFixedCost(30000)
  }

  const rangeClass = 'w-full accent-emerald-brand'
  const inputClass =
    'w-full border border-gray-300 px-3 py-2 text-slate-brand font-mono text-sm focus:outline-none focus:border-slate-brand bg-white'

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <SectionLabel>Lo que hacemos</SectionLabel>
          <h2 className="section-title">Así convertimos datos en decisiones</h2>
          <p className="section-subtitle mt-2 max-w-2xl">
            Ajusta variables reales de negocio y observa en tiempo real cómo cambia la utilidad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-gray-300 border border-gray-300">
          <div className="bg-pearl p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              <button type="button" onClick={() => applyScenario('conservador')} className="btn-outline text-xs py-2 px-3">
                Conservador
              </button>
              <button type="button" onClick={() => applyScenario('base')} className="btn-outline text-xs py-2 px-3">
                Base
              </button>
              <button type="button" onClick={() => applyScenario('agresivo')} className="btn-outline text-xs py-2 px-3">
                Agresivo
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="sim-price" className="section-label !mb-0">Precio unitario (MXN)</label>
                  <input id="sim-price" type="number" min={1} value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} className={inputClass} style={{ maxWidth: 130, borderRadius: 0 }} />
                </div>
                <input type="range" min={50} max={1000} step={5} value={price} onChange={(e) => setPrice(Number(e.target.value))} className={rangeClass} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="sim-cost" className="section-label !mb-0">Costo unitario (MXN)</label>
                  <input id="sim-cost" type="number" min={0} value={unitCost} onChange={(e) => setUnitCost(Number(e.target.value) || 0)} className={inputClass} style={{ maxWidth: 130, borderRadius: 0 }} />
                </div>
                <input type="range" min={20} max={900} step={5} value={unitCost} onChange={(e) => setUnitCost(Number(e.target.value))} className={rangeClass} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="sim-volume" className="section-label !mb-0">Volumen mensual (unidades)</label>
                  <input id="sim-volume" type="number" min={0} value={volume} onChange={(e) => setVolume(Number(e.target.value) || 0)} className={inputClass} style={{ maxWidth: 130, borderRadius: 0 }} />
                </div>
                <input type="range" min={0} max={5000} step={25} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className={rangeClass} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="sim-fixed" className="section-label !mb-0">Costo fijo mensual (MXN)</label>
                  <input id="sim-fixed" type="number" min={0} value={fixedCost} onChange={(e) => setFixedCost(Number(e.target.value) || 0)} className={inputClass} style={{ maxWidth: 130, borderRadius: 0 }} />
                </div>
                <input type="range" min={0} max={200000} step={500} value={fixedCost} onChange={(e) => setFixedCost(Number(e.target.value))} className={rangeClass} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6">
            <div className="grid grid-cols-2 gap-px bg-gray-300 border border-gray-300 mb-6">
              <div className="bg-white p-4">
                <p className="section-label">Ingreso mensual</p>
                <p className="font-mono font-bold text-slate-brand text-lg">${fmtNum(revenue, 0)}</p>
              </div>
              <div className="bg-white p-4">
                <p className="section-label">Utilidad mensual</p>
                <p className={`font-mono font-bold text-lg ${profit >= 0 ? 'text-emerald-brand' : 'text-coral-brand'}`}>
                  ${fmtNum(profit, 0)}
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="section-label">Margen</p>
                <p className={`font-mono font-bold text-lg ${margin >= 0 ? 'text-slate-brand' : 'text-coral-brand'}`}>
                  {fmtNum(margin, 1)}%
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="section-label">Punto de equilibrio</p>
                <p className="font-mono font-bold text-slate-brand text-lg">
                  {breakEvenUnits ? `${fmtNum(breakEvenUnits, 0)} uds` : 'No alcanzable'}
                </p>
              </div>
            </div>

            {price <= unitCost && (
              <p className="text-coral-brand text-sm border-l-4 border-coral-brand pl-3 mb-5">
                El precio unitario debe ser mayor al costo unitario para alcanzar utilidad positiva.
              </p>
            )}

            <div className="border border-gray-300 p-4">
              <p className="section-label mb-4">Gráfica comparativa</p>
              <div className="h-52 flex items-end gap-3">
                {chartData.map((bar) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                    <div className="h-40 w-full bg-gray-100 flex items-end">
                      <div
                        title={`${bar.label}: $${fmtNum(bar.value, 0)} MXN`}
                        className="w-full transition-all duration-200"
                        style={{ height: `${(bar.value / maxValue) * 100}%`, background: bar.color }}
                      />
                    </div>
                    <p className="text-xs font-heading font-bold uppercase tracking-widest text-gray-mid text-center">{bar.label}</p>
                    <p className="font-mono text-xs text-slate-brand">${fmtNum(bar.value, 0)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
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

/* ─── APPROACH ───────────────────────────────────────────────────────────── */
function Results() {
  return (
    <section id="resultados" className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Rigor y método</SectionLabel>
          <h2 className="section-title">Un enfoque respaldado por investigación</h2>
        </div>

        {/* Stats row — sharp bordered cells */}
        <div className="grid grid-cols-3 border border-gray-200 mb-10">
          {[
            { value: 'PhD', label: 'Formación académica en análisis de datos' },
            { value: '3', label: 'Pasos del diagnóstico al plan de acción' },
            { value: '1h', label: 'Primera sesión sin compromiso' },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`relative overflow-hidden py-8 px-6 text-center ${i < 2 ? 'border-r border-gray-200' : ''}`}
            >
              <DiagStripe color="#0A5C4B" opacity={0.04} />
              <p className="relative font-mono font-bold text-3xl text-emerald-brand mb-1">{s.value}</p>
              <p className="relative text-gray-mid text-xs uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {[
            {
              index: '01',
              icon: '🎓',
              title: 'Fundamento académico',
              desc: 'La metodología que usamos está construida sobre investigación rigurosa a nivel doctoral. No inventamos atajos — aplicamos lo que la evidencia demuestra que funciona.',
              accent: '#0A5C4B',
            },
            {
              index: '02',
              icon: '🔍',
              title: 'Diagnóstico estructurado',
              desc: 'Cada análisis sigue un proceso probado: entender el contexto del negocio, identificar los datos disponibles y encontrar los patrones que realmente importan.',
              accent: '#E9C46A',
            },
            {
              index: '03',
              icon: '🎯',
              title: 'Acciones concretas, no reportes',
              desc: 'El resultado de nuestro trabajo no es una presentación bonita — es un plan de 3 a 5 acciones específicas ordenadas por impacto y facilidad de ejecución.',
              accent: '#E76F51',
            },
          ].map((c) => (
            <div key={c.title} className="bg-white px-6 py-7 relative">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: c.accent }} />
              <p className="font-mono text-xs text-gray-mid mb-3">{c.index}</p>
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-heading font-bold text-slate-brand text-base mb-2">{c.title}</h3>
              <p className="text-gray-mid text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── DIAGNOSIS TEASER ───────────────────────────────────────────────────── */

function DiagnosisTeaser() {
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
              {/* top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-brand" />
              {/* left hover accent */}
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
            {[
              'Gratuito — sin costo, siempre',
              'Sin registro ni correo',
              'Resultado inmediato y personalizado',
            ].map((t) => (
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

function ForWhom() {
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
      </div>
    </section>
  )
}

/* ─── PORTFOLIO ──────────────────────────────────────────────────────────── */
function Portfolio() {
  const projects = [
    {
      index: '01',
      tag: 'DEMO INTERACTIVO',
      title: 'Análisis de costos de importación',
      desc: 'Tipos de cambio en tiempo real (USD, EUR, GBP → MXN), cálculo de promedio ponderado de exposición cambiaria y análisis de riesgo por moneda. Datos de open.er-api.com actualizados diariamente.',
      meta: 'API abierta · Cálculo en vivo · Multidivisa',
      href: '/dashboard',
      cta: 'Ver demo en vivo',
      accentColor: '#0A5C4B',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l4-4 4 4 4-6 4 2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
        </svg>
      ),
    },
    {
      index: '02',
      tag: 'ANÁLISIS COMPLETO',
      title: 'Café Sales Analysis — Where the Numbers Point',
      desc: 'Análisis de ventas anuales 2025 para un café: ranking de productos, detección de merma encubierta en cookies, hallazgo crítico de ventas sin clasificar y plan de acción de 3 pasos.',
      meta: 'Ene–Dic 2025 · Rendimiento de producto · Recomendaciones',
      href: '/portfolio/cafe',
      cta: 'Ver análisis',
      accentColor: '#E9C46A',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h4" />
        </svg>
      ),
    },
  ]

  return (
    <section id="portafolio" className="bg-pearl py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Trabajo real · Casos de estudio</SectionLabel>
          <h2 className="section-title">Lo que hacemos en la práctica</h2>
          <p className="section-subtitle mt-2 max-w-xl">
            Análisis reales con datos reales. Así se ve el trabajo de Radar de Valor.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-gray-300 border border-gray-300">
          {projects.map((p) => (
            <div key={p.index} className="bg-white px-6 py-7 relative overflow-hidden group flex flex-col">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.accentColor }} />
              {/* Left hover accent */}
              <div
                className="absolute top-0 left-0 w-0.5 h-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: p.accentColor }}
              />

              <div className="relative flex-1">
                <div className="flex items-start justify-between mb-4">
                  <p className="font-mono text-xs text-gray-mid">{p.index}</p>
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 uppercase border"
                    style={{ borderColor: p.accentColor, color: p.accentColor }}
                  >
                    {p.tag}
                  </span>
                </div>

                <div className="mb-4" style={{ color: p.accentColor }}>
                  {p.icon}
                </div>

                <h3 className="font-heading font-bold text-slate-brand text-lg mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-gray-mid text-sm leading-relaxed mb-4">{p.desc}</p>
                <p className="font-mono text-xs text-gray-mid uppercase tracking-wide">{p.meta}</p>
              </div>

              <div className="relative mt-6 pt-5 border-t border-gray-100">
                <Link
                  href={p.href}
                  className="btn-outline text-xs py-2.5 px-5 inline-block"
                  style={{ borderColor: p.accentColor, color: p.accentColor }}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT ──────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="nosotros" className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div>
            <SectionLabel>Sobre nosotros</SectionLabel>
            <h2 className="section-title mt-1 mb-6">Hola, somos Radar de Valor</h2>

            <p className="text-slate-brand leading-relaxed mb-4">
              Tenemos formación doctoral en análisis de datos y una convicción clara: el conocimiento
              académico más riguroso solo vale si se puede traducir en acciones concretas para
              negocios reales. Eso es exactamente lo que hacemos.
            </p>
            <p className="text-slate-brand leading-relaxed mb-4">
              Nuestro enfoque combina el rigor de la investigación con la claridad que necesita
              un dueño de negocio: sin tecnicismos, sin rodeos, solo lo que importa para
              tomar mejores decisiones.
            </p>
            <p className="text-slate-brand leading-relaxed mb-8">
              Construimos Radar de Valor porque creemos que las PYMES merecen el mismo
              nivel de análisis que tienen las grandes empresas — accesible, práctico y sin
              necesidad de tener un equipo de datos propio.
            </p>

            {/* Tags — sharp, bordered */}
            <div className="flex flex-wrap gap-2">
              {[
                'Doctorado en análisis de datos',
                'Inteligencia de negocio',
                'Optimización operativa',
                'Estrategia basada en evidencia',
              ].map((tag) => (
                <span
                  key={tag}
                  className="border border-emerald-brand text-emerald-brand text-xs font-heading font-semibold px-3 py-1.5 uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ────────────────────────────────────────────────────────────── */
function Contact() {
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

  const inputClass =
    'w-full border border-gray-300 px-4 py-3 text-slate-brand placeholder-gray-300 font-body text-sm focus:outline-none focus:border-slate-brand transition-colors bg-white'

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

        {/* Form card — sharp, white, no radius */}
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

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-slate-brand border-t border-white/10 text-white/50 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-heading font-bold text-white text-sm uppercase tracking-widest">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <path strokeLinecap="round" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
          Radar de Valor
        </div>
        <p className="text-xs uppercase tracking-widest">datos que generan crecimiento.</p>
        <p className="text-xs font-mono">© {new Date().getFullYear()} · TODOS LOS DERECHOS RESERVADOS</p>
      </div>
    </footer>
  )
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Benefits />
        <WhatWeDoSimulator />
        <HowItWorks />
        <DiagnosisTeaser />
        <Results />
        <ForWhom />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
