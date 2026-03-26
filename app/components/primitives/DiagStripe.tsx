export default function DiagStripe({ color = '#E9C46A', opacity = 0.08 }: { color?: string; opacity?: number }) {
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
