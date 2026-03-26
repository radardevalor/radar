'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────────────────
type Currency = 'USD' | 'EUR' | 'GBP'

interface ERApiResponse {
  result: string
  base_code: string
  rates: Record<string, number>
  time_last_update_utc: string
}

interface Invoice {
  id: number
  supplier: string
  currency: Currency
  amount: number
}

// ── Constants ──────────────────────────────────────────────────────────────────
const META: Record<Currency, { label: string; flag: string; hex: string; accent: string }> = {
  USD: { label: 'Dólar estadounidense', flag: '🇺🇸', hex: '#0A5C4B', accent: '#0A5C4B' },
  EUR: { label: 'Euro',                  flag: '🇪🇺', hex: '#9a7d20', accent: '#E9C46A' },
  GBP: { label: 'Libra esterlina',       flag: '🇬🇧', hex: '#E76F51', accent: '#E76F51' },
}

const DEFAULT_INVOICES: Invoice[] = [
  { id: 1, supplier: 'Proveedor A — EE.UU.',       currency: 'USD', amount: 12500 },
  { id: 2, supplier: 'Proveedor B — Europa',        currency: 'EUR', amount: 8200  },
  { id: 3, supplier: 'Proveedor C — Reino Unido',   currency: 'GBP', amount: 4750  },
]

// ── Formatters ─────────────────────────────────────────────────────────────────
const fmtNum = (n: number, dec = 2) =>
  new Intl.NumberFormat('es-MX', { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(n)

const fmtMXN = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n)

function toMXN(rates: Record<string, number>, cur: Currency): number {
  if (cur === 'USD') return rates['MXN'] ?? 0
  return (rates['MXN'] ?? 0) / (rates[cur] ?? 1)
}

// ── Reusable: section label ────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading text-xs font-bold uppercase tracking-widest text-gray-mid mb-1">
      {children}
    </p>
  )
}

// ── Reusable: diagonal accent stripe (decorative) ─────────────────────────────
function DiagStripe({ color = '#E9C46A', opacity = 0.12 }: { color?: string; opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Three parallel diagonal lines */}
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <line x1="-10%" y1="110%" x2="110%" y2="-10%" stroke={color} strokeWidth="40" opacity={opacity} />
        <line x1="-10%" y1="130%" x2="130%" y2="-10%" stroke={color} strokeWidth="20" opacity={opacity * 0.6} />
        <line x1="-10%" y1="150%" x2="150%" y2="-10%" stroke={color} strokeWidth="12" opacity={opacity * 0.4} />
      </svg>
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function ImportCostAnalysisPage() {
  const [rates, setRates]         = useState<Record<string, number> | null>(null)
  const [updatedAt, setUpdatedAt] = useState('')
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(false)
  const [invoices, setInvoices]   = useState<Invoice[]>(DEFAULT_INVOICES)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)

  const fetchRates = useCallback(async () => {
    try {
      const res  = await fetch('https://open.er-api.com/v6/latest/USD')
      if (!res.ok) throw new Error()
      const data: ERApiResponse = await res.json()
      if (data.result !== 'success') throw new Error()
      setRates(data.rates)
      setUpdatedAt(data.time_last_update_utc)
      setLastFetch(new Date())
      setError(false)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
    const id = setInterval(fetchRates, 600_000)
    return () => clearInterval(id)
  }, [fetchRates])

  // ── Derived ───────────────────────────────────────────────────────────────
  const mxnRates = rates
    ? { USD: toMXN(rates, 'USD'), EUR: toMXN(rates, 'EUR'), GBP: toMXN(rates, 'GBP') }
    : null

  const rows = mxnRates
    ? invoices.map((inv) => ({ ...inv, mxn: inv.amount * mxnRates[inv.currency] }))
    : []

  const totalMXN    = rows.reduce((s, r) => s + r.mxn, 0)
  const weightedAvg = totalMXN > 0 && mxnRates
    ? rows.reduce((s, r) => s + mxnRates[r.currency] * (r.mxn / totalMXN), 0)
    : 0

  const usdExposure = rows.find((r) => r.currency === 'USD')?.amount ?? 0
  const dominant    = rows.length ? rows.reduce((a, b) => (a.mxn > b.mxn ? a : b)).currency : null

  const updateAmount = (id: number, val: string) => {
    const num = parseFloat(val.replace(/,/g, '')) || 0
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, amount: num } : inv)))
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen font-body" style={{ background: '#F4F5F7' }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden"
        style={{
          background: '#2C3E50',
          clipPath: 'polygon(0 0, 100% 0, 100% 78%, 0 100%)',
          paddingBottom: '5rem',
        }}
      >
        <DiagStripe color="#E9C46A" opacity={0.07} />

        {/* Top bar */}
        <div className="relative max-w-6xl mx-auto px-6 pt-5 pb-2 flex items-center justify-between border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading font-bold text-white/80 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Radar de Valor
          </Link>
          <div className="flex items-center gap-4">
            {lastFetch && (
              <span className="text-white/40 text-xs font-mono hidden sm:block">
                {lastFetch.toLocaleTimeString('es-MX')}
              </span>
            )}
            <button
              onClick={fetchRates}
              className="text-white/40 hover:text-white/80 transition-colors"
              title="Actualizar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Title block */}
        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-4">
          <div className="flex items-start gap-4">
            {/* Amber vertical bar accent */}
            <div className="w-1 self-stretch mt-1" style={{ background: '#E9C46A', minHeight: '3rem' }} />
            <div>
              <Label>Demo interactivo · datos en tiempo real</Label>
              <h1 className="font-heading font-bold text-white leading-none" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
                Análisis de costos<br />de importación
              </h1>
              <p className="text-white/50 mt-3 text-sm max-w-lg">
                Edita los montos de tus facturas y observa el impacto cambiario
                calculado en tiempo real con tipos de cambio actuales.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN ───────────────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 pb-16 relative z-10">

        {/* ── LIVE RATES ROW ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-300 border border-gray-300 mb-6">
          {(['USD', 'EUR', 'GBP'] as Currency[]).map((cur, idx) => (
            <div
              key={cur}
              className="relative overflow-hidden bg-white px-6 py-5"
            >
              <DiagStripe color={META[cur].accent} opacity={0.06} />
              <div className="relative">
                {/* Top accent line */}
                <div className="absolute -top-5 left-0 right-0 h-0.5" style={{ background: META[cur].accent }} />
                <Label>{META[cur].flag} {META[cur].label}</Label>
                {loading ? (
                  <div className="h-10 w-32 bg-gray-100 animate-pulse mt-2" />
                ) : error ? (
                  <span className="text-coral-brand font-mono font-bold text-2xl">ERR</span>
                ) : (
                  <p className="font-mono font-bold leading-none mt-1" style={{ fontSize: '2rem', color: META[cur].hex }}>
                    {mxnRates ? fmtNum(mxnRates[cur]) : '—'}
                    <span className="text-sm font-heading font-normal text-gray-mid ml-2">MXN / 1 {cur}</span>
                  </p>
                )}
                {/* Bottom index label */}
                <p className="text-gray-mid text-xs mt-2 font-mono">IDX·{String(idx + 1).padStart(2, '0')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── TWO COLUMNS ────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Invoices panel */}
          <div className="bg-white border border-gray-300">
            {/* Panel header */}
            <div className="border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3" style={{ background: '#0A5C4B' }} />
                <span className="font-heading font-bold text-slate-brand uppercase tracking-widest text-sm">
                  Facturas pendientes
                </span>
              </div>
              <span className="text-gray-mid text-xs font-mono">EDITABLE</span>
            </div>

            <div className="px-6 py-5 space-y-6">
              {invoices.map((inv, i) => {
                const row = rows.find((r) => r.id === inv.id)
                const pct = totalMXN > 0 && row ? (row.mxn / totalMXN) * 100 : 0
                return (
                  <div key={inv.id}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-gray-mid w-5">{String(i + 1).padStart(2, '0')}</span>
                      <div className="flex-1">
                        <p className="font-heading font-semibold text-slate-brand text-sm leading-tight">
                          {inv.supplier}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-gray-mid text-xs font-mono">{inv.currency}</span>
                          <input
                            type="number"
                            min={0}
                            value={inv.amount}
                            onChange={(e) => updateAmount(inv.id, e.target.value)}
                            className="w-28 text-right border border-gray-300 px-3 py-1.5 text-slate-brand font-mono font-bold text-sm focus:outline-none focus:border-slate-brand transition-colors bg-white"
                            style={{ borderRadius: 0 }}
                          />
                        </div>
                        <p className="text-xs text-gray-mid font-mono mt-0.5">
                          {row ? fmtMXN(row.mxn) : '—'}
                        </p>
                      </div>
                    </div>
                    {/* Rectangular progress bar */}
                    <div className="h-1.5 bg-gray-100 ml-8">
                      <div
                        className="h-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: META[inv.currency].accent }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Total row */}
            <div
              className="relative overflow-hidden border-t border-gray-300 px-6 py-5 flex items-center justify-between"
              style={{ background: '#2C3E50' }}
            >
              <DiagStripe color="#E9C46A" opacity={0.08} />
              <div className="relative">
                <Label>Total a pagar en</Label>
                <p className="font-heading font-bold text-white text-xl">Pesos Mexicanos (MXN)</p>
              </div>
              <p className="relative font-mono font-bold text-white" style={{ fontSize: '1.6rem' }}>
                {mxnRates ? fmtMXN(totalMXN) : '—'}
              </p>
            </div>
          </div>

          {/* Distribution panel */}
          <div className="bg-white border border-gray-300 flex flex-col">
            {/* Panel header */}
            <div className="border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3" style={{ background: '#E9C46A' }} />
                <span className="font-heading font-bold text-slate-brand uppercase tracking-widest text-sm">
                  Distribución del gasto
                </span>
              </div>
              <span className="text-gray-mid text-xs font-mono">ANÁLISIS</span>
            </div>

            <div className="px-6 py-5 flex-1 space-y-5">
              {rows.map((r) => {
                const pct = totalMXN > 0 ? (r.mxn / totalMXN) * 100 : 0
                return (
                  <div key={r.id}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2" style={{ background: META[r.currency].accent }} />
                        <span className="font-heading font-semibold text-slate-brand text-sm">
                          {META[r.currency].flag} {r.currency}
                        </span>
                        {r.currency === dominant && (
                          <span
                            className="text-xs font-bold px-2 py-0.5 uppercase tracking-wide"
                            style={{ background: '#E76F51', color: '#fff', fontSize: '0.6rem' }}
                          >
                            MAX
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-brand">{fmtNum(pct, 1)}%</span>
                        <span className="text-gray-mid text-xs ml-2 font-mono">{mxnRates ? fmtMXN(r.mxn) : '—'}</span>
                      </div>
                    </div>
                    {/* Segmented rectangular bar */}
                    <div className="h-5 bg-gray-100 relative overflow-hidden">
                      <div
                        className="h-full transition-all duration-700 relative"
                        style={{ width: `${Math.max(pct, 2)}%`, background: META[r.currency].accent }}
                      >
                        {/* Diagonal hash marks inside bar */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                          {[0, 16, 32, 48, 64, 80, 96].map((x) => (
                            <line key={x} x1={x} y1="20" x2={x + 12} y2="0" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
                          ))}
                        </svg>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Weighted average */}
            <div className="border-t-2 mx-6 mb-0 mt-auto" style={{ borderColor: '#0A5C4B' }} />
            <div className="relative overflow-hidden px-6 py-5 border-t border-gray-300">
              <DiagStripe color="#0A5C4B" opacity={0.05} />
              <div className="relative flex items-end justify-between">
                <div>
                  <Label>Promedio ponderado de T/C</Label>
                  <p className="font-mono font-bold leading-none" style={{ fontSize: '2rem', color: '#0A5C4B' }}>
                    {weightedAvg > 0 ? `$${fmtNum(weightedAvg)}` : '—'}
                    <span className="text-sm font-heading font-normal text-gray-mid ml-2">MXN / unidad</span>
                  </p>
                </div>
                {/* Formula badge */}
                <div className="border border-gray-300 px-3 py-2 text-right hidden sm:block">
                  <p className="font-mono text-gray-mid" style={{ fontSize: '0.6rem', lineHeight: 1.6 }}>
                    Σ(tasa<sub>i</sub> × peso<sub>i</sub>)<br />
                    peso<sub>i</sub> = MXN<sub>i</sub> / total MXN
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── INSIGHT SECTION ────────────────────────────────────────────── */}
        <div className="relative overflow-hidden border border-gray-300" style={{ background: '#2C3E50' }}>
          <DiagStripe color="#E9C46A" opacity={0.06} />

          {/* Amber top accent bar */}
          <div className="h-1 w-full" style={{ background: '#E9C46A' }} />

          <div className="relative px-6 py-8 md:px-10">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left: main insight */}
              <div className="md:col-span-2">
                <Label>Lectura de Radar de Valor</Label>
                <h2 className="font-heading font-bold text-white text-2xl mb-4 leading-tight">
                  Lo que este análisis revela sobre tu negocio
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  Si el USD/MXN sube <span className="text-white font-bold">$1</span>, tus facturas en dólares
                  costarán <span className="text-white font-bold">${fmtNum(usdExposure, 0)} MXN</span> adicionales —
                  sin que hayas gastado un centavo más. Tu mayor exposición está en{' '}
                  <span className="font-bold" style={{ color: META[dominant ?? 'USD'].accent }}>
                    {dominant ? `${META[dominant].flag} ${dominant}` : '—'}
                  </span>
                  , que representa el{' '}
                  <span className="text-white font-bold">
                    {rows.length && totalMXN > 0
                      ? fmtNum(Math.max(...rows.map((r) => (r.mxn / totalMXN) * 100)), 0)
                      : '—'}%
                  </span>{' '}
                  de tu gasto total en divisas.
                </p>
                <p className="text-white/40 text-sm">
                  En Radar de Valor convertimos este tipo de análisis en decisiones concretas: cuándo
                  comprar divisas, cómo estructurar pagos a proveedores, dónde está tu riesgo real.
                </p>
                <Link
                  href="/#contacto"
                  className="inline-block mt-6 font-heading font-bold text-slate-brand px-6 py-3 text-sm uppercase tracking-wider transition-all hover:brightness-105 active:scale-95"
                  style={{ background: '#E9C46A', clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)' }}
                >
                  Solicita tu diagnóstico
                </Link>
              </div>

              {/* Right: two metrics */}
              <div className="space-y-4">
                <div className="border border-white/10 px-5 py-4">
                  <Label>Exposición directa USD</Label>
                  <p className="font-mono font-bold text-white text-2xl mt-1">
                    {fmtNum(usdExposure, 0)}
                    <span className="text-sm font-heading font-normal text-white/40 ml-1">USD</span>
                  </p>
                  <div className="mt-3 h-0.5 bg-white/10">
                    <div className="h-full bg-emerald-brand w-full transition-all duration-700" />
                  </div>
                </div>
                <div className="border border-white/10 px-5 py-4">
                  <Label>T/C promedio ponderado</Label>
                  <p className="font-mono font-bold text-white text-2xl mt-1">
                    {weightedAvg > 0 ? `$${fmtNum(weightedAvg)}` : '—'}
                    <span className="text-sm font-heading font-normal text-white/40 ml-1">MXN</span>
                  </p>
                  <div className="mt-3 h-0.5 bg-white/10">
                    <div className="h-full w-3/4 transition-all duration-700" style={{ background: '#E9C46A' }} />
                  </div>
                </div>
                <div className="border border-white/10 px-5 py-4">
                  <Label>Moneda dominante</Label>
                  <p className="font-mono font-bold text-white text-2xl mt-1">
                    {dominant ?? '—'}
                    <span className="text-sm font-heading font-normal text-white/40 ml-2">
                      {META[dominant ?? 'USD'].flag}
                    </span>
                  </p>
                  <div className="mt-3 h-0.5 bg-white/10">
                    <div className="h-full w-2/3 transition-all duration-700" style={{ background: '#E76F51' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <p className="text-gray-mid text-xs font-mono mt-6 text-center">
          FUENTE: open.er-api.com · BASE USD · ACTUALIZACIÓN DIARIA
          {updatedAt && (
            <> · PUBLICADO {new Date(updatedAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</>
          )}
          {' '}· SOLO CON FINES DEMOSTRATIVOS
        </p>
      </main>
    </div>
  )
}
