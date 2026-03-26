'use client'

import { useState } from 'react'
import Link from 'next/link'

// ── Design primitives ──────────────────────────────────────────────────────
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading text-xs font-bold uppercase tracking-widest text-gray-mid mb-1">
      {children}
    </p>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────
const SIGNALS = [
  'Decido mis precios principalmente mirando a la competencia, no mis costos reales',
  'No sé con certeza qué producto o servicio me deja más margen neto',
  'Mis ventas varían mes a mes pero no tengo claro por qué suben o bajan',
  'No sé con precisión cuánto me cuesta conseguir un cliente nuevo',
  'He tomado decisiones importantes basadas en experiencia o intuición, sin datos',
  'Mis datos de ventas están en Excel, WhatsApp, papel o en la memoria',
  'No tengo calculado cuánto necesito vender cada mes para no perder dinero',
]

const KEY_NUMBERS = [
  {
    id: 'margen',
    name: 'Margen bruto',
    question: '¿Qué % de cada venta te queda tras restar tus costos directos?',
    why: 'Sin este número, crecer puede significar solo trabajar más, no ganar más.',
  },
  {
    id: 'cac',
    name: 'Costo por cliente nuevo',
    question: '¿Cuánto gastas en promedio para conseguir un cliente nuevo?',
    why: 'Si cuesta más conseguirlo que lo que genera, el crecimiento destruye valor.',
  },
  {
    id: 'ltv',
    name: 'Valor de vida del cliente',
    question: '¿Cuánto te genera un cliente típico durante toda su relación contigo?',
    why: 'Compara con el punto anterior: si LTV < 3× costo de adquisición, el modelo es insostenible.',
  },
  {
    id: 'pe',
    name: 'Punto de equilibrio mensual',
    question: '¿Cuánto necesitas vender al mes solo para no perder dinero?',
    why: 'Todo lo que vendes encima de este número es ganancia real. Sin él, no sabes si sobrevives.',
  },
  {
    id: 'top',
    name: 'Tu producto o servicio más rentable',
    question: '¿Cuál de lo que ofreces deja más margen real — no solo más ingreso?',
    why: 'El más vendido no siempre es el más rentable. Confundirlos limita el crecimiento.',
  },
]

type NumberAnswer = 'si' | 'aprox' | 'no' | null
type DiagStep = 1 | 2 | 3

// ── Main component ─────────────────────────────────────────────────────────
export default function DiagnosticoPage() {
  const [step, setStep]       = useState<DiagStep>(1)
  const [checks, setChecks]   = useState<boolean[]>(Array(SIGNALS.length).fill(false))
  const [answers, setAnswers] = useState<NumberAnswer[]>(Array(KEY_NUMBERS.length).fill(null))
  const whatsappHref =
    'https://wa.me/524441428472?text=Hola%2C%20acabo%20de%20terminar%20el%20diagn%C3%B3stico%20de%20Radar%20de%20Valor%20y%20quiero%20agendar%20una%20sesi%C3%B3n.'

  const toggleCheck = (i: number) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  const setAnswer = (i: number, val: NumberAnswer) =>
    setAnswers((prev) => prev.map((v, idx) => (idx === i ? val : v)))

  const reset = () => {
    setStep(1)
    setChecks(Array(SIGNALS.length).fill(false))
    setAnswers(Array(KEY_NUMBERS.length).fill(null))
  }

  const checkedCount  = checks.filter(Boolean).length
  const answeredCount = answers.filter((a) => a !== null).length
  const allAnswered   = answeredCount === KEY_NUMBERS.length

  // Scoring
  const urgency   = checkedCount
  const gap       = answers.reduce((s, a) => s + (a === 'no' ? 1 : a === 'aprox' ? 0.5 : 0), 0)
  const total     = urgency + gap
  const maxScore  = SIGNALS.length + KEY_NUMBERS.length

  const level = total <= 4
    ? { label: 'Punto de partida sólido', color: '#0A5C4B', textColor: '#fff',
        message: 'Tu negocio ya tiene mejores fundamentos que la mayoría. Los gaps que tienes son oportunidades de optimización — no emergencias.',
        sub: 'Con un análisis enfocado podrías identificar el siguiente 20% de margen que aún no estás capturando, sin cambiar tu operación.' }
    : total <= 8
    ? { label: 'En zona de transición',   color: '#E9C46A', textColor: '#2C3E50',
        message: 'Tienes parte de la foto pero te faltan piezas clave. Estás tomando algunas decisiones con certeza y otras con intuición — y esa mezcla es donde más margen se pierde sin notarlo.',
        sub: 'Un diagnóstico estructurado convertiría esas intuiciones en certezas accionables en 1 a 2 sesiones.' }
    : { label: 'Alta exposición',          color: '#E76F51', textColor: '#fff',
        message: 'La mayoría de las decisiones importantes de tu negocio se están tomando sin respaldo de datos. No es una crítica — es la realidad de la mayoría de las PYMES. Significa que hay un potencial de mejora muy significativo.',
        sub: 'Cada mes que pasa sin datos claros tiene un costo real. El primer paso siempre es un diagnóstico honesto.' }

  // Dynamic insights
  const insights: string[] = []
  if (answers[1] === 'no' || answers[1] === 'aprox')
    insights.push('No conoces tu costo de adquisición → estás invirtiendo en marketing sin saber si esa inversión es rentable.')
  if (answers[4] === 'no' || answers[4] === 'aprox')
    insights.push('No identificas tu producto más rentable → podrías estar dedicando esfuerzo al producto equivocado.')
  if (answers[3] === 'no')
    insights.push('Sin punto de equilibrio claro, un mes de ventas bajas puede convertirse en una crisis financiera inesperada.')
  if (checks[5])
    insights.push('Con datos dispersos en Excel o papel, cualquier análisis requiere trabajo manual antes de poder dar el primer paso real.')
  if (checks[2] && (answers[0] === 'no' || answers[0] === 'aprox'))
    insights.push('Tus ventas varían y no conoces tu margen: es imposible saber si esa variación te afecta positiva o negativamente.')

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen font-body" style={{ background: '#F4F5F7' }}>

      {/* HEADER */}
      <header
        className="relative overflow-hidden"
        style={{
          background: '#2C3E50',
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
          paddingBottom: '5rem',
        }}
      >
        <DiagStripe color="#E9C46A" opacity={0.06} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-2 flex items-center justify-between gap-3 border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading font-bold text-white/70 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Radar de Valor
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-white/30 text-xs hidden sm:block">
              GRATIS · SIN REGISTRO · 3 MIN
            </span>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-[11px] sm:text-xs py-2 px-3 sm:px-4 whitespace-nowrap"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-3 sm:pb-4">
          <div className="flex items-start gap-4">
            <div className="w-1 self-stretch mt-1" style={{ background: '#E9C46A', minHeight: '3rem' }} />
            <div>
              <Label>Herramienta de autodiagnóstico · Radar de Valor</Label>
              <h1
                className="font-heading font-bold text-white leading-none"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
              >
                ¿Qué tan bien conoces<br />los números de tu negocio?
              </h1>
              <p className="text-white/50 mt-3 text-sm max-w-lg">
                12 preguntas. Resultado inmediato. Diagnóstico personalizado basado
                en tus respuestas — no en promedios genéricos.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 -mt-4 sm:-mt-8 pb-12 sm:pb-16 relative z-10">

        {/* Step indicator */}
        <div className="flex overflow-x-auto border border-gray-300 bg-white mb-6 sm:mb-8">
          {([
            { n: '01', label: 'Señales del negocio', s: 1 },
            { n: '02', label: 'Los 5 números clave', s: 2 },
            { n: '03', label: 'Tu diagnóstico',      s: 3 },
          ] as { n: string; label: string; s: DiagStep }[]).map((item) => (
            <div
              key={item.n}
              className={`min-w-[170px] sm:min-w-0 flex-1 px-3 sm:px-4 py-3 border-r last:border-r-0 border-gray-200 transition-colors ${
                step === item.s ? 'bg-slate-brand text-white'
                : step > item.s ? 'bg-emerald-brand/10 text-emerald-brand'
                : 'bg-white text-gray-mid'
              }`}
            >
              <p className="font-mono text-xs">{item.n}</p>
              <p className="font-heading font-bold text-xs uppercase tracking-wide mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>

        {/* ── STEP 1 ─────────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="bg-white border border-gray-300">
            <div className="border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
              <p className="font-heading font-bold text-slate-brand text-sm">
                Marca las situaciones que reconoces en tu negocio
              </p>
              <span className="font-mono text-sm text-gray-mid">{checkedCount} / {SIGNALS.length}</span>
            </div>

            <div className="divide-y divide-gray-100">
              {SIGNALS.map((signal, i) => (
                <button
                  key={i}
                  onClick={() => toggleCheck(i)}
                  className={`w-full text-left px-4 sm:px-6 py-4 transition-all flex items-start gap-3 sm:gap-4 ${
                    checks[i] ? 'bg-coral-brand/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-colors ${
                    checks[i] ? 'bg-coral-brand border-coral-brand' : 'border-gray-300'
                  }`}>
                    {checks[i] && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm leading-relaxed ${checks[i] ? 'text-slate-brand font-medium' : 'text-gray-mid'}`}>
                    {signal}
                  </span>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-pearl">
              <p className="text-gray-mid text-xs pr-2">
                {checkedCount === 0
                  ? 'No hay respuestas correctas o incorrectas — sé honesto'
                  : checkedCount < 4
                  ? `${checkedCount} situación${checkedCount > 1 ? 'es' : ''} identificada${checkedCount > 1 ? 's' : ''}`
                  : `${checkedCount} de 7 — hay oportunidades claras de mejora`}
              </p>
              <button onClick={() => setStep(2)} className="btn-primary w-full sm:w-auto text-xs py-2.5 px-6">
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 ─────────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="bg-white border border-gray-300">
            <div className="border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
              <p className="font-heading font-bold text-slate-brand text-sm">
                ¿Conoces estos 5 números de tu negocio?
              </p>
              <span className="font-mono text-sm text-gray-mid">{answeredCount} / {KEY_NUMBERS.length}</span>
            </div>

            <div className="divide-y divide-gray-100">
              {KEY_NUMBERS.map((num, i) => (
                <div key={num.id}>
                  <div className="px-4 sm:px-6 py-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading font-bold text-slate-brand text-sm">{num.name}</p>
                      <p className="text-gray-mid text-sm mt-0.5">{num.question}</p>
                    </div>
                    <span className="font-mono text-xs text-gray-mid flex-shrink-0 mt-0.5">0{i + 1}</span>
                  </div>
                  <div className="flex border-t border-gray-100">
                    {([
                      { val: 'si'    as NumberAnswer, label: 'Sí, lo sé',  bg: '#0A5C4B', fg: '#fff'    },
                      { val: 'aprox' as NumberAnswer, label: 'Aproximado', bg: '#E9C46A', fg: '#2C3E50' },
                      { val: 'no'    as NumberAnswer, label: 'No lo sé',   bg: '#E76F51', fg: '#fff'    },
                    ]).map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setAnswer(i, opt.val)}
                        className="flex-1 py-3 text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wide transition-all border-r last:border-r-0 border-gray-100"
                        style={
                          answers[i] === opt.val
                            ? { background: opt.bg, color: opt.fg }
                            : { color: '#6C757D' }
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {(answers[i] === 'no' || answers[i] === 'aprox') && (
                    <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-mid text-xs italic">{num.why}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 px-4 sm:px-6 py-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-pearl">
              <button
                onClick={() => setStep(1)}
                className="text-gray-mid text-xs hover:text-slate-brand transition-colors font-heading font-bold uppercase tracking-wide text-left"
              >
                ← Volver
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!allAnswered}
                className="btn-primary w-full sm:w-auto text-xs py-2.5 px-6 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Ver mi diagnóstico →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ─────────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-4">

            {/* Score card */}
            <div className="relative overflow-hidden border border-gray-300" style={{ background: '#2C3E50' }}>
              <DiagStripe color={level.color} opacity={0.1} />
              <div className="h-1 w-full" style={{ background: level.color }} />
              <div className="relative px-4 sm:px-8 py-6 sm:py-8 grid md:grid-cols-3 gap-6 items-center">
                <div className="text-center md:text-left">
                  <Label>Tu puntuación</Label>
                  <div className="flex items-end gap-1 mt-2 justify-center md:justify-start">
                    <span
                      className="font-mono font-bold leading-none"
                      style={{ fontSize: 'clamp(3.25rem, 18vw, 5rem)', color: level.color }}
                    >
                      {Math.round(total)}
                    </span>
                    <span className="text-white/25 font-mono text-xl sm:text-3xl mb-2 sm:mb-3">/{maxScore}</span>
                  </div>
                  <div
                    className="inline-block font-mono text-xs font-bold px-3 py-1 mt-1 uppercase tracking-wider"
                    style={{ background: level.color, color: level.textColor }}
                  >
                    {level.label}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-white leading-relaxed mb-4">{level.message}</p>
                  <p className="text-white/50 text-sm leading-relaxed border-l-2 border-white/20 pl-4">
                    {level.sub}
                  </p>
                </div>
              </div>
            </div>

            {/* Specific insights */}
            {insights.length > 0 && (
              <div className="bg-white border border-gray-300">
                <div className="border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-3">
                  <div className="w-3 h-3" style={{ background: '#E9C46A' }} />
                  <span className="font-heading font-bold text-slate-brand uppercase tracking-widest text-xs">
                    Lo que esto significa específicamente para tu negocio
                  </span>
                </div>
                <div className="px-4 sm:px-6 py-5 space-y-4">
                  {insights.map((ins, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold mt-0.5 flex-shrink-0" style={{ color: '#0A5C4B' }}>→</span>
                      <p className="text-slate-brand text-sm leading-relaxed">{ins}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div
              className="relative overflow-hidden border border-gray-300 px-4 sm:px-8 py-6 sm:py-8"
              style={{ background: '#2C3E50' }}
            >
              <DiagStripe color="#E9C46A" opacity={0.06} />
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <Label>El siguiente paso</Label>
                  <h3 className="font-heading font-bold text-white text-xl mt-1">
                    Convierte este diagnóstico en un plan concreto
                  </h3>
                  <p className="text-white/55 text-sm mt-2">
                    En 1 hora analizamos juntos los datos de tu negocio y definimos las 3 primeras acciones.
                  </p>
                </div>
                <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3 flex-shrink-0">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto text-xs py-3 px-6 whitespace-nowrap text-center"
                  >
                    Escribir por WhatsApp
                  </a>
                  <button
                    onClick={reset}
                    className="btn-outline w-full sm:w-auto text-xs py-3 px-4 whitespace-nowrap"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.6)' }}
                  >
                    Reiniciar
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Attribution */}
        <p className="text-center font-mono text-xs text-gray-mid mt-8 uppercase tracking-wide">
          Radar de Valor · Herramienta gratuita · Sin almacenamiento de datos
        </p>
      </main>
    </div>
  )
}
