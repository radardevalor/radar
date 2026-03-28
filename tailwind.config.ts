import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          brand: '#0A5C4B',
          light: '#0d7a63',
        },
        amber: {
          brand: '#E9C46A',
        },
        coral: {
          brand: '#E76F51',
        },
        pearl: '#F4F5F7',
        slate: {
          brand: '#2C3E50',
        },
        gray: {
          mid: '#6C757D',
        },
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'sans-serif'],
        body: ['var(--font-barlow)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      lineHeight: {
        relaxed: '1.6',
      },
    },
  },
  plugins: [],
}
export default config
