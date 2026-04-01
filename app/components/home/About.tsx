import SectionLabel from '../primitives/SectionLabel'

const tags = [
  'Doctorado en análisis de datos',
  'Inteligencia de negocio',
  'Optimización operativa',
  'Estrategia basada en evidencia',
]

export default function About() {
  return (
    <section id="nosotros" className="bg-white py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-0">
          {/* Emerald accent bar */}
          <div className="w-1 bg-emerald-brand flex-shrink-0 mr-5 sm:mr-8" />
          <div className="flex-1">
          <SectionLabel>Sobre nosotros</SectionLabel>
          <h2 className="section-title mt-1 mb-6">Por qué construimos esto</h2>

          <p className="text-slate-brand leading-relaxed mb-4">
            Tenemos formación doctoral en análisis de datos. Y después de años en academia,
            llegamos a una conclusión incómoda: el análisis más riguroso del mundo no sirve
            de nada si el dueño del negocio no puede usarlo el lunes por la mañana.
          </p>
          <p className="text-slate-brand leading-relaxed mb-4">
            Por eso construimos Radar de Valor con una regla simple: si no se puede convertir
            en una acción concreta dentro de 48 horas, no vale la pena decirlo.
          </p>
          <p className="text-slate-brand leading-relaxed mb-8">
            Creemos que cada PYME merece el mismo nivel de inteligencia analítica que tienen
            las grandes empresas — sin necesitar su presupuesto, su equipo ni su infraestructura.
            Solo claridad para las decisiones que importan.
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
