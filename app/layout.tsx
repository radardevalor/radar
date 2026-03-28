import type { Metadata } from 'next'
import { Sora, Barlow, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

// Sora: geometric grotesque with institutional precision —
// data agencies, central banks, EU statistical portals
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

// Barlow: humanist sans, excellent readability, pairs with Syne's geometry
const barlow = Barlow({
  subsets: ['latin'],
  variable: '--font-barlow',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

// IBM Plex Mono: technical precision for data and numbers
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Radar de Valor – detecta y activa el valor oculto en tu negocio',
  description:
    'Convertimos tus datos en decisiones claras de negocio. Análisis inteligente para PYMES que quieren crecer con certeza, no con corazonadas.',
  keywords: ['análisis de datos', 'PYMES', 'consultoría', 'crecimiento', 'decisiones de negocio'],
  openGraph: {
    title: 'Radar de Valor – datos que generan crecimiento',
    description:
      'Convertimos tus datos en decisiones claras de negocio. Sin jerga técnica, sin compromiso.',
    type: 'website',
    locale: 'es_MX',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${sora.variable} ${barlow.variable} ${ibmPlexMono.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
