export default function Footer() {
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
