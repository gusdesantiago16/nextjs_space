import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/header'
import Footer from './components/footer'
import WhatsAppButton from './components/whatsapp-button'

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'Lic. Olga Mendoza Rivera | APSID & MANAOCA',
  description: 'Psicología clínica integral y centro de aprendizaje. Atención profesional, cálida y empática para el desarrollo humano.',
  keywords: 'psicología, terapia, ludoteca, desarrollo infantil, psicóloga clínica, APSID, MANAOCA',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Lic. Olga Mendoza Rivera | APSID & MANAOCA',
    description: 'Psicología clínica integral y centro de aprendizaje. Atención profesional, cálida y empática para el desarrollo humano.',
    images: ['/og-image.png'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={`${inter.className} bg-pastel-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}