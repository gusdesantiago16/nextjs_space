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
        // APSID - Azul Marino
        'apsid': {
          50: '#e8f0f8',
          100: '#d6e4f0',
          200: '#a8c5db',
          300: '#6b9bc4',
          400: '#3a73a8',
          500: '#1A4B84',
          600: '#153d6b',
          700: '#102f52',
          800: '#0b2139',
          900: '#061320',
        },
        // Fondos suaves
        'pastel': {
          50: '#F8FAFC',
          100: '#D6E4F0',
          200: '#c4d8e8',
          300: '#a8c5db',
        },
        // MANAOCA - Dorado
        'manaoca': {
          50: '#fdf8eb',
          100: '#f9efd0',
          200: '#f0dfa1',
          300: '#e5c96d',
          400: '#D4AF37',
          500: '#c9a030',
          600: '#a78228',
          700: '#856420',
          800: '#634a18',
          900: '#423110',
        },
        // Colores de texto y neutros
        'slate': {
          50: '#F8FAFC',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config