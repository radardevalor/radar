'use client'

import { useState } from 'react'
import SectionLabel from '../primitives/SectionLabel'
import { fmtNum } from '../../utils/format'

export default function WhatWeDoSimulator() {
  const [price, setPrice] = useState(250)
  const [unitCost, setUnitCost] = useState(140)
  const [volume, setVolume] = useState(800)
  const [fixedCost, setFixedCost] = useState(25000)
  const [activeScenario, setActiveScenario] = useState<'conservador' | 'base' | 'agresivo' | null>('base')

  const revenue = price * volume
  const totalCost = unitCost * volume
  const profit = revenue - totalCost
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0
  const breakEvenUnits = price > unitCost ? fixedCost / (price - unitCost) : null

  const chartData = [
    { label: 'Ingreso', value: revenue, color: '#0A5C4B' },
    { label: 'Total', value: totalCost, color: '#E76F51' },
    { label: 'Utilidad', value: Math.max(profit, 0), color: '#E9C46A' },
  ]
  const maxValue = Math.max(...chartData.map((d) => d.value), 1)

  const applyScenario = (type: 'conservador' | 'base' | 'agresivo') => {
    setActiveScenario(type)
    if (type === 'conservador') {
      setPrice(220); setUnitCost(150); setVolume(500); setFixedCost(25000)
      return
    }
    if (type === 'base') {
      setPrice(250); setUnitCost(140); setVolume(800); setFixedCost(25000)
      return
    }
    setPrice(290); setUnitCost(145); setVolume(1200); setFixedCost(30000)
  }

  const rangeClass = 'w-full accent-emerald-brand'
  const inputClass =
    'w-full border border-gray-300 px-3 py-2 text-slate-brand placeholder-gray-mid font-mono text-sm focus:outline-none focus:border-slate-brand bg-white'

  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6">
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
              {(['conservador', 'base', 'agresivo'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => applyScenario(s)}
                  className={activeScenario === s ? 'btn-primary text-xs py-2 px-3' : 'btn-outline text-xs py-2 px-3'}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1.5">
                  <label htmlFor="sim-price" className="section-label !mb-0">Precio unitario (MXN)</label>
                  <input id="sim-price" type="number" min={1} value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} className={inputClass} style={{ width: '100%', maxWidth: 130, borderRadius: 0 }} />
                </div>
                <input type="range" min={50} max={1000} step={5} value={price} onChange={(e) => setPrice(Number(e.target.value))} className={rangeClass} />
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1.5">
                  <label htmlFor="sim-cost" className="section-label !mb-0">Costo unitario (MXN)</label>
                  <input id="sim-cost" type="number" min={0} value={unitCost} onChange={(e) => setUnitCost(Number(e.target.value) || 0)} className={inputClass} style={{ width: '100%', maxWidth: 130, borderRadius: 0 }} />
                </div>
                <input type="range" min={20} max={900} step={5} value={unitCost} onChange={(e) => setUnitCost(Number(e.target.value))} className={rangeClass} />
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1.5">
                  <label htmlFor="sim-volume" className="section-label !mb-0">Volumen mensual (unidades)</label>
                  <input id="sim-volume" type="number" min={0} value={volume} onChange={(e) => setVolume(Number(e.target.value) || 0)} className={inputClass} style={{ width: '100%', maxWidth: 130, borderRadius: 0 }} />
                </div>
                <input type="range" min={0} max={5000} step={25} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className={rangeClass} />
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1.5">
                  <label htmlFor="sim-fixed" className="section-label !mb-0">Costo fijo mensual (MXN)</label>
                  <input id="sim-fixed" type="number" min={0} value={fixedCost} onChange={(e) => setFixedCost(Number(e.target.value) || 0)} className={inputClass} style={{ width: '100%', maxWidth: 130, borderRadius: 0 }} />
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
