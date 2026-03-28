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
