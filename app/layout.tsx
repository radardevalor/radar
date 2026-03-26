import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
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
    <html lang="es" className={`${inter.variable} ${openSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
