export default function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`section-label mb-2 ${light ? 'text-white/50' : ''}`}>{children}</p>
  )
}
